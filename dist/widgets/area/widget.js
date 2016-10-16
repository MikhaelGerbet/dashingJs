'use strict';

angular.module('dashingApp.dashboard').
controller('dashingJsAreaCtrl', function($scope, $interval, $element, $injector) {
    $scope.title = $scope.item.params.title;
    let job = $injector.get($scope.item.params.job),
        nbsPoints = $scope.item.params.nbsPoints;

    $(function () {
        $(document).ready(function () {
            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });

            Highcharts.chart($($element).find('.highcharts-container')[0], {
                credits: {
                    enabled: false
                },
                chart: {
                    type: 'area',
                    animation: Highcharts.svg, // don't animate in old IE
                    marginRight: -2,
                    marginTop: 0,
                    marginLeft: 40,
                    marginBottom: 0,
                    spacingLeft: 10,
                    backgroundColor:null,
                    events: {
                        load: function () {

                            // set up the updating of the chart each second
                            var series = this.series[0];
                            setInterval(function () {

                                job.getValue().success(function(response){
                                    $scope.at = new Date();
                                    series.addPoint([(new Date()).getTime(), response.value], true, true);
                                });

                            }, $scope.item.params.interval);
                        }
                    }
                },
                title: {
                    text: null
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150,
                    lineWidth: 0,
                    minorGridLineWidth: 0,
                    lineColor: 'transparent',

                    labels: {
                        enabled: false
                    },
                    minorTickLength: 0,
                    tickLength: 0
                },
                yAxis: {
                    labels: {
                        enabled: true,
                        style: {
                            color: 'white'
                        },
                        formatter: function() {
                            return this.value > 5000 ? this.value / 1000 +'k' : this.value;
                        }
                    },
                    title: {
                        text: null
                    },
                    gridLineColor: 'transparent',
                    plotLines: [{
                        value: 0,
                        width: 0,
                        color: '#808080'
                    }]
                },
                tooltip: false,
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                plotOptions: {

                    series: {
                        fillColor: {
                            linearGradient: [0, 0, 0, 300],
                            stops: [
                                [0, Highcharts.Color('#ffffff').setOpacity(0.3).get('rgba')],
                                [1, Highcharts.Color('#ffffff').setOpacity(0.05).get('rgba')]
                            ]
                        }
                    },
                    line: {
                        marker: {
                            enabled: false
                        },
                        lineWidth: 1,
                        linecap: 'round'
                    },
                    area: {
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: false
                                }
                            }
                        }
                    }
                },
                series: [{
                    color: Highcharts.Color('#ffffff').setOpacity(0.3).get('rgba'),
                    //color: 'transparent',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;


                        for (i = 1 - nbsPoints; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: 0
                            });
                        }
                        return data;
                    }())
                }]
            });
        });
    });
});