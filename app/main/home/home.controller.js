/**
 * Created by ayed.h on 14/03/2016.
 */
angular.module('aajbApp')

    .controller('HomeCtr', function($state){

        this.loadParentList = function () {
            $state.go("main.home.parentList");
        };

        this.loadAddReg = function () {
            $state.go("main.home.addRegistration");
        }
    })

;