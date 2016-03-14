/**
 * Created by ayed.h on 29/02/2016.
 */
'use strict';

angular.module('aajbApp')

    .controller('MainCtr', function ($scope, $rootScope, $state, Auth) {
        if ($rootScope.isAuthenticated) {
            $state.go("main.home");
        }else {
            $state.go("main.login");
        }

        this.logout = function () {
            $rootScope.isAuthenticated = false;
            $state.go("main.login");

            //TODO: explicit remote call for logout
            /*Auth.Logout(function (status) {
                if (status == true) {
                    $state.go('login');
                }else {
                    alert("Erreur de déconnection !!");
                    $state.go('login');
                }
            });*/
        };
    })

    .controller('LoginCtr', function ($rootScope, $scope, $state, Auth) {
        var _this = this;
        _this.dateNow = new Date();
        _this.error = null;

        _this.login = function () {
            $rootScope.isAuthenticated = false;
            Auth.Login($scope.login, $scope.password, function(status, code) {
                if (status) {
                    $rootScope.isAuthenticated = true;
                    $state.go('main.home');
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

    .controller('HomeCtr', function($state){

        this.loadParentList = function () {
            $state.go("main.home.parentList");
        };

        this.loadAddReg = function () {
            $state.go("main.home.addRegistration");
        }
    })

    .controller('AddRegistration', function ($state,$timeout,$window,$q, Api) {
        var _this = this;
        //indicates which parent is being editing (1 or 2)
        var parentNum;
        //indicates id the edit mode is activated or not.
        var editStudentMode = false;

        $('.datepicker').datepicker();

        //the json global object
        _this.registration = {
            firstParent: {
                gender: 'MALE'
            },
            secondParent: {},
            students: [],
            cheques: []
        };
        //a temp variable to store new parent creation
        _this.tmpParent = {
            gender: 'MALE'
        };
        //a temp variable to store new student creation
        _this.tmpStudent = {};
        //this will hold the temp cheque object
        _this.tmpCheque = {
            adjutable: true
        };

        //show/hide the main panel
        _this.showMain = true;
        //show/hide address panel
        _this.shoAdrPanel = false;
        //show / hide cheque panel
        _this.showChequePanel = false;
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
            $state.go("main.home.addRegistration");
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
            $state.go("main.home.addRegistration");
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
            $state.go("main.home.addRegistration");
        };

        _this.cancelNewStudent = function () {
            _this.tmpStudent = {};
            _this.showMain = true;
            editStudentMode = false;
            $state.go("main.home.addRegistration");
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
                    $state.go('main.home');
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
            $state.go("main.home");
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
            $state.go("main.home.addRegistration");
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
            $state.go("main.home.addRegistration");
        };

        _this.removeCheque = function (cheque) {
            _this.registration.cheques.splice(_this.registration.cheques.indexOf(cheque), 1);
        };

        _this.addCheque = function () {
            _this.tmpCheque.adjustableDate = Date.parse(_this.tmpCheque.adjustableDate);

            if (angular.isDefined(_this.tmpCheque.amount) &&
                    parseInt(_this.tmpCheque.amount) >= 1 &&
                        angular.isDefined(_this.tmpCheque.adjustableDate)) {

                _this.registration.cheques.push(_this.tmpCheque);
                _this.tmpCheque = {};
            }
        };
    })

    .controller('ParentList', function ($scope, $state,$timeout,Api) {
        var _this = this;
        var desc = false;
        var size = 10;

        var orderBy = "id";

        _this.showMain=true;
        _this.parents = [];
        _this.search = undefined;
        _this.order = '+id';
        _this.numberOfPage = 0;
        _this.currentPage = 0;
        _this.isAdmin = $scope.isAdmin;
        _this.selectedParent = undefined;
        _this.selectedParentRegistrations = [];

        _this.sendRequest = function () {
            Api.readParentsPage(_this.search, _this.currentPage, size, function (data) {
                _this.parents = data.parents;
                _this.numberOfPage = data.numberOfPages;
            });
        };

        _this.reloadParentList = function () {
            _this.sendRequest();
            _this.currentPage = 0;
        };

        //load first page first time
        _this.reloadParentList();

        //changes the order
        _this.changeOrder = function (ord) {
            if (ord==orderBy) {
                desc = !desc;
            } else {
                desc = false;
                orderBy = ord;
            }
            if (desc){
                _this.order = '-' + orderBy;
            }else {
                _this.order = '+' + orderBy;
            }
        };

        _this.changePageFirst = function () {
            _this.currentPage = 0;
            _this.sendRequest();
        };
        _this.changePagePrevious = function () {
            if (_this.currentPage > 0) {
                _this.currentPage --;
                _this.sendRequest();
            }
        };
        _this.changePageNext = function () {
            if (_this.currentPage < _this.numberOfPage-1) {
                _this.currentPage ++;
                _this.sendRequest();
            }
        };
        _this.changePageLast = function () {
            _this.currentPage=_this.numberOfPage-1;
            _this.sendRequest();
        };

        _this.loadParentDetails = function (parent) {
            _this.showMain = false;
            _this.selectedParent = parent;
            //wait for the animation
            $timeout(function () {
                $state.go(".parentDetails");
            },500);
            //read registration of this parent
            Api.readRegistrationOfParent(parent.id, function (registrations) {
                if (angular.isDefined(registrations)) {
                    _this.selectedParentRegistrations = registrations;
                    console.log(_this.selectedParentRegistrations);
                }
            });

        };

        _this.adjusted = function (registration) {
            var i = 0;
            registration.cheques.map(function (cheque) {
                if (cheque.adjust)
                {
                    i++;
                }
            });
            return i;
        };

        _this.cancelParentDetails = function () {
            _this.showMain = true;
            _this.selectedParent = undefined;
            _this.selectedParentRegistrations = [];
            $state.go("main.home.parentList");
        };
    })


;


