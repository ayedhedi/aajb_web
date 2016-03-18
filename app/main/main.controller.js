/**
 * Created by ayed.h on 14/03/2016.
 */
angular.module('aajbApp')

    .controller('MainCtr', function ($state, UserService) {
        if ( UserService.isConnected() ) {
            $state.go("main.home");
        }else {
            $state.go("main.login");
        }

        this.logout = function () {
            $state.go("main.login");

            //TODO: explicit remote call for logout
            /*Auth.Logout(function (status) {
             if (status == true) {
             $state.go('login');
             }else {
             alert("Erreur de d�connection !!");
             $state.go('login');
             }
             });*/
        };
    })

;