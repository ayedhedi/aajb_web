/**
 * Created by ayed.h on 14/03/2016.
 */
angular.module('aajbApp')

    .controller('MainCtr', function ($state, UserService) {
        /**
        *Calls the logout service and redirect to login page 
        */
        this.logout = function () {
            UserService.logout();
            $state.go("main.login");
        };
    })

;