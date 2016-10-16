angular.module('dashingApp.dashboard').
controller('dashingJsDateCtrl', function($scope, config, $element, $timeout, $sce, $compile) {

    $scope.tickInterval = 1000; //ms
    $scope.date_format = 'EEE dd MMM yyyy';
    $scope.clock_format = 'HH:mm:ss';
    var tick = function() {
        $scope.now = Date.now();
        $timeout(tick, $scope.tickInterval); // reset the timer
    };

    // Start the timer
    $timeout(tick, $scope.tickInterval);

});