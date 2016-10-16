angular.module('dashingApp.dashboard').
controller('dashingJsUpSitesCtrl', function($scope, $interval, $http) {
    $scope.sites = $scope.item.params.sites;
    for(let i in $scope.sites){
        $scope.sites[i].result = 'pending';
    }
    function testSites(){
        $scope.at = new Date();
        $scope.sitesFail = 0;

        for(let i in $scope.sites){
            getStatus($scope.sites[i].url,i);
        }
    }
    function getStatus(url,i){
        $scope.sites[i].result = 'pending';
        //$scope.sites[i].url

        $http({
            method: 'GET',
            url: 'http://localhost/app/widgets/upSites/getStatusPage.php?url='+encodeURI(url)
        }).then(function successCallback(response) {
            if(response.status === 200 || null){
                $scope.sites[i].result = 1;
            }else{
                $scope.sitesFail++;
                $scope.sites[i].result = 0;
            }
        }, function errorCallback(response) {
            $scope.sites[i].result = 0;
            $scope.sitesFail++;
        });
    }
    $interval(testSites, $scope.item.params.interval);
    testSites();
});