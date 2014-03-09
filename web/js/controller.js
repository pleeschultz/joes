'use strict';

/* Controllers */

var flavorboardApp = angular.module('flavorboardApp', []);

flavorboardApp.controller('FlavorListCtrl', function($scope) {
  $scope.flavors = [
    {'name': 'dakota berry',
     'details': 'Yummy yummy.',
     'img': 'images/nameplates/n-1.jpg'
    },
    {'name': 'chocolate',
     'details': 'boring!',
     'img': 'images/nameplates/n-2.jpg'
    },
    {'name': 'loco coco',
     'details': 'Fruity!',
     'img': 'images/nameplates/n-3.jpg'
    },
    {'name': 'salty caramel',
     'details': 'Weird Al!',
     'img': 'images/nameplates/n-4.jpg'
    },
    
  ];
});
