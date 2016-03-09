/**
 * Created by ayed.h on 29/02/2016.
 */
'use strict';

angular.module('aajbApp')

    .controller('LoginCtr', function ($scope, $state, Auth) {
        var _this = this;
        _this.dateNow = new Date();
        _this.error = null;

        _this.login = function () {
            Auth.Login($scope.login, $scope.password, function(status, code) {
                if (status) {
                    $state.go('home');
                }else {
                    var mess = "";
                    if (code == -1) {
                        mess = mess_invalidPass;
                    }else {
                       mess = mess_errConn;
                    }
                    $scope.alerts = [
                        { type: 'danger', msg: mess }
                    ];
                }
            });
        };

        _this.removeMess = function() {
            $scope.alerts=[];
        }
    })

    .controller('HomeCtr', function(){

    })

    .controller('AddRegistration', function ($state,$timeout,$window,$q, Api) {
        var _this = this;
        //indicates which parent is being editing (1 or 2)
        var parentNum;
        //indicates id the edit mode is activated or not.
        var editStudentMode = false;


        //the json global object
        _this.registration = {
            firstParent: {
                gender: 'MALE'
            },
            secondParent: {},
            students: []
        };
        //a temp variable to store new parent creation
        _this.tmpParent = {
            gender: 'MALE'
        };
        //a temp variable to store new student creation
        _this.tmpStudent = {};

        //show/hide the main panel
        _this.showMain = true;
        //show/hide address panel
        _this.shoAdrPanel = false;
        //this will control the birth date validation
        _this.isBirthDateValid = false;
        //this will contains result of find query
        _this.findParents = [];

        //click on "create new parent" button
        _this.loadNewParent = function (num) {
            parentNum = num;
            if (num == 2) {
                _this.tmpParent.gender = "FEMALE";
            }
            _this.showMain = false;
            //wait for the animation
            $timeout(function () {
                $state.go(".newParent");
            },500);
        };

        //click Ok of new Parent panel
        _this.okNewParent = function () {
            if (angular.isDefined($('#inputProf').val())){
                _this.tmpParent.job = $('#inputProf').val();
            }

            _this.showMain = true;
            $state.go("home.addRegistration");
            if (parentNum == 1) {
                _this.registration.firstParent = _this.tmpParent;
            }else {
                _this.registration.secondParent = _this.tmpParent;
            }
            _this.tmpParent = {};
        };

        //click cancel of new Parent panel
        _this.cancelNewParent = function () {
            _this.tmpParent = {};
            _this.showMain = true;
            $state.go("home.addRegistration");
        };

        //click to add new student
        _this.loadNewStudent = function () {
            if (editStudentMode == false) {
                //for new student
                _this.tmpStudent.gender = "MALE";
                _this.isBirthDateValid = false;
            }

            _this.showMain = false;
            //wait for the animation
            $timeout(function () {
                $state.go(".newStudent");
            },500);
        };

        _this.okNewStudent = function () {
            //_this.tmpStudent.birthDate = Date.parse(_this.tmpStudent.birthDate);
            if (editStudentMode == false) {
                _this.registration.students.push(_this.tmpStudent);
            }

            _this.tmpStudent = {};
            _this.showMain = true;
            editStudentMode = false;
            $state.go("home.addRegistration");
        };

        _this.cancelNewStudent = function () {
            _this.tmpStudent = {};
            _this.showMain = true;
            editStudentMode = false;
            $state.go("home.addRegistration");
        };

        //will be called when delete a student
        _this.removeStudent = function(student) {
            _this.registration.students.splice(_this.registration.students.indexOf(student),1);
        };

        //will be called to edit a student
        _this.editStudent = function (student) {
            editStudentMode = true;
            _this.tmpStudent = student;
            _this.isBirthDateValid = true;
            _this.loadNewStudent();
        };

        //will be called when birth date of new student is changed
        _this.onTimeSet = function (newDate, oldDate) {
            _this.isBirthDateValid = false;
            Api.checkBirthdate(Date.parse(newDate), function (result) {
                if (result) {
                    _this.isBirthDateValid = true;
                }
            });
        };

        //will be called in the final: this will send the json registration
        _this.okRegistration = function () {

           //data checks
            if (angular.isUndefined(_this.registration.firstParent.firstName) ||
                angular.isUndefined(_this.registration.firstParent.lastName) ||
                angular.isUndefined(_this.registration.firstParent.email)) {
                $window.alert("Le Parent 1 est invalide !!");
                return;
            }

            if (_this.registration.students.length == 0) {
                $window.alert("La liste des enfants est vide !!");
                return;
            }

            if (angular.isDefined(_this.registration.firstParent.id) &&
                angular.isDefined(_this.registration.secondParent.id) &&
                _this.registration.firstParent.id == _this.registration.secondParent.id) {
                $window.alert("Impossible d'enregister l'inscription !! Le deux parents sont identiques");
                return;
            }


            Api.saveRegistration(_this.registration, function (result) {
                console.log(result);
                if (result.status == "true") {
                    $window.alert("L'inscription a bien été enregistrée sur le numéro: "+result.registration.id);
                    $state.go('home');
                }else {
                    var mess = "Une erreur est survenue lors de l'enregistrement de l'inscription  ! ";
                    if (result.errors!=null && results.errors.length>0) {
                        mess += 'Code -'+result.errors[0] + result.message;
                    }
                    $window.alert(mess);
                }
            });
        };

        //will cancel the registration
        _this.cancelRegistration = function () {
            $state.go("home");
        };

        //loads the find parent view
        _this.findParent = function (num) {
            parentNum = num;
            _this.showMain = false;
            //wait for the animation
            $timeout(function () {
                $state.go(".findParent");
            },500);
        };

        //click on a parent to select it
        _this.selectParent = function (parent) {
            if (parentNum == 1) {
                _this.registration.firstParent = parent;
            }else {
                _this.registration.secondParent = parent;
            }
            _this.findParents = [];
            _this.showMain = true;
            $state.go("home.addRegistration");
        };

        //call the web service to find parents
        _this.findNow = function (query) {
            if (query!=null && query.length>2) {
                Api.findParents (query, function (resuls) {
                    console.log(resuls);
                    _this.findParents = resuls.data;
                })
            }
        };

        //cancel find parent
        _this.cancelFindParent = function () {
            _this.showMain = true;
            _this.findParents = [];
            $state.go("home.addRegistration");
        };

    })



;

