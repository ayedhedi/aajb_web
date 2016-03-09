/**
 * Created by ayed.h on 29/02/2016.
 */
'use strict';

angular.module('aajbApp', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ui.bootstrap.datetimepicker']);

angular.module('aajbApp').config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/partials/login.html',
            controller: 'LoginCtr',
            controllerAs: 'loginCtr'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'app/partials/home.html',
            controller: 'HomeCtr',
            controllerAs: 'homeCtr'
        })
        .state('home.addRegistration', {
            url: '/addRegistration',
            templateUrl: 'app/partials/addRegistration.html',
            controller: 'AddRegistration',
            controllerAs: 'addRegistration'
        })
        .state('home.addRegistration.newParent', {
            url: '/newParent',
            templateUrl: 'app/partials/newParent.html'
        })
        .state('home.addRegistration.newStudent', {
            url: '/newStudent',
            templateUrl: 'app/partials/newStudent.html'
        })
        .state('home.addRegistration.findParent', {
            url: '/findParent',
            templateUrl: 'app/partials/findParent.html'
        })
    ;

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
});

angular.module('aajbApp').run(function($rootScope,$state) {
    $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
        if ( toState.name !== 'login' && $rootScope.authenticatedUser==false) {
            $state.go('login');
        }
    });
});

angular.module('aajbApp').controller('MainCtr', function ($scope, $state, Auth) {

    moment.locale('fr');

    this.isConnected = function () {
        return angular.isDefined($scope.authenticatedUser);
    };

    this.logout = function () {
        Auth.Logout(function (status) {
            if (status == true) {
                $state.go('login');
            }else {
                alert("Erreur de déconnection !!");
                $state.go('login');
            }
        });
    };
});





var mess_errConn = "Connexion impossible au serveur. Veuillez réessayer plus tard. " +
    "Si l'erreur persiste, veuillez contacter l'administrateur système !!";
var mess_invalidPass = "login ou mot de passe invalide";
var mess_invalidLogOut = "Déconnection Impossible !! Si l'erreur persiste, veuillez contacter l'administrateur système !! ";