/**
 * Created by ayed.h on 15/03/2016.
 */
'use strict';

angular.module('aajbApp')

    .service('Auth',function ( $rootScope, $http) {
        var service = {};
        service.Login = function (username, password, callback) {
            $rootScope.authenticatedUser = null;

            $http.get('/apiaajb/api/login?login='+username+"&password="+password)
                .success(function(data) {
                    if (data.status == "true") {
                        $rootScope.authenticatedUser = true;
                        $rootScope.isAdmin = data.isAdmin;
                        callback(true,0);
                    }else {
                        if (data.errors.indexOf("10101") == 0) {
                            callback(false, -1);
                        }
                    }
                })
                .error(function(error, status) {
                    console.log({ message: error, status: status});
                    callback(false, -2);
                });
        };
        service.Logout = function (callback) {
            $rootScope.authenticatedUser = null;
            $http.get('/apiaajb/api/logout')
                .success(function(data) {
                    if (data.status == "true") {
                        $rootScope.authenticatedUser = null;
                        callback(true);
                    }else {
                        callback(false);
                    }
                }).error(function(data) {
                    callback(false);
                });
        };

        return service;
    })


;