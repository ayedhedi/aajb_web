/**
 * Created by ayed.h on 15/03/2016.
 */
angular.module('aajbApp')

    .controller('ParentList', function ($scope, $state, $timeout, Api, usSpinnerService) {
        var _this = this;
        var desc = false;
        var size = 10;

        var orderBy = "id";

        _this.showMain=true;
        _this.parents = [];
        _this.search = undefined;
        _this.order = '+id';
        _this.numberOfPage = 0;
        _this.currentPage = 0;
        _this.isAdmin = $scope.isAdmin;
        _this.selectedParent = undefined;
        _this.selectedParentRegistrations = [];
        _this.isSpinActive = false;
    
    
        /**
        *   Send a request to the Api Service and get a promise 
        */
        _this.sendRequest = function () {
            //set spinning on
            usSpinnerService.spin('spinnerParentList');
            _this.isSpinActive = true;
            console.log("ok");
            
            //      Api web service call -------------------------------------------------------> API Call 
            Api.readParentsPage(_this.search, _this.currentPage, size) 
                .then(
                    function(result){
                        //update result 
                        _this.parents = result.parents;
                        _this.numberOfPage = result.numberOfPages;
                        
                        //set spinning off
                        usSpinnerService.stop('spinnerParentList');
                        _this.isSpinActive = false;
                        
                    },
                    function(error){
                        //set spinning off
                        usSpinnerService.stop('spinnerParentList');
                        _this.isSpinActive = false;
                    }
                )
        };

        /**
        * Re-load the parent list 
        */
        _this.reloadParentList = function () {
            _this.sendRequest();
            _this.currentPage = 0;
        };
    
        
        //load first page first time
        _this.reloadParentList();

    
        //changes the order
        _this.changeOrder = function (ord) {
            if (ord==orderBy) {
                desc = !desc;
            } else {
                desc = false;
                orderBy = ord;
            }
            if (desc){
                _this.order = '-' + orderBy;
            }else {
                _this.order = '+' + orderBy;
            }
        };

        _this.changePageFirst = function () {
            _this.currentPage = 0;
            _this.sendRequest();
        };
        _this.changePagePrevious = function () {
            if (_this.currentPage > 0) {
                _this.currentPage --;
                _this.sendRequest();
            }
        };
        _this.changePageNext = function () {
            if (_this.currentPage < _this.numberOfPage-1) {
                _this.currentPage ++;
                _this.sendRequest();
            }
        };
        _this.changePageLast = function () {
            _this.currentPage=_this.numberOfPage-1;
            _this.sendRequest();
        };

    
        /**
        * View a prent detail ------------------------------------------------------------------------> API Call 
        */
        _this.loadParentDetails = function (parent) {
            _this.showMain = false;
            _this.selectedParent = parent;
            //wait for the animation
            $timeout(function () {
                $state.go(".parentDetails");
            },500);
            //read registration of this parent
            Api.readRegistrationOfParent(parent.id)
                .then(
                function(registrations) {
                    if (angular.isDefined(registrations)) {
                        _this.selectedParentRegistrations = registrations;
                    }
                },
                function(error){
                    
                }
            )

        };

        _this.adjusted = function (registration) {
            var i = 0;
            registration.cheques.map(function (cheque) {
                if (cheque.adjust)
                {
                    i++;
                }
            });
            return i;
        };

        _this.cancelParentDetails = function () {
            _this.showMain = true;
            _this.selectedParent = undefined;
            _this.selectedParentRegistrations = [];
            $state.go("main.home.parentList");
        };
    })

;