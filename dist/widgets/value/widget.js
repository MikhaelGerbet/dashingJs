'use strict';

angular.module('dashingApp.dashboard').
controller('dashingJsValueCtrl', function($scope, $http, $interval, $injector) {
    var defaultParams = {
            title : 'My value',
            job : 'mockJobValue',
            goal : 50,
            interval : 1000*60*5
        },
        item = $scope.item || {params:{}},
        params = angular.extend({}, defaultParams, item.params),
        job = $injector.get(params.job);

    $scope.title = params.title;
    $scope.goal = params.goal;

    function getValue(){
        job.getValue().success(function(response){
            $scope.value = response.value;
            $scope.oldValue = response.oldValue || null;
            $scope.at = new Date();
        });
    }

    $interval(getValue, params.interval);
    getValue();
});