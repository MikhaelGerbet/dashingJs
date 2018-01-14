'use strict';

angular.module('dashingApp.dashboard').
controller('dashingJsGoogleAnalyticsCtrl', function($scope, $http, $interval, $ocLazyLoad) {
    var projectId = 'dashingjs-149821';
    var apiKey = 'AIzaSyCawjiuxaTBiQmT-RzpyFBsvJBG268u_6k';
    var clientId = '354605756334-96dovck5qp3ivb73hnh2l5v67g6qcfda.apps.googleusercontent.com';
    var clientSecret = 'Z_iuFlH11wZwEBzNMsbNR0Mt';
    var vueId = 'ga:105015716';



    $ocLazyLoad.load(['https://apis.google.com/js/api.js']).then(function () {
        function start() {
            // 2. Initialize the JavaScript client library.
            gapi.client.init({
                'apiKey': apiKey,
                'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
                // clientId and scope are optional if auth is not required.
                //'clientId': clientId,
                //'scope': 'profile'
            }).then(function() {

                alert(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
                /*
                // 3. Initialize and make the API request.
                return gapi.client.people.people.get({
                    resourceName: 'people/me'
                });*/
            }).then(function(resp) {
                console.log(resp.result);
            }, function(reason) {
                console.log('Error: ' + reason.result.error.message);
            });
        };

        gapi.load('client', start);

    })    /**/

    $http.get('https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A105015716&start-date=today&end-date=today&metrics=ga%3Asessions&access_token=ya29.Ci-ZA7jBspPUau4lV6p1EWgmSBBGBSja4NVBVa3CJUdWSiL8TWMDgiMLb3nHph2gPQ').
    then(function(response){

    });

});