'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('dashingJs', function() {
  it('should automatically redirect to /dashboard when location hash/fragment is empty', function() {
    browser.get('index.html');

    expect(browser.getLocationAbsUrl()).toMatch("/dashboard");
  });

  describe('dashboard', function() {
    beforeEach(function() {
      browser.get('index.html#!/dashboard');
    });


    browser.debugger();

    //expect(element.all(by.css('[ng-view] > div[gridster]'))).toBeDefined();
    /*
    it('should render gridster when user navigates to /dashboard', function() {
      setTimeout(function(){
        expect(element.all(by.css('[ng-view] > div[gridster]'))).toBeDefined();
        // Let Jasmine know the test is done.
        done();
      }, 500);
    });*/

  });
});
