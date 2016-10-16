'use strict';

angular.module('dashingApp.dashboard').
controller('dashingJsJiraCtrl', function($scope, $http, $interval, $base64) {

    $scope.title = $scope.item.params.title;
    $scope.total = null;
    $scope.alert = null;


    var jiraUrl = $scope.item.params.jiraUrl,
        project = $scope.item.params.project,
        status = $scope.item.params.status,
        login64 = $scope.item.params.login64,
        sondNewIssue = $scope.item.params.sondNewIssue,
        sondMaxIssue = $scope.item.params.sondMaxIssue,
        max = $scope.item.params.alert,

        issueId = [],
        initialised = false,

        alertSongNewIssue = new Audio(sondNewIssue),
        alertSongMaxIssue = new Audio(sondMaxIssue);

    $scope.$watch('alert', function(newValue, oldValue) {
        if (newValue) {
            alertSongMaxIssue.play();
        }
    });


    $scope.getValue = function(){
        $scope.at = new Date();
        $http.get('http://localhost/app/widgets/jira/jira.php?jiraUrl='+jiraUrl+'&project='+project+'&login64='+login64+'&status='+status).then(function (response) {

            $scope.alert = parseInt(response.data.total) > max;

            for(let i in response.data.issues) {
                var key = response.data.issues[i].key;
                if (issueId.indexOf(key) === -1) {
                    issueId.push(key);
                    if (initialised) {
                        alertSongNewIssue.play();
                    }
                }
            }

            $scope.total = response.data.total;
            if(response.data.error){
                $scope.error = response.data.error;
            }
            initialised = true;
        }).then(function(response){

        });
    };

    $interval($scope.getValue, 1000*5);
    $scope.getValue();
});