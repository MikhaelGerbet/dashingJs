'use strict';

angular.module('dashingApp.dashboard').
factory('mockJobValue',function($http){
    return {
        getValue: function(){
            return $http.get('http://localhost/server/valueA.json');
        }
    }
}).
factory('mockJobArea',function($http){
    return {
        getValue: function(){
            return $http.get('http://localhost/server/areaExemple.php');
        }
    }
});