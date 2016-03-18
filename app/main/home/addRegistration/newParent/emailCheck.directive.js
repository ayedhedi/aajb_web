/**
 * Created by ayed.h on 15/03/2016.
 */

angular.module('aajbApp')

    .directive('emailcheck', function($q, Api) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$asyncValidators.emailcheck = function(modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty model valid
                        return $q.when();
                    }

                    var def = $q.defer();

                    Api.CheckEmail(modelValue, function (check) {
                        if (check) {
                            def.reject();
                        }else {
                            def.resolve();
                        }
                    });
                    return def.promise;
                };
            }
        };
    })

;