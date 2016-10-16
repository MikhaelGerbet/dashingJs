'use strict';

angular.module('dashingApp.dashboard').
controller('dashingJsGiphyCtrl', function($scope, $http, $interval) {
    function setImage(){
        var search = $scope.item.params.search[Math.floor(Math.random()*$scope.item.params.search.length)];
        $http({
            method: 'GET',
            url: 'http://api.giphy.com/v1/gifs/search?q='+encodeURIComponent(search)+'&api_key=dc6zaTOxFJmzC&limit=1000'
        }).then(function successCallback(response) {
            var items = response.data.data,
                item = items[Math.floor(Math.random()*items.length)];
            $scope.image = item.images.fixed_height.url;
        });
    };
    $interval(setImage, $scope.item.params.interval);
    setImage();
});