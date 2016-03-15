/**
 * Created by ayed.h on 15/03/2016.
 */

angular.module('aajbApp').service('Api',function ($http) {
        var service = {};

        service.CheckEmail = function (email, callback) {
            $http.get('/apiaajb/api/secure/parent/findByEmail/?email='+email)
                .success(function(data) {
                    if (data.status == "true") {
                        callback(true);
                    }else {
                        callback(false);
                    }
                }).error(function() {
                    callback(false);
                });
        };

        service.checkBirthdate = function (date, callback) {
            $http.get('/apiaajb/api/dataCheck/studentBirthDate?date='+date)
                .success(function(data) {
                    if (data == true) {
                        callback(true);
                    }else {
                        callback(false);
                    }
                }).error(function() {
                    callback(false);
                });
        };

        service.saveRegistration = function (registration, callback) {
            $http({
                method: 'POST',
                data: angular.toJson(registration, false),
                url: '/apiaajb/api/secure/registration',
                transformRequest: angular.identity
            }).success(function(result){
                callback(result);
            }).error(function(){
                console.log('Error');
            });
        };

        service.findParents = function (query, callback) {
            $http({
                url: '/apiaajb/api/secure/parent/find',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: $.param({ 'match' : query })
            })
                .then(function(response) {
                    callback(response);
                },
                function(response) { // optional
                    console.log('Error');
                });

        };

        service.readParents = function (callback) {
            $http({
                url: '/apiaajb/api/secure/parent',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
                .then(function(response) {
                    callback(response.data);
                });
        };

        service.readParentsPage = function (search, page, size, callback) {
            var url  = "/apiaajb/api/secure/parent/paged?&page="+page+"&size="+size;
            if (search != undefined) {
                url += "&search="+search;
            }

            $http({
                url: url,
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
                .then(function(response) {
                    callback(response.data);
                });
        };

        service.readRegistrationOfParent = function (id, callback) {
            $http({
                url: '/apiaajb/api/secure/registration/findByParentId?id='+id,
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
                .then(function(response) {
                    callback(response.data.registrations);
                });
        };

        service.readClassesSize = function (callback) {
            $http(
                {
                    url: '/apiaajb/api/secure/student/classNames',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }
            ).
                then(function (response) {
                    callback(response.data);
                })
        };



        return service;
    })



;