'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('dashingJs:widget:value', function() {
  describe('value', function() {
    beforeEach(function() {
      browser.get('index.html');
    });
    it('should render dashingJsValueCtrl widget when user navigates to /dashboard', function() {
      setTimeout(function(){
        expect(element.all(by.css('.dashingJsValueCtrl'))).toBeDefined();
        done();
      }, 500);
    });
  });
});
