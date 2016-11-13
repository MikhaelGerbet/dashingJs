'use strict';

describe('dashingApp.dashboard value', function() {

  beforeEach(module('dashingApp.dashboard'));

  describe('value controller', function(){

    var scope, dashingJsValueCtrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      dashingJsValueCtrl = $controller('dashingJsValueCtrl', {$scope: scope, config: config});
    }));

    it('controller dashingJsValueCtrl should be defined', inject(function() {
      expect(dashingJsValueCtrl).toBeDefined();
    }));
  });
});