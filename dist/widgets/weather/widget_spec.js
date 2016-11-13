'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('dashingJs:widget:weather', function() {
  describe('weather', function() {
    beforeEach(function() {
      browser.get('index.html');
    });
    it('should render dashingJsWeather widget when user navigates to /dashboard', function() {
      setTimeout(function(){
        expect(element.all(by.css('.dashingJsWeather'))).toBeDefined();
        done();
      }, 500);
    });

  });
});
