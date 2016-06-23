requirejs.config({
    paths: {
        "amcharts": "http://www.amcharts.com/lib/3/amcharts",
        "amcharts.serial": "http://www.amcharts.com/lib/3/serial"
    },
    shim: {
        "amcharts.serial": {
            deps: ["amcharts"],
            exports: "AmCharts",
            init: function() {
                AmCharts.isReady = true;
            }
        }
    }
});

define([
    'jquery',
    './properties',
    'amcharts.serial'],
    function($, props) {
        return {
            definition: props,
            initialProperties: {
                qHyperCubeDef: {
                    qDimensions: [],
                    qMeasures: [],
                    qInitialDataFetch: [{
                        qWidth: 4,
                        qHeight: 2500
                    }]
                }
            },
            paint: function($element, layout) {

                var hc = layout.qHyperCube;
                var dataProvider = [];
                var trendLines = [];
                var previous;
                var previousCategory;
                var data = hc.qDataPages[0].qMatrix;
                data.forEach(function(row, index) {
                    var open;
                    var color;
                    var name = row[0].qText;
                    if (index > 0 && index < hc.qSize.qcy -1) {
                        open = previous;
                    } else {
                        open = 0;
                    }
                    var close = open + row[1].qNum;
                    if (index === 0 || index == hc.qSize.qcy-1) {
                        color = "#1c8ceb";
                    } else {
                        if (open > close) {
                            color = "#cc4b48";
                        } else {
                            color = "#54cb6a";
                        }
                    }
                    var labelText = close - open;
                    dataProvider.push({
                        "name": name,
                        "open": open,
                        "close": close,
                        "color": color,
                        "labelText": labelText,
                        "balloonValue": row[2].qText
                    });

                    if(index > 0) {
                        var initValue;
                        var closeValue;
                        if(index == hc.qSize.qcy-1) {
                            initValue = previous;
                            closeValue = close;
                        } else {
                            initValue = previous;
                            closeValue = open;
                        }
                        trendLines.push({
                        "dashLength": 3,
                        "finalCategory": name,
                        "finalValue": closeValue,
                        "initialCategory": previousCategory,
                        "initialValue": initValue,
                        "lineColor": "#888888"
                        });
                    }
                    previous = close;
                    previousCategory = name;
                });
                var chart = AmCharts.makeChart($element[0], {
                    "type": "serial",
                    "theme": "none",
                    "dataProvider": dataProvider,
                    "valueAxes": [{
                        "axisAlpha": 0,
                        "gridAlpha": 0.1,
                        "position": "left"
                    }],
                    "startDuration": 1,
                    "graphs": [{
                        "balloonText": "<span style='color:[[color]]'><b>[[category]]</b></span><br>[[balloonValue]]",
                        "colorField": "color",
                        "fillAlphas": 0.8,
                        "labelText": "[[labelText]]",
                        "lineColor": "#BBBBBB",
                        "openField": "open",
                        "type": "column",
                        "valueField": "close"
                    }],
                    "trendLines": trendLines,
                    "columnWidth": 0.6,
                    "categoryField": "name",
                    "categoryAxis": {
                        "gridPosition": "start",
                        "axisAlpha": 0,
                        "gridAlpha": 0.1
                    },
                    "export": {
                        "enabled": true
                    }
                });
            }
        };
    });
