/**
 * Created by ayed.h on 29/02/2016.
 */
'use strict';

angular.module('aajbApp', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ui.bootstrap.datetimepicker'])

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
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
                templateUrl: 'app/main/login/login.html',
                controller: 'LoginCtr',
                controllerAs: 'loginCtr'
            })
            .state('main.home', {
                url: '/main/home',
                templateUrl: 'app/main/home/home.html',
                controller: 'HomeCtr',
                controllerAs: 'homeCtr'
            })
            .state('main.home.addRegistration', {
                url: '/addRegistration',
                templateUrl: 'app/main/home/addRegistration/addRegistration.html',
                controller: 'AddRegistration',
                controllerAs: 'addRegistration'
            })
            .state('main.home.addRegistration.newParent', {
                url: '/newParent',
                templateUrl: 'app/main/home/addRegistration/newParent/newParent.html',
                controller: 'NewParent',
                controllerAs: 'newParent'
            })
            .state('main.home.addRegistration.newStudent', {
                url: '/newStudent',
                templateUrl: 'app/main/home/addRegistration/newStudent/newStudent.html',
                controller: 'NewStudent',
                controllerAs: 'newStudent'
            })
            .state('main.home.addRegistration.findParent', {
                url: '/findParent',
                templateUrl: 'app/main/home/addRegistration/findParent/findParent.html',
                controller: 'FindParent',
                controllerAs: 'findParent'
            })
            .state('main.home.parentList', {
                url: '/parentList',
                templateUrl: 'app/main/home/parentList/parentList.html',
                controller: 'ParentList',
                controllerAs: 'parentList'
            })
            .state('main.home.parentList.parentDetails', {
                url: '/parentDetails',
                templateUrl: 'app/main/home/parentList/parentDetails.html'
            })
        ;
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    })


    .run(function($rootScope, $state) {
        moment.locale('fr');

        $rootScope.isAuthenticated = false;
        $state.go('main.login');
        $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
            if ( toState.name !== 'main.login' && $rootScope.isAuthenticated==false) {
                $state.go('main.login');
            }
        });
    })

;
