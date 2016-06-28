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
define([
        'jquery',
        './properties',
        'amcharts.serial'
    ],
    function($, props) {
        var defaultDimensionString = "=valuelist('dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5')";
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
        var cheerUpEmoKid = [
            "#556270",
            "#4ECDC4",
            "#C7F464",
            "#FF6B6B",
            "#C44D58"
        ];
        var defaultMeasure;
        var bullet;
        var lineThickness;
        var columnWidth;
        var valueAxis;
        var amGraphType;
        var fillAlphas;
        var measureArr = [];
        for (i = 0; i < 4; i++) {
            switch (i) {
                case 0:
                    defaultMeasure = "pick(match(valuelist('dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5'),'dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5'),35,20,60,15,40)";
                    bullet = "none";
                    lineThickness = 1;
                    columnWidth = 0.5;
                    valueAxis = "v1";
                    amGraphType = "column";
                    fillAlphas = 1;
                    break;
                case 1:
                    defaultMeasure = "pick(match(valuelist('dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5'),'dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5'),15,10,5,45,60)";
                    bullet = "none";
                    lineThickness = 1;
                    columnWidth = 0.3;
                    valueAxis = "v1";
                    amGraphType = "column";
                    fillAlphas = 1;
                    break;
                case 2:
                    defaultMeasure = "pick(match(valuelist('dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5'),'dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5'),100,200,300,400,500)";
                    bullet = "round";
                    lineThickness = 2;
                    columnWidth = 0;
                    valueAxis = "v2";
                    amGraphType = "smoothedLine";
                    fillAlphas = 0;
                    break;
                case 3:
                    defaultMeasure = "pick(match(valuelist('dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5'),'dim1val1', 'dim1val2', 'dim1val3', 'dim1val4', 'dim1val5'),250,37,430,220,330)";
                    bullet = "square";
                    lineThickness = 2;
                    columnWidth = 0;
                    valueAxis = "v2";
                    amGraphType = "line";
                    fillAlphas = 0;
                    break;
            }
            measureArr.push({
                "qDef": {
                    "qGrouping": "N",
                    "qDef": defaultMeasure,
                    "qLabel": "Measure" + i,
                    "cId": "defaultMes" + i,
                    "amGraph": {
                        "type": amGraphType,
                        "valueAxis": valueAxis,
                        "fillColors": cheerUpEmoKid[i],
                        "fillAlphas": fillAlphas,
                        "fontSize": 12,
                        "columnWidth": columnWidth,
                        "clustered": false,
                        "lineColor": cheerUpEmoKid[i],
                        "lineThickness": lineThickness,
                        "dashLength": 0,
                        "balloonColor": cheerUpEmoKid[i],
                        "balloonText": "<b>[[title]]</b><br/>[[value]]",
                        "bullet": bullet,
                        "bulletAlpha": 1,
                        "bulletColor": cheerUpEmoKid[i],
                        "bulletSize": 5,
                        "labelOffset": 0,
                        "labelPosition": "top",
                        "labelRotation": 0,
                        "labelText": "",
                        "behindColumns": false
                    }
                }
            });
        }
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
                if (design.chartTitle) {
                    chartTitle = [{
                        "text": design.titleString
                    }];
                }
                if (design.showValueAxisTitle) {
                    leftValueAxisTitle = design.leftValueAxisTitle;
                    rightValueAxisTitle = design.rightValueAxisTitle;
                }
                if (design.categoryTitle) {
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
                    measureDefinition.push({
                        "id": measureDef.cId,
                        "valueField": measureDef.cId,
                        "title": hc.qMeasureInfo[index].qFallbackTitle,
                        "bulletBorderAlpha": 1,
                        "hideBulletsCount": 50,
                        "useLineColorForBulletBorder": true,
                        "type": measureDef.amGraph.type,
                        "valueAxis": measureDef.amGraph.valueAxis,
                        "fillColors": measureDef.amGraph.fillColors,
                        "fillAlphas": measureDef.amGraph.fillAlphas,
                        "fontSize": measureDef.amGraph.fontSize,
                        "columnWidth": measureDef.amGraph.columnWidth,
                        "clustered": measureDef.amGraph.clustered,
                        "lineColor": measureDef.amGraph.lineColor,
                        "lineThickness": measureDef.amGraph.lineThickness,
                        "dashLength": measureDef.amGraph.dashLength,
                        "balloonColor": measureDef.amGraph.balloonColor,
                        "balloonText": measureDef.amGraph.balloonText,
                        "bullet": measureDef.amGraph.bullet,
                        "bulletAlpha": measureDef.amGraph.bulletAlpha,
                        "bulletColor": measureDef.amGraph.bulletColor,
                        "bulletSize": measureDef.amGraph.bulletSize,
                        "labelOffset": measureDef.amGraph.labelOffset,
                        "labelPosition": measureDef.amGraph.labelPosition,
                        "labelRotation": measureDef.amGraph.labelRotation,
                        "labelText": measureDef.amGraph.labelText,
                        "behindColumns": measureDef.amGraph.behindColumns
                    });
                });

                var chart = AmCharts.makeChart($element[0], {
                    "type": "serial",
                    "theme": "none",
                    "usePrefixes": design.useNumberPrefixes,
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
                        "shadowAlpha": 0
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
