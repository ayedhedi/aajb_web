/**
 * Created by ayed.h on 14/03/2016.
 */
angular.module('aajbApp')

    .factory("userConnected", function(){
        var user = undefined;
        return {
            getUser: function(){
                return user;
            },
            setUser: function(_user){
                user = _user;
            }
        }
    })

    .factory("messagesProvider", function () {
        var loginIncorrect = "Nom d'utilisateur ou mot de passe invalide !!";
        var serverDown = "Impossible de se connecter au serveur !!";
        var unknownError = "Une erreur inconnue s'est produite";

        return {
            getMessage: function (code) {
                switch (code) {
                    case 100: return unknownError;
                    case 101: return loginIncorrect;
                    case 102: return serverDown;
                }
            }
        }
    })

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