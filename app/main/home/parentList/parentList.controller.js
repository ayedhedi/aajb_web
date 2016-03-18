/**
 * Created by ayed.h on 15/03/2016.
 */
angular.module('aajbApp')

    .controller('ParentList', function ($scope, $state,$timeout,Api) {
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

        _this.sendRequest = function () {
            Api.readParentsPage(_this.search, _this.currentPage, size, function (data) {
                _this.parents = data.parents;
                _this.numberOfPage = data.numberOfPages;
            });
        };

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

        _this.loadParentDetails = function (parent) {
            _this.showMain = false;
            _this.selectedParent = parent;
            //wait for the animation
            $timeout(function () {
                $state.go(".parentDetails");
            },500);
            //read registration of this parent
            Api.readRegistrationOfParent(parent.id, function (registrations) {
                if (angular.isDefined(registrations)) {
                    _this.selectedParentRegistrations = registrations;
                    console.log(_this.selectedParentRegistrations);
                }
            });

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