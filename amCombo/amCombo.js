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
// *****************************************************************************
// Color palette for initial colors
// credits: http://www.colourlovers.com/palette/1930/cheer_up_emo_kid
// *****************************************************************************
    var cheerUpEmoKid = [
    "#556270",
    "#4ECDC4",
    "#C7F464",
    "#FF6B6B",
    "#C44D58"
    ];
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
                    "columnAreaAlpha": 1,
                    "measureColor": cheerUpEmoKid[0]
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
                    "columnAreaAlpha": 1,
                    "measureColor": cheerUpEmoKid[1]
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
                    "measureColor": cheerUpEmoKid[2]
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
                    "measureColor": cheerUpEmoKid[3]
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
                var design = layout.props.design;
                var chartTitle;
                var leftValueAxisTitle;
                var rightValueAxisTitle;
                var categoryTitle;
                if(design.chartTitle) {
                    chartTitle = [{
                        "text": design.titleString
                    }];
                }
                if(design.showValueAxisTitle) {
                    leftValueAxisTitle = design.leftValueAxisTitle;
                    rightValueAxisTitle = design.rightValueAxisTitle;
                }
                if(design.categoryTitle) {
                    categoryTitle = hc.qDimensionInfo[0].qFallbackTitle;
                }
                data.forEach(function(row, index) {
                    var dataProviderObj = {};
                    row.forEach(function(cell, index) {
                        var cId;
                        if (index < hc.qDimensionInfo.length) {
                            cId = hc.qDimensionInfo[index].cId;
                        } else {
                            cId = hc.qMeasureInfo[index - hc.qDimensionInfo.length].cId;
                        }
                        if (cell.qNum == 'NaN') {
                            dataProviderObj[cId] = cell.qText;
                        } else {
                            dataProviderObj[cId] = cell.qNum;
                        }
                    });
                    dataProvider.push(dataProviderObj);
                });
                hc.qMeasureInfo.forEach(function(measureDef, index) {
                    if (measureDef.props.measureType == "column") {
                        measureDefinition.push({
                            "id": measureDef.cId,
                            "valueAxis": measureDef.props.measureAxis,
                            "lineColor": measureDef.props.measureColor,
                            "fillColors": measureDef.props.measureColor,
                            "fillAlphas": measureDef.props.columnAreaAlpha,
                            "type": measureDef.props.measureType,
                            "title": hc.qMeasureInfo[index].qFallbackTitle,
                            "valueField": measureDef.cId,
                            "clustered": design.columnClustered,
                            "columnWidth": measureDef.props.barWidth,
                            "fontSize": design.fontSizeVal,
                            "balloonText": "<b>[[title]]</b><br/>[[value]]"
                        });
                    }
                    if (measureDef.props.measureType == "smoothedLine") {
                        measureDefinition.push({
                            "id": measureDef.cId,
                            "valueAxis": measureDef.props.measureAxis,
                            "bullet": "round",
                            "bulletBorderAlpha": 1,
                            "bulletColor": "#FFFFFF",
                            "bulletSize": 5,
                            "hideBulletsCount": 50,
                            "lineThickness": measureDef.props.lineThickness,
                            "lineColor": measureDef.props.measureColor,
                            "fillColor": measureDef.props.measureColor,
                            "fillAlphas": measureDef.props.lineAreaAlpha,
                            "type": measureDef.props.measureType,
                            "title": hc.qMeasureInfo[index].qFallbackTitle,
                            "useLineColorForBulletBorder": true,
                            "valueField": measureDef.cId,
                            "fontSize": design.fontSizeVal,
                            "balloonText": "<b>[[title]]</b><br/>[[value]]"
                        });
                    }
                    if (measureDef.props.measureType == "Line") {
                        measureDefinition.push({
                            "id": measureDef.cId,
                            "valueAxis": measureDef.props.measureAxis,
                            "bullet": "round",
                            "bulletBorderAlpha": 1,
                            "bulletColor": "#FFFFFF",
                            "bulletSize": 5,
                            "hideBulletsCount": 50,
                            "lineThickness": measureDef.props.lineThickness,
                            "lineColor": measureDef.props.measureColor,
                            "fillColor": measureDef.props.measureColor,
                            "fillAlphas": measureDef.props.lineAreaAlpha,
                            "title": hc.qMeasureInfo[index].qFallbackTitle,
                            "useLineColorForBulletBorder": true,
                            "valueField": measureDef.cId,
                            "fontSize": design.fontSizeVal,
                            "balloonText": "<b>[[title]]</b><br/>[[value]]"
                        });
                    }
                });
                var chart = AmCharts.makeChart($element[0], {
                    "type": "serial",
                    "theme": "none",
                    "depth3D": design.depth,
                    "angle": design.angle,
                    "rotate": design.rotateGraph,
                    "fontFamily": design.fontFamily,
                    "fontSize": design.titleSize,
                    "titles": chartTitle,
                    "handDrawn": design.handDrawn,
                    "precision": 2,
                    "valueAxes": [{
                        "id": "v1",
                        "position": "left",
                        "stackType": design.leftAxisStackType,
                        "autoGridCount": false,
                        "fontSize": design.fontSizeY,
                        "title": leftValueAxisTitle
                    }, {
                        "id": "v2",
                        "position": "right",
                        "stackType": design.rightAxisStackType,
                        "autoGridCount": false,
                        "fontSize": design.fontSizeY,
                        "title": rightValueAxisTitle
                    }],
                    "graphs": measureDefinition,
                    "chartCursor": {
                        "pan": true,
                        "valueLineEnabled": true,
                        "valueLineBalloonEnabled": true,
                        "cursorAlpha": 0,
                        "valueLineAlpha": 0.2
                    },
                    "categoryField": hc.qDimensionInfo[0].cId,
                    "categoryAxis": {
                        "parseDates": false,
                        "dashLength": 1,
                        "minorGridEnabled": true,
                        "labelRotation": design.rotateDim,
                        "fontSize": design.fontSizeDim,
                        "title": categoryTitle
                    },
                    "legend": {
                        "enabled": design.showLegends,
                        "useGraphSettings": true,
                        "position": design.legendPosition
                    },
                    "balloon": {
                        "borderThickness": 1,
                        "shadowAlpha": 0,
                        fontSize: design.fontSizeBalloon,
                        fontFamily: design.fontFamily
                    },
                    "export": {
                        "enabled": true
                    },
                    "dataProvider": dataProvider
                });
                if (design.handDrawn) {
                    $element.find("*").css("font-family", "Kristen ITC");
                } else {
                    $element.find("*").css("font-family", design.fontFamily);
                }
            }
        };
    });
