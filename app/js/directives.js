/**
 * Created by ayed.h on 04/03/2016.
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

    .directive('googleplace', function() {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, model) {
                    var options = {
                        types: [],
                        componentRestrictions: { country: 'fr' }
                    };
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                    google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                        scope.$apply(function() {
                            model.$setViewValue(element.val());
                        });
                    });
                }
            };
        });
//myApp.factory('myService', function() {});

function MyCtrl($scope) {
    $scope.gPlace;
}