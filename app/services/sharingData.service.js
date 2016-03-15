/**
 * Created by ayed.h on 14/03/2016.
 */
angular.module('aajbApp')

    .factory('addRegistrationPanel', function () {
        var state = true;
        return {
            show: function () {
                state = true;
            },
            hide: function () {
                state = false;
            },
            getState: function () {
                return state;
            }
        }
    })

    .factory('currentRegistration', function () {
        var registration = undefined;

        return {
            getRegistration: function () {
                return registration;
            },
            init: function (){
                registration =  {
                    firstParent: {
                        gender: 'MALE'
                    },
                    secondParent: {},
                    students: [],
                    cheques: []
                };
                return registration;
            }
        }
    })

    .factory('currentParent', function () {
        var parentNum;

        return {
            getParent: function () {
                return parentNum;
            },
            setParent: function (num) {
                parentNum = num;
            }
        }
    })

    .factory('editStudent', function () {
        var _edit = false;
        return {
            setEdit: function (edit) {
                _edit = edit;
            },
            getEdit: function () {
                return _edit;
            }
        }
    })

    .factory('currentStudent', function () {
        var _student = {};
        return {
            setStudent: function (student) {
                _student=student;
            },
            getStudent: function () {
                return _student;
            }
        }
    })

    .factory('classesName', function (Api) {
        var names = undefined;
        return {
            init: function () {
                Api.readClassesSize(function (data) {
                    names = data;
                });
                return names;
            },
            getNames: function () {
                return names;
            }
        }
    })

    .factory('totalChequesAmount', function () {
        var total = 0;
        return {
            add: function (amount) {
                total += amount;
            },
            remove: function (amount) {
                total -= amount;
            },
            get: function() {
                return total;
            }
        }
    })
;