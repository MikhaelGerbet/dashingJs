'use strict';

angular.module('dashingApp.dashboard').
controller('dashingJsImageCtrl', function($scope) {
    $scope.image = $scope.item.params.image || null;
});