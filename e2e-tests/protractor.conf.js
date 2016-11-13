//jshint strict: false
require('../app/tests/config.js');

exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        '*.js'//,
       // '../app/widgets/**/*_spec.js'
    ],
    capabilities: {
        'browserName': 'chrome'
    },
    baseUrl: 'http://localhost:9002/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};