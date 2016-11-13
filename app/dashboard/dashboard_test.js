'use strict';

describe('dashingApp.dashboard module', function() {

  beforeEach(module('dashingApp.dashboard'));

  describe('dashboard controller', function(){

    var scope, DashboardCtrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      DashboardCtrl = $controller('DashboardCtrl', {$scope: scope, config: config});
    }));

    it('controller should be defined', inject(function() {
      expect(DashboardCtrl).toBeDefined();
    }));

    it('items length should not be equal to 0', inject(function() {
      expect(DashboardCtrl.items.length).not.toEqual(0);
    }));
  });
});