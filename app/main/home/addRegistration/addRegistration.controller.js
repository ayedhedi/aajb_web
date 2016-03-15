/**
 * Created by ayed.h on 14/03/2016.
 */
angular.module('aajbApp')

    .controller('AddRegistration', function ($state, $timeout, addRegistrationPanel, currentRegistration,
                                             currentParent, currentStudent, classesName, editStudent, totalChequesAmount) {
        var _this = this;

        $('.datepicker').datepicker();

        //the json global object
        _this.registration = currentRegistration.init();

        //this will hold the temp cheque object
        _this.tmpCheque = {
            adjustable: true
        };
        _this.totalAmountCheque = 0;

        //show/hide address panel
        _this.showAdrPanel = false;
        //show / hide cheque panel
        _this.showChequePanel = false;
        //this will control the birth date validation
        _this.isBirthDateValid = false;
        _this.classesNames = {};
        _this.totalAmountCheque = totalChequesAmount.get();

        //show main panel
        addRegistrationPanel.show();

        //a function that will decide if the main panel should be showen or hidden
        _this.showPanel = function () {
            return addRegistrationPanel.getState();
        };

        //click on "create new parent" button
        _this.loadStateNewParent = function (num) {
            //set the parent to be editing
            currentParent.setParent(num);

            //hide the addRegistration panel
            addRegistrationPanel.hide();

            //wait for the animation
            $timeout(function () {
                $state.go(".newParent");
            },500);
        };

        //click to add new student
        _this.loadStateNewStudent = function () {
            if (!editStudent.getEdit()) {
                //for new student
                currentStudent.setStudent({
                    gender: "MALE"
                })
            }

            //reload the classes name & size
            classesName.init();

            //hide the addRegistration panel
            addRegistrationPanel.hide();

            //wait for the animation
            $timeout(function () {
                $state.go(".newStudent");
            },500);
        };

        //will be called when delete a student
        _this.removeStudent = function(student) {
            _this.registration.students.splice(_this.registration.students.indexOf(student),1);
        };

        //will be called to edit a student
        _this.editStudent = function (student) {
            //set the dit mode
            editStudent.setEdit(true);

            //wheb edit student by default birth date is true
            _this.isBirthDateValid = true;

            //set the current student to be edited
            currentStudent.setStudent(student);

            _this.loadStateNewStudent();
        };

        //loads the find parent view
        _this.loadStateFindParent = function (num) {
            //set the parent to be editing
            currentParent.setParent(num);

            //hide the addRegistration panel
            addRegistrationPanel.hide();

            //wait for the animation
            $timeout(function () {
                $state.go(".findParent");
            },500);
        };
    })



/**
 *  this will controll the save and the cancel registration actions
 */
    .controller('AddRegistrationCtr', function ($state, $window, Api, currentRegistration ) {
        var registration = currentRegistration.getRegistration();

        this.save = function () {
            //data checks
            if (angular.isUndefined(registration.firstParent.firstName) ||
                angular.isUndefined(registration.firstParent.lastName) ||
                angular.isUndefined(registration.firstParent.email)) {
                $window.alert("Le Parent 1 est invalide !!");
                return;
            }

            if (registration.students.length == 0) {
                $window.alert("La liste des enfants est vide !!");
                return;
            }

            if (angular.isDefined(registration.firstParent.id) &&
                angular.isDefined(registration.secondParent.id) &&
                registration.firstParent.id == registration.secondParent.id) {
                $window.alert("Impossible d'enregister l'inscription !! Le deux parents sont identiques");
                return;
            }

            /**
             * call the web service to save the registration   ----------------------------------------------------> API
             */
            Api.saveRegistration(registration, function (result) {
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
        this.cancel = function () {
            $state.go("main.home");
        };
    })


    .controller('Cheque', function (currentRegistration, totalChequesAmount ) {
        var _this = this;

        _this.tmpCheque = {
            adjustable: true
        };

        _this.removeCheque = function (cheque) {
            currentRegistration.getRegistration().cheques.splice(_this.registration.cheques.indexOf(cheque), 1);
            totalChequesAmount.remove(cheque.amount);
        };

        _this.addCheque = function () {

            if (_this.tmpCheque.adjustable) {
                if (angular.isDefined(_this.tmpCheque.amount) &&
                    parseInt(_this.tmpCheque.amount) >= 1 &&
                    angular.isDefined(_this.tmpCheque.adjustableDate)) {

                    totalChequesAmount.add(_this.tmpCheque.amount);
                    _this.tmpCheque.adjustableDate = Date.parse(_this.tmpCheque.adjustableDate);
                    currentRegistration.getRegistration().cheques.push(_this.tmpCheque);
                    _this.tmpCheque = {
                        adjustable: true
                    };
                }
            }else {
                if (angular.isDefined(_this.tmpCheque.amount) &&
                    parseInt(_this.tmpCheque.amount) >= 1 ) {

                    totalChequesAmount.add(_this.tmpCheque.amount);
                    _this.tmpCheque.adjustableDate = undefined;
                    currentRegistration.getRegistration().cheques.push(_this.tmpCheque);
                    _this.tmpCheque = {
                        adjustable: true
                    };
                }
            }

        };
    })
;

