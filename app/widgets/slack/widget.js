'use strict';

angular.module('dashingApp.dashboard').
controller('dashingJsSlackCtrl', function($scope, $http, $interval) {
    $scope.title = $scope.item.params.title;
    $scope.items = [];
    $scope.loading = true;
    $scope.showing = null;
    $scope.hashtag = $scope.item.params.hashtag;
    $scope.showDate = $scope.item.params.showDate;

    if($scope.item.params.token === '_YOUR_SLACK_TOKEN_'){
        $scope.error = 'please replace "_YOUR_SLACK_TOKEN_" in config file';
        return;
    }
    if($scope.item.params.channel === '_YOUR_SLACK_CHANNEL_ID_'){
        $scope.error = 'please replace "_YOUR_SLACK_CHANNEL_ID_" in config file';
        return;
    }

    $scope.getMessage = function(){
        let hastag = $scope.item.params.hastag;
        $http({
            method: 'GET',
            url: 'https://slack.com/api/channels.history?pretty=1&token='+$scope.item.params.token+'&channel='+$scope.item.params.channel+'&pretty=1'
        }).then(function(response) {
            var items = response.data.messages;
            for(var i in items){
                if($scope.length >= $scope.item.params.maxItems){
                    break;
                }
                let item = items[i],
                    patt = new RegExp($scope.hashtag);

                if(item.type === 'message' && patt.test(item.text)) {
                    item.text = item.text.replace(/(<([^>]+)>)/ig, '').replace($scope.hashtag, '');
                    // tmp let message = item;
                    let message = item;
                    $http({
                        method: 'GET',
                        url: 'https://slack.com/api/users.info?pretty=1&token=' + $scope.item.params.token + '&user=' + item.user
                    }).then(function (response) {
                        message.userData = response.data.user;
                        $scope.items.push(message);
                        if($scope.item.params.shuffle){
                            $scope.shuffle($scope.items);
                        }
                    });
                }
            }
            $scope.loading = false;
        });
    };

    $scope.shuffle = function(a) {
        for (let i = a.length; i; i--) {
            let j = parseInt(Math.random() * i, 10);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    };


    $interval($scope.getMessage, 1000*60*5);
    $scope.getMessage();

    function setShowing(){
        if($scope.showing +1  >= $scope.items.length || $scope.showing === null){
            $scope.showing = 0;
        }else{
            $scope.showing++;
        }

        if($scope.items[$scope.showing]){
            $scope.at = new Date($scope.items[$scope.showing].ts.split('.')[0] * 1000);
        }
    }

    var stop = $interval(setShowing, $scope.item.params.interval);
    setShowing();
});