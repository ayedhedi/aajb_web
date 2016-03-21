/**
 * Created by ayed.h on 15/03/2016.
 */

angular.module('aajbApp').service('Api',function ($http, $q) {
        var service = {};
    

        /**
        *   Checks if a given email is already used or not 
        *   @param email: the email to check 
        *   @return: a promise that the job will be done ;) 
        */
        service.CheckEmail = function (email) {
            //the promise to return
            var deferred = $q.defer();
            
            //send the http request
            $http.get('/apiaajb/api/secure/parent/findByEmail/?email='+email)
                .then(
                    function(response){
                        //no problem 
                        deferred.resolve(response.status);
                    }, 
                    function(error, status){
                        console.log("Error checking email: ["+status+"] : "+error);
                        deferred.reject(error);
                    }
                );
            
            return deferred.promise;
        };

    
        /**
        * checks if a given birthdate is well formated and accpetable or not
        * @param date: the date to check
        * @return: a promise that the job will be done 
        */
        service.checkBirthdate = function (date) {
            var deferred = $q.defer();
            
            $http.get('/apiaajb/api/dataCheck/studentBirthDate?date='+date)
                .success(function(result) {
                    deferred.resolve(result);
                
                }).error(function(error, status) {
                    console.log("Error checking brithdate: ["+status+"] : "+error);
                    deferred.reject(error);
                });
        };
    
    

        /**
        * save a given registration.
        * @prama registration: the json of the registration to save 
        * @return a promise that the job will be done 
        */
        service.saveRegistration = function (registration) {
            var deferred = $q.defer();
            
            $http({
                method: 'POST',
                data: angular.toJson(registration, false),
                url: '/apiaajb/api/secure/registration',
                transformRequest: angular.identity
            })
            .then(
                function(result){
                    deferred.resolve(result);
                },
                function(error, status) {
                    console.log("Error saving registration: ["+status+"] : "+error);
                    deferred.reject(error);
                }
            );
            
            
            return deferred.promise;
        };

    
    
        /**
        * Find a parents according to a searching query 
        * @param query: the searching query 
        * @return: a list of parent
        */
        service.findParents = function (query) {
            var deferred = $q.defer();
            
            $http({
                url: '/apiaajb/api/secure/parent/find',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: $.param({ 'match' : query })
            })
            .then(
                function(response) {
                    deferred.resolve(response);
                },
                function(error,status) {
                    console.log("Error whit hte parent search query ["+status+"] : "+error);
                    deferred.reject();
                }
            );
            
            return deferred.promise;
        };

    
    
        /**
        * Read a page of parent according to a search query 
        * @param search: the searching query 
        * @param page: the number of the page to load 
        * @param size: the number of person per page 
        */
        service.readParentsPage = function (search, page, size) {
            var deferred = $q.defer();
            var url  = "/apiaajb/api/secure/parent/paged?&page="+page+"&size="+size;
            
            if (search != undefined) {
                url += "&search="+search;
            }

            $http({
                url: url,
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
            .then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(error, status){
                    console.log("Error loading parent list ["+status+"] : "+error);
                    deferred.reject(error);
                }
            );
            
            return deferred.promise;
        };

    
    
        /**
        * read the registration list of a given parent id
        * @param id: the parent id 
        * @promise the the job will be done 
        */
        service.readRegistrationOfParent = function (id) {
            var deferred = $q.defer();
            
            $http({
                url: '/apiaajb/api/secure/registration/findByParentId?id='+id,
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
            .then(
                function(response) {
                    deferred.resolve(response.data.registrations);
                },
                function(error, status){
                    console.log("Error where getting registration list ["+status+"] : "+error);
                    deferred.reject();
                }
            );
            
            return deferred.promise;
        };

    
    
        /**
        * read the number of student by class name 
        */
        service.readClassesSize = function () {
            var deferred = $q.defer();
            
            $http(
                {
                    url: '/apiaajb/api/secure/student/classNames',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }
            ).
            then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (error, status) {
                    console.log("Error reading classes size ["+status+"] " +error);
                    deferred.reject(error);
                }
            )
        };



        return service;
    })



;