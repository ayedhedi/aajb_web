/**
 * Created by ayed.h on 14/03/2016.
 */
angular.module('aajbApp')

    .controller('LoginCtr', function ($state, UserService, usSpinnerService) {
        var _this = this;
        _this.dateNow = new Date();
        _this.username = undefined;
        _this.password = undefined;
        _this.alerts = [];
        _this.isSpinActive = false;

        _this.login = function () {
            //show the spinner 
            usSpinnerService.spin('spinner-login');
            _this.isSpinActive = true;

            //call the login service            -----------------------------> Api Call
            UserService.login(_this.username, _this.password)
                .then(
                    function () {
                        //stop the spinner 
                        usSpinnerService.stop('spinner-login');
                        _this.isSpinActive = false;
                        
                        //no problem --> change the state to main.home
                        $state.go('main.home');
                    },
                    function (message) {
                        //stop the spinner 
                        usSpinnerService.stop('spinner-login');
                        _this.isSpinActive = false;
                        
                        //somthing wrong !! show a message 
                        _this.alerts.push({
                            type: "success",
                            msg: message
                        })
                    })
        };

        _this.removeMess = function() {
            _this.alerts = [];
        }
    })
;
