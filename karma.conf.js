//jshint strict: false
module.exports = function(config) {
    config.set({
        basePath: './app',
        files: [
            '../bower_components/angular/angular.js',
            '../bower_components/angular-route/angular-route.js',
            '../bower_components/angular-loader/angular-loader.js',
            '../bower_components/angular-mocks/angular-mocks.js',
            '../bower_components/jquery/dist/jquery.js',
            '../bower_components/modernizr/modernizr.js',
            '../bower_components/javascript-detect-element-resize/detect-element-resize.js',
            '../bower_components/angular-gridster/src/angular-gridster.js',
            '../bower_components/highcharts/highcharts.js',
            '../bower_components/moment/moment.js',
            '../bower_components/angular-moment/angular-moment.js',
            '../bower_components/angular-sanitize/angular-sanitize.js',
            '../bower_components/showdown/src/showdown.js',
            '../bower_components/angular-markdown-directive/markdown.js',
            '../bower_components/angular-animate/angular-animate.js',
            '../bower_components/angular-emoji/dist/emoji.min.js',
            '../bower_components/oclazyload/dist/ocLazyLoad.js',
            '../bower_components/angular-base64/angular-base64.js',
            '../bower_components/bootstrap/dist/js/bootstrap.js',
            '../bower_components/angular-i18n/angular-locale_fr-fr.js',
            '../bower_components/moment/locale/fr.js',
            'tests/config.js',
            'dashboard/**/*.js',
            'widgets/**/*widget.js',
            'tests/jobs.js',
            'widgets/**/*_test.js'
        ],
        autoWatch: true,
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
