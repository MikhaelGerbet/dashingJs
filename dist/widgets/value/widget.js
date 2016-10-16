'use strict';

angular.module('dashingApp.dashboard').
controller('dashingJsValueCtrl', ['$scope', '$http', '$interval', '$injector', function($scope, $http, $interval, $injector) {
    $scope.title = $scope.item.params.title;

    var job = $injector.get($scope.item.params.job);
    $scope.goal = $scope.item.params.goal;

    function getValue(){
        job.getValue().success(function(response){
            $scope.value = response.value;
            $scope.oldValue = response.oldValue || null;
            $scope.at = new Date();
        });
    }


    $interval(getValue, $scope.item.params.interval);
    getValue();
}]);