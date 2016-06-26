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
        var defaultDimensionString = "=valuelist('dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5')";
        var defaultMeasure1 = "pick(match(valuelist('dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5'),'dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5'),35,20,60,15,40)";
        var defaultMeasure2 = "pick(match(valuelist('dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5'),'dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5'),15,10,5,45,60)";
        var defaultMeasure3 = "pick(match(valuelist('dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5'),'dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5'),100,200,300,400,500)";
        var defaultMeasure4 = "pick(match(valuelist('dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5'),'dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5'),250,37,430,220,330)";
        var measureArr = [];
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
        measureArr.push({
            "qDef": {
                "qGrouping": "N",
                "qDef": defaultMeasure1,
                "qLabel": "Measure1",
                "cId": "defaultMes1",
                "props": {
                    "measureType": "column",
                    "measureAxis": "v1",
                    "barWidth": 0.5,
                    "measureColor": "#e1ede9"
                }
            }
        });
        measureArr.push({
            "qDef": {
                "qGrouping": "N",
                "qDef": defaultMeasure2,
                "qLabel": "Measure2",
                "cId": "defaultMes2",
                "props": {
                    "measureType": "column",
                    "measureAxis": "v1",
                    "barWidth": 0.3,
                    "measureColor": "#62cf73"
                }
            }
        });
        measureArr.push({
            "qDef": {
                "qGrouping": "N",
                "qDef": defaultMeasure3,
                "qLabel": "Measure3",
                "cId": "defaultMes3",
                "props": {
                    "measureType": "smoothedLine",
                    "measureAxis": "v2",
                    "lineThickness": 2,
                    "measureColor": "#20acd4"
                }
            }
        });
        measureArr.push({
            "qDef": {
                "qGrouping": "N",
                "qDef": defaultMeasure4,
                "qLabel": "Measure4",
                "cId": "defaultMes4",
                "props": {
                    "measureType": "smoothedLine",
                    "measureAxis": "v2",
                    "lineThickness": 2,
                    "measureColor": "#e1ede9"
                }
            }
        });

        return {
            definition: props,
            initialProperties: {
                qHyperCubeDef: {
                    qDimensions: [defaultDimension],
                    qMeasures: measureArr,
                    qInitialDataFetch: [{
                        qWidth: 5,
                        qHeight: 100
                    }]
                }
            },
            paint: function($element, layout) {
                var hc = layout.qHyperCube;
                var dataProvider = [];
                var measureDefinition = [];
                var data = hc.qDataPages[0].qMatrix;
                console.log(layout);
                data.forEach(function(row, index) {
                    dataProvider.push({
                        "dim1": row[0].qText,
                        "mes1": row[1].qNum,
                        "mes2": row[2].qNum,
                        "mes3": row[3].qNum,
                        "mes4": row[4].qNum
                    });
                });
                hc.qMeasureInfo.forEach(function(measureDef, index) {
                    if (measureDef.props.measureType == "column") {
                        measureDefinition.push({
                            "id": "measure" + index,
                            "valueAxis": measureDef.props.measureAxis,
                            "lineColor": measureDef.props.measureColor,
                            "fillColors": measureDef.props.measureColor,
                            "fillAlphas": 1,
                            "type": measureDef.props.measureType,
                            "title": hc.qMeasureInfo[index].qFallbackTitle,
                            "valueField": "mes" + (index + 1),
                            "clustered": false,
                            "columnWidth": measureDef.props.barWidth,
                            "legendValueText": "[[value]]",
                            "balloonText": "<b>[[title]]</b><br/>[[value]]"
                        });
                    }
                    if (measureDef.props.measureType == "smoothedLine") {
                        measureDefinition.push({
                            "id": "measure" + index,
                            "valueAxis": measureDef.props.measureAxis,
                            "bullet": "round",
                            "bulletBorderAlpha": 1,
                            "bulletColor": "#FFFFFF",
                            "bulletSize": 5,
                            "hideBulletsCount": 50,
                            "lineThickness": measureDef.props.lineThickness,
                            "lineColor": measureDef.props.measureColor,
                            "type": measureDef.props.measureType,
                            "title": hc.qMeasureInfo[index].qFallbackTitle,
                            "useLineColorForBulletBorder": true,
                            "valueField": "mes" + (index + 1),
                            "balloonText": "<b>[[title]]</b><br/>[[value]]"
                        });
                    }
                });
                console.log(measureDefinition);
                var chart = AmCharts.makeChart($element[0], {
                    "type": "serial",
                    "theme": "none",
                    "precision": 2,
                    "valueAxes": [{
                        "id": "v1",
                        "title": hc.qMeasureInfo[0].qFallbackTitle,
                        "position": "left",
                        "autoGridCount": false
                    },
                    {
                        "id": "v2",
                        "title": hc.qMeasureInfo[2].qFallbackTitle,
                        "position": "right",
                        "autoGridCount": false
                    }],
                    "graphs": measureDefinition,
                    "chartCursor": {
                        "pan": true,
                        "valueLineEnabled": true,
                        "valueLineBalloonEnabled": true,
                        "cursorAlpha": 0,
                        "valueLineAlpha": 0.2
                    },
                    "categoryField": "dim1",
                    "categoryAxis": {
                        "parseDates": false,
                        "dashLength": 1,
                        "minorGridEnabled": true
                    },
                    "legend": {
                        "useGraphSettings": true,
                        "position": "top"
                    },
                    "balloon": {
                        "borderThickness": 1,
                        "shadowAlpha": 0
                    },
                    "export": {
                        "enabled": true
                    },
                    "dataProvider": dataProvider
                });
            }
        };
    });
