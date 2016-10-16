'use strict';

angular.module('dashingApp.dashboard').
controller('dashingJsTeamMoodCtrl', function($scope, $http, $interval, $element) {

    $scope.title = '&nbsp;';
    $scope.loading = true;
    $scope.dependentiesLoading = true;
    $scope.token = $scope.item.params.token;
    $scope.moods = [];
    $scope.tags = [];
    $scope.showing = null;
    $scope.showingMessage = null;
    var moods = [];

    if($scope.item.params.token === 'demo-fr'){
        $scope.error = 'please replace "demo-fr" by your TeamMood token in your config file';
    }

    $scope.getMoods = function(){
        $http({
            method: 'GET',
            url: 'http://localhost/app/widgets/teamMood/teamMood.php?url=http://app.teammood.com/api/'+$scope.token+'/moods?since=30'
        }).then(function(response){
            let data = response.data.days[0] || null;
            $scope.tags = [];
            moods = [];
            if(!data || !data.values.length) return;
            $scope.at = new Date(data.nativeDate);
            for(var i in data.values){
                var item = data.values[i];
                moods.push(item);
                for(var ii in item.tags) {
                    var tag = item.tags[ii] || null;
                    if (tag && $scope.tags.indexOf(tag) === -1) {
                        $scope.tags.push(tag);
                    }
                }
            }
            $scope.loading = false;
            setShowingTeamMood();
            setShowingCommentTeamMood();
        });
    };
    $interval($scope.getMoods, 1000*60*5);

    $scope.getMoods();

    function setShowingTeamMood(){
        $scope.moods = {};

        $scope.comments = [];
        $scope.showingComment = 0;


        if($scope.showing +1  >= $scope.tags.length || $scope.showing === null){
            $scope.showing = 0;
        }else{
            $scope.showing++;
        }

        let tag = $scope.tags[$scope.showing];
        $scope.title = tag;

        let teamTotalNotation = 0;
        let nbOfMoods = 0;

        for(let i in moods){
            if(moods[i].tags.indexOf(tag) !== -1){
                if(!$scope.moods[moods[i].mood]){
                    $scope.moods[moods[i].mood] = [];
                }
                nbOfMoods++;

                $scope.moods[moods[i].mood].push(moods[i]);

                if(moods[i].mood === 'sad'){
                    teamTotalNotation += 1;
                }
                else if(moods[i].mood === 'hard'){
                    teamTotalNotation += 2;
                }
                else if(moods[i].mood === 'average'){
                    teamTotalNotation += 3;
                }
                else if(moods[i].mood === 'good'){
                    teamTotalNotation += 4;
                }
                else if(moods[i].mood === 'excellent'){
                    teamTotalNotation += 5;
                }

                if(moods[i].comment){
                    $scope.comments.push(moods[i])
                }
            }
        }

        $scope.teamAverageNotation = teamTotalNotation / nbOfMoods;

        let tendance = 'sad';
        if($scope.teamAverageNotation < 2.5){
            tendance = 'hard';
        }
        else if($scope.teamAverageNotation < 3.5){
            tendance = 'average';
        }
        else if($scope.teamAverageNotation < 4.5){
            tendance = 'good';
        }
        else if($scope.teamAverageNotation < 5.5){
            tendance = 'excellent';
        }

        $($element).removeClass('sad').removeClass('hard').removeClass('average').removeClass('good').removeClass('excellent');
        $($element).addClass(tendance);
    }

    $interval(setShowingTeamMood, 1000 * 20);

    function setShowingCommentTeamMood(){

        if($scope.comments.length < 2){
            $scope.showingComment = 0;
            return;
        }

        if($scope.showingComment +1  >= $scope.comments.length || $scope.showingComment === null){
            $scope.showingComment = 0;
        }else{
            $scope.showingComment++;
        }
    }

    $interval(setShowingCommentTeamMood, 1000 * 5);
});