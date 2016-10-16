'use strict';

angular.module('dashingApp.dashboard').
controller('dashingJsHelloWorldCtrl', function($scope) {
    $scope.message = $scope.item.params.message || 'Hello World';
});