'use strict';

var dashingJs = angular.module('dashingApp', [
  'ngRoute',
  'dashingApp.dashboard',
  'gridster',
  'angularMoment',
  'ngSanitize',
  'btford.markdown',
  'ngAnimate',
  'emoji',
  'oc.lazyLoad',
  'base64',
  'angular-flipper'
]).
constant('config', config).
run(['gridsterConfig','config', function(gridsterConfig, config) {
  gridsterConfig.columns = config.columns;
  gridsterConfig.margins = config.margins;
  gridsterConfig.rowHeight = config.rowHeight;
  gridsterConfig.colWidth = config.colWidth;
  gridsterConfig.resizable = {enabled: false, handles: []};
  gridsterConfig.draggable = {enabled: false};
  gridsterConfig.pushing = false;
  gridsterConfig.floating = false;
  gridsterConfig.swapping = true;
  gridsterConfig.outerMargin = false;
}]).
run(function(amMoment) {
  amMoment.changeLocale(config.lang);
}).
config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/dashboard'});
  $httpProvider.defaults.useXDomain = true;
}]).
directive('dynamicCtrl', ['$compile', '$parse',function($compile, $parse) {
  return {
    restrict: 'A',
    terminal: true,
    priority: 100000,
    link: function(scope, elem) {
      var name = $parse(elem.attr('dynamic-ctrl'))(scope);
      elem.removeAttr('dynamic-ctrl');
      elem.attr('ng-controller', name);
      $compile(elem)(scope);
    }
  };
}]);
