/**
 * Created by ayed.h on 14/03/2016.
 */
angular.module('aajbApp')

    .controller('NewStudent', function ($state, Api, addRegistrationPanel, currentRegistration, currentStudent, classesName, editStudent) {
        var _this = this;

        //a temp variable to store new student creation
        _this.tmpStudent = currentStudent.getStudent();
        //this will controle the birth date validation
        _this.isBirthDateValid = false;

        //list of the classes names
        _this.classesNames = classesName.getNames();

        //at sloading if edit mode --> date is so valid
        if (angular.isDefined(_this.tmpStudent.birthDate)) {
            this.isBirthDateValid = true;
        }

        //will be called when birth date of new student is changed
        _this.onTimeSet = function (newDate, oldDate) {
            _this.isBirthDateValid = false;
            Api.checkBirthdate(Date.parse(newDate), function (result) {
                if (result) {
                    _this.isBirthDateValid = true;
                }
            });
        };

        _this.okNewStudent = function () {
            if (!editStudent.getEdit()) {
                //if not editing then push it to the list
                currentRegistration.getRegistration().students.push(_this.tmpStudent);
            }else {
                //if edit mode then cancel it
                editStudent.setEdit(false);
            }

            //empty the temp object
            _this.tmpStudent = {};

            //show & go to main panel
            addRegistrationPanel.show();
            $state.go("main.home.addRegistration");
        };

        _this.cancelNewStudent = function () {
            editStudent.setEdit(false);

            //empty the temp object
            _this.tmpStudent = {};

            //show & go to main panel
            addRegistrationPanel.show();
            $state.go("main.home.addRegistration");
        };


    })

;