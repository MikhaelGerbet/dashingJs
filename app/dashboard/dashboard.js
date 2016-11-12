'use strict';

angular.module('dashingApp.dashboard', ['ngRoute', 'oc.lazyLoad']).
config(function($routeProvider) {
    var widgets = [];
    for(var i in config.items){
        if(config.items[i].flip && config.items[i].flip.front && config.items[i].flip.front.widget) {
            widgets.push('/widgets/' + config.items[i].flip.front.widget + '/widget.js');
            widgets.push('/widgets/' + config.items[i].flip.front.widget + '/widget.css');
        }
        if(config.items[i].flip && config.items[i].flip.back && config.items[i].flip.back.widget) {
            widgets.push('/widgets/' + config.items[i].flip.back.widget + '/widget.js');
            widgets.push('/widgets/' + config.items[i].flip.back.widget + '/widget.css');
        }
        if(config.items[i].widget){
            widgets.push('/widgets/' + config.items[i].widget + '/widget.js');
            widgets.push('/widgets/' + config.items[i].widget + '/widget.css');
        }
    }
    $routeProvider.when('/dashboard', {
        templateUrl: '/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        resolve : {
            lazy: function ($ocLazyLoad){
                return $ocLazyLoad.load(widgets);
            }
        }
    })
}).
controller('DashboardCtrl', function($scope, config) {
    this.items = config.items;// for tests
    $scope.items = this.items;
});