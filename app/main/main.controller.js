/**
 * Created by ayed.h on 14/03/2016.
 */
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

;