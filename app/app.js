/**
 * Created by ayed.h on 29/02/2016.
 */
'use strict';

angular.module('aajbApp', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ui.bootstrap.datetimepicker']);

angular.module('aajbApp').config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('main', {
            url: '/main',
            template: '<div ui-view></div>',
            controller: 'MainCtr',
            controllerAs: 'mainCtr'
        })
        .state('main.login', {
            url: '/login',
            templateUrl: 'app/partials/login.html',
            controller: 'LoginCtr',
            controllerAs: 'loginCtr'
        })
        .state('main.home', {
            url: '/main/home',
            templateUrl: 'app/partials/home.html',
            controller: 'HomeCtr',
            controllerAs: 'homeCtr'
        })
        .state('main.home.addRegistration', {
            url: '/addRegistration',
            templateUrl: 'app/partials/addRegistration.html',
            controller: 'AddRegistration',
            controllerAs: 'addRegistration'
        })
        .state('main.home.addRegistration.newParent', {
            url: '/newParent',
            templateUrl: 'app/partials/newParent.html'
        })
        .state('main.home.addRegistration.newStudent', {
            url: '/newStudent',
            templateUrl: 'app/partials/newStudent.html'
        })
        .state('main.home.addRegistration.findParent', {
            url: '/findParent',
            templateUrl: 'app/partials/findParent.html'
        })
        .state('main.home.parentList', {
            url: '/parentList',
            templateUrl: 'app/partials/parents.html',
            controller: 'ParentList',
            controllerAs: 'parentList'
        })
        .state('main.home.parentList.parentDetails', {
            url: '/parentDetails',
            templateUrl: 'app/partials/parentDetails.html'
        })

    ;

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
});

angular.module('aajbApp').run(function($rootScope,$state) {
    moment.locale('fr');

    $rootScope.isAuthenticated = false;
    $state.go('main.login');

    $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
        if ( toState.name !== 'main.login' && $rootScope.isAuthenticated==false) {
            $state.go('main.login');
        }
    });
});


var mess_errConn = "Connexion impossible au serveur. Veuillez réessayer plus tard. " +
    "Si l'erreur persiste, veuillez contacter l'administrateur système !!";
var mess_invalidPass = "login ou mot de passe invalide";
var mess_invalidLogOut = "Déconnection Impossible !! Si l'erreur persiste, veuillez contacter l'administrateur système !! ";