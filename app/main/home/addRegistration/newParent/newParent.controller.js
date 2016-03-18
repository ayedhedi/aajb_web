/**
 * Created by ayed.h on 14/03/2016.
 */
angular.module('aajbApp')


    .controller('NewParent', function ($state, addRegistrationPanel, currentRegistration, currentParent) {
        var _this = this;

        //a temp variable to store new parent creation
        _this.tmpParent = {
            gender: 'MALE'
        };

        //click Ok of new Parent panel
        _this.okNewParent = function () {
            if (angular.isDefined($('#inputProf').val())){
                _this.tmpParent.job = $('#inputProf').val();
            }

            //save data according to parent number,
            if (currentParent.getParent() == 1) {
                currentRegistration.getRegistration().firstParent = _this.tmpParent;
            }else {
                currentRegistration.getRegistration().secondParent = _this.tmpParent;
            }

            //show & go to main panel
            addRegistrationPanel.show();
            $state.go("main.home.addRegistration");

            //reset tmp parent
            _this.tmpParent = {
                gender: 'MALE'
            }
        };

        //click cancel of new Parent panel
        _this.cancelNewParent = function () {
            _this.tmpParent = {
                gender: 'MALE'
            };
            addRegistrationPanel.show();
            $state.go("main.home.addRegistration");
        };

    })

;