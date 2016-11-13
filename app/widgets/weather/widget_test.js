'use strict';

describe('dashingApp.dashboard weather', function() {

  beforeEach(module('dashingApp.dashboard'));

  describe('weather controller', function(){

    var scope, dashingJsWeatherCtrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      dashingJsWeatherCtrl = $controller('dashingJsWeatherCtrl', {$scope: scope, config: config});
    }));

    it('controller dashingJsWeatherCtrl should be defined', inject(function() {
      expect(dashingJsWeatherCtrl).toBeDefined();
    }));
  });
});