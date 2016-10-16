'use strict';
angular.module('dashingApp.dashboard').
controller('dashingJsDonutCtrl', function($scope, $http, $interval, $element) {
    $scope.value = $scope.item.params.value;
    $scope.max = $scope.item.params.max;
    $scope.legend = $scope.item.params.legend;
    $scope.updatedAt = new Date();

    $($element).find('.donut').highcharts({
        credits: {
            enabled: false
        },
        chart: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderWidth: 0,
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            margin: [0, 0, 0, 0],
            spacingTop: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0,
            width: 300
        },
        title: {
            text: '',
            align: 'center',
            verticalAlign: 'middle',
            y: 40,
            style: {'display' : 'none'}
        },
        legend: {
            style: {'fontSize' : 25, 'color' : '#ffffff'}
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    distance: -70,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -130,
                endAngle: 130,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: '',
            innerSize: '60%',
            data: [
                ['',   30],
                ['',   70]
            ]
        }]
    });
});