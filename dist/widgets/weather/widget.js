'use strict';

angular.module('dashingApp.dashboard').
controller('dashingJsWeatherCtrl', function($scope, $interval, $http, $cacheFactory, $ocLazyLoad) {
    $ocLazyLoad.load('widgets/weather/owfont-master/css/owfont-regular.min.css');

    function getWeeklyWeather(){
        $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' +
            $scope.city +
            ',' +
            $scope.country +
            '&mode=json&units=metric&APPID=' +
            $scope.item.params.OpenWeatherMapKey).
        then(function(response){
            $scope.data = response.data;
            if ($scope.data.list.length) {
                $scope.data.list.forEach(function(i, v) {
                    let date = moment(i.dt * 1000);
                    i.dt = {
                        day: date.format('ddd')
                    };
                    if(moment().format('d') === date.format('d')) {
                        i.dt.today = true;
                    }
                });
            }
            $scope.at = new Date();
        })
    }

    $http.get('http://freegeoip.net/json/').
    then(function(response){
        $scope.city = response.data.city || 'Paris';
        $scope.country = response.data.country || 'France';
        $interval(function(){
            getWeeklyWeather();
        }, 1000*60*5);
        getWeeklyWeather();
    });
});