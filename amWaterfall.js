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
        'amcharts.serial'
    ],
    function($, props) {
        var defaultDimensionString = "=valuelist('start', '1', '2', '3', 'end')";
        var defaultMeasure1 = "pick(match(valuelist('start', '1', '2', '3', 'end'),'start', '1', '2', '3', 'end'),2,-1,-0.5,3,4)";
        var defaultMeasure2 = "pick(match(valuelist('start', '1', '2', '3', 'end'),'start', '1', '2', '3', 'end'),'desc1','desc2','desc3','desc4','desc5')";
        var defaultDimension = {
            qLibraryId: "",
            qNullSuprresion: false,
            qDef: {
                qGrouping: "N",
                qFieldDefs: [defaultDimensionString],
                cId: "defaultDimension",
                qFieldLabels: ["Category Axis Label"]

            }
        };
        var defMeasure1 = {
            "qLibraryId": "",
            "qSortBy": {
                "qSortByState": 0,
                "qSortByFrequency": 0,
                "qSortByNumeric": 0,
                "qSortByAscii": 0,
                "qSortByLoadOrder": 1,
                "qSortByExpression": 0,
                "qExpression": {
                    "qv": ""
                }
            },
            "qDef": {
                "qLabel": "Value Axis Label",
                "qDescription": "",
                "qTags": [
                    "tags"
                ],
                "qGrouping": "N",
                "qDef": defaultMeasure1,
                "cId": "defaultMeasure1"
            }
        };
        var defMeasure2 = {
            "qLibraryId": "",
            "qSortBy": {
                "qSortByState": 0,
                "qSortByFrequency": 0,
                "qSortByNumeric": 0,
                "qSortByAscii": 0,
                "qSortByLoadOrder": 1,
                "qSortByExpression": 0,
                "qExpression": {
                    "qv": ""
                }
            },
            "qDef": {
                "qLabel": "defMeasure2",
                "qDescription": "",
                "qTags": [
                    "tags"
                ],
                "qGrouping": "N",
                "qDef": defaultMeasure2,
                "cId": "defaultMeasure2"
            }
        };

        return {
            definition: props,
            initialProperties: {
                qHyperCubeDef: {
                    qDimensions: [defaultDimension],
                    qMeasures: [defMeasure1, defMeasure2],
                    qInitialDataFetch: [{
                        qWidth: 3,
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
                    if (index > 0 && index < hc.qSize.qcy - 1) {
                        open = previous;
                    } else {
                        open = 0;
                    }
                    var close = open + row[1].qNum;
                    if (index === 0 || index == hc.qSize.qcy - 1) {
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

                    if (index > 0) {
                        var initValue;
                        var closeValue;
                        if (index == hc.qSize.qcy - 1) {
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
                var design = layout.props.design;
                var chartTitle;
                var valueAxisTitle;
                var categoryTitle;
                if(design.chartTitle) {
                    chartTitle = [{
                        "text": design.titleString
                    }];
                }
                if(design.valueAxisTitle) {
                    valueAxisTitle = hc.qMeasureInfo[0].qFallbackTitle;
                }
                if(design.categoryTitle) {
                    categoryTitle = hc.qDimensionInfo[0].qFallbackTitle;
                }
                var chart = AmCharts.makeChart($element[0], {
                    "type": "serial",
                    "theme": "none",
                    "depth3D": design.depth,
                    "angle": design.angle,
                    "fontFamily": design.fontFamily,
                    "fontSize": design.titleSize,
                    "titles": chartTitle,
                    "handDrawn": design.handDrawn,
                    "dataProvider": dataProvider,
                    "valueAxes": [{
                        "axisAlpha": 0,
                        "gridAlpha": 0.1,
                        "position": design.valueAxis,
                        "fontSize": design.fontSizeY,
                        "title": valueAxisTitle
                    }],
                    balloon: {
                        fontSize: design.fontSizeBalloon,
                        fontFamily: design.fontFamily
                    },
                    "startDuration": 1,
                    "graphs": [{
                        "balloonText": "<span style='color:[[color]]'><b>[[category]]</b></span><br>[[balloonValue]]",
                        "colorField": "color",
                        "fillAlphas": 0.8,
                        "labelText": "[[labelText]]",
                        "lineColor": "#BBBBBB",
                        "openField": "open",
                        "type": "column",
                        "valueField": "close",
                        "fontSize": design.fontSizeVal
                    }],
                    "trendLines": trendLines,
                    "columnWidth": 0.6,
                    "categoryField": "name",
                    "categoryAxis": {
                        "gridPosition": "start",
                        "axisAlpha": 0,
                        "gridAlpha": 0.1,
                        "fontSize": design.fontSizeDim,
                        "title": categoryTitle
                    },
                    "export": {
                        "enabled": true
                    }
                });
                if (design.handDrawn) {
                    $element.find("*").css("font-family", "Kristen ITC");
                } else {
                    $element.find("*").css("font-family", design.fontFamily);
                }
            }

        };
    });
