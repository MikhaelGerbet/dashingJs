'use strict';

describe('dashingApp.dashboard area', function() {
    beforeEach(module('dashingApp.dashboard'));
    describe('area controller', function(){
        var scope, dashingJsAreaCtrl, element;
        beforeEach(inject(function($rootScope, $controller, $injector) {
            scope = $rootScope.$new();
            element = angular.element('<div></div>');
            dashingJsAreaCtrl = $controller('dashingJsAreaCtrl', {
                $scope: scope,
                config: config,
                $element: element,
                $injector: $injector
            });
        }));
        it('controller dashingJsAreaCtrl should be defined', inject(function() {
            expect(dashingJsAreaCtrl).toBeDefined();
        }));
    });
});