'use strict';

/* Controllers */

var flavorboardControllers = angular.module('flavorboardControllers', []);

flavorboardControllers.controller('FlavorListCtrl', ['$scope', '$http',
    function($scope, $http) {
    $http.get('json/flavors.json').success(function(data) {
      $scope.flavors = data;
    });
}]);
    /* $scope.orderProp = 'store';
        This is a remnant from the two-way data binding from http://docs.angularjs.org/tutorial/step_04.
        1. Can we add a 'store' property to these arrays, that can allow us all options AND specific store?
        2. Then, how do we overwrite the 'store' value from the Admin?
    */

    /*
    Additional filtering requirements:
        1). keyword search
        2). flavor category- ice cream, sorbet or froyo
    */

flavorboardControllers.controller('FlavorDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.flavorId = $routeParams.flavorId;
  }]);
