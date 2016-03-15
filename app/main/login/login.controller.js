/**
 * Created by ayed.h on 14/03/2016.
 */
angular.module('aajbApp')

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
                        mess = "login ou mot de passe invalide";
                    }else {
                        mess = "Connexion impossible au serveur. Veuillez r�essayer plus tard. " +
                            "Si l'erreur persiste, veuillez contacter l'administrateur syst�me !!";
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
;
