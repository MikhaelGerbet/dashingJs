'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('dashingJs:widget:area', function() {
  describe('area', function() {
    beforeEach(function() {
      browser.get('index.html');
    });
    it('should render dashingJsAreaCtrl widget when user navigates to /dashboard', function() {
      setTimeout(function(){
        expect(element.all(by.css('.dashingJsAreaCtrl'))).toBeDefined();
        done();
      }, 500);
    });
  });
});
