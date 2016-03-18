/**
 * Created by ayed.h on 14/03/2016.
 */
angular.module('aajbApp')

    .controller('FindParent', function ($state, Api, addRegistrationPanel, currentParent, currentRegistration) {
        var _this = this;
        _this.findParents = [];

        //click on a parent to select it
        _this.selectParent = function (parent) {
            if (currentParent.getParent() == 1) {
                currentRegistration.getRegistration().firstParent = parent;
            }else {
                currentRegistration.getRegistration().secondParent = parent;
            }

            _this.cancelFindParent();
        };

        //call the web service to find parents
        _this.findNow = function (query) {
            if (angular.isDefined(query) && query.length > 2) {
                //call the web service now  -------------------------------------------------> API
                Api.findParents (query, function (resuls) {
                    _this.findParents = resuls.data;
                })
            }
        };

        //cancel find parent
        _this.cancelFindParent = function () {
            _this.findParents = [];
            //show & go to main panel
            addRegistrationPanel.show();
            $state.go("main.home.addRegistration");
        };


    })

;