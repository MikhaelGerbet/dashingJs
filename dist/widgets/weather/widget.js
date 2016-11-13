'use strict';

angular.module('dashingApp.dashboard').
controller('dashingJsWeatherCtrl', function($scope, $interval, $http, $cacheFactory, $ocLazyLoad) {
    var defaultParams = {
            OpenWeatherMapKey : '630c94cc5bc8a7a9c1d0c13032ef5a68',
            city : 'Paris',
            country : 'France',
            geoloc : false,
            interval : 1000*60*5
        },
        item = $scope.item || {params:{}},
        params = angular.extend({}, defaultParams, item.params);

    $ocLazyLoad.load('widgets/weather/owfont-master/css/owfont-regular.min.css');

    function getWeeklyWeather(){
        $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' +
            $scope.city +
            ',' +
            $scope.country +
            '&mode=json&units=metric&APPID=' +
            params.OpenWeatherMapKey).
        then(function(response){
            $scope.data = response.data;
            if ($scope.data.list.length) {
                $scope.data.list.forEach(function(i, v) {
                    let date = moment(i.dt * 1000);
                    i.dt = {day: date.format('ddd')};
                    if(moment().format('d') === date.format('d')) {
                        i.dt.today = true;
                    }
                });
            }
            $scope.at = new Date();
        })
    }

    if(params.geoloc){
        $http.get('http://freegeoip.net/json/').
        then(function(response){
            $scope.city = response.data.city || params.city;
            $scope.country = response.data.country || params.country;
            $interval(function(){
                getWeeklyWeather();
            }, params.interval);
            getWeeklyWeather();
        });
    }else{
        $scope.city = params.city;
        $scope.country = params.country;
        $interval(function(){
            getWeeklyWeather();
        }, params.interval);
        getWeeklyWeather();
    }
});