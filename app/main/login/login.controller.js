/**
 * Created by ayed.h on 14/03/2016.
 */
angular.module('aajbApp')

    .controller('LoginCtr', function ($state, UserService) {
        var _this = this;
        _this.dateNow = new Date();
        _this.username = undefined;
        _this.password = undefined;
        _this.alerts = [];

        _this.login = function () {

            UserService.login(_this.username, _this.password)
                .then(
                    function () {
                        $state.go('main.home');
                    },
                    function (message) {
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
