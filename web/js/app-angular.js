var flavorboardApp = angular.module('flavorboardApp', [
  'ngRoute',
  'flavorboardControllers'
]);

flavorboardApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/flavors', {
        templateUrl: 'partials/flavor-list.html',
        controller: 'FlavorListCtrl'
      }).
      // when('/phone/:phoneId', {
      //   templateUrl: 'partials/phone-detail.html',
      //   controller: 'PhoneDetailCtrl'
      // }).
      otherwise({
        redirectTo: '/flavors'
      });
}]);