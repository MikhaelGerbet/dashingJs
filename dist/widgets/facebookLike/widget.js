angular.module('dashingApp.dashboard').
controller('dashingJsFacebookLikeCtrl', function($scope, $interval, $http) {
    $scope.at = new Date();
    let page = $scope.item.params.page;
    if(page === 'harrypotterfilms'){
        $scope.error = 'please replace "harrypotterfilms" by your page name in config file';
    }
    $scope.pageName = $scope.item.params.pageName;
    function getLikes(){
        $http({
            method: 'GET',
            url: 'http://localhost/app/widgets/facebookLike/getLikes.php?page='+encodeURI(page)
        }).then(function successCallback(response) {
            if(response.data.error){
                $scope.error = response.data.error;
            }
            if(response.data.fan_count || null){
                $scope.total = response.data.fan_count;
            }else{
                $scope.total = 0;
            }
        }, function errorCallback(response) {
            $scope.total = 0;
        });
    }
    $interval(getLikes, $scope.item.params.interval);
    getLikes();
});