requirejs.config({
    paths: {
        "amcharts": "/extensions/amCombo/library/amcharts",
        "amcharts.serial": "/extensions/amCombo/library/serial",
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
        'qlik',
        'jquery',
        './properties',
        'amcharts.serial'
    ],
    function(qlik, $, props) {
        return {
            definition: props,
            initialProperties: {
                qHyperCubeDef: {
                    qDimensions: [],
                    qMeasures: [],
                    qInitialDataFetch: [{
                        qWidth: 5,
                        qHeight: 100
                    }]
                }
            },
            paint: function($element, layout) {
                var hc = layout.qHyperCube;
                var dataProvider = [];
                var trendLines = [];
                var amGraphs = [];

                hc.qDataPages.forEach(function(page, index) {
                    page.qMatrix.forEach(function(row, rindex) {
                        var dataProviderObj = {};
                        var trendLinesObj = {};
                        row.forEach(function(cell, index) {
                            var cId;
                            if (index < hc.qDimensionInfo.length) {
                                cId = hc.qDimensionInfo[index].cId;
                                dataProviderObj.dimText = cell.qText;
                            } else {
                                cId = hc.qMeasureInfo[index - hc.qDimensionInfo.length].cId;

                                if (rindex > 0 && rindex < hc.qSize.qcy - 1 && hc.qMeasureInfo[index - hc.qDimensionInfo.length].amGraph.type == 'Waterfall' && rindex > 0) {
                                    dataProviderObj["open" + cId] = dataProvider[rindex - 1]["close" + cId];
                                    if (dataProviderObj["open" + cId] + cell.qNum > dataProvider[rindex - 1]["close" + cId]) {
                                        dataProviderObj["color" + cId] = "#54cb6a";
                                    } else {
                                        dataProviderObj["color" + cId] = "#cc4b48";
                                    }
                                } else {
                                    dataProviderObj["open" + cId] = 0;
                                    dataProviderObj["color" + cId] = "#1c8ceb";
                                }

                                if (hc.qMeasureInfo[index - hc.qDimensionInfo.length].amGraph.type == 'Waterfall' && rindex > 0) {
                                    trendLinesObj.dashLength = 3;
                                    trendLinesObj.finalCategory = dataProviderObj.dimText;
                                    trendLinesObj.initialCategory = dataProvider[rindex - 1].dimText;
                                    trendLinesObj.initialValue = dataProvider[rindex - 1]["close" + hc.qMeasureInfo[index - hc.qDimensionInfo.length].cId];
                                    trendLinesObj.lineColor = "#888888";
                                    if (rindex < hc.qSize.qcy - 1) {
                                        trendLinesObj.finalValue = dataProviderObj["open" + cId];
                                    } else {
                                        trendLinesObj.finalValue = dataProviderObj["open" + cId] + cell.qNum;
                                    }
                                    trendLines.push(trendLinesObj);
                                }
                                dataProviderObj["close" + cId] = dataProviderObj["open" + cId] + cell.qNum;
                            }
                            if (cell.qNum == 'NaN') {
                                dataProviderObj[cId] = cell.qText;
                            } else {
                                dataProviderObj[cId] = cell.qNum;
                            }

                        });
                        dataProvider.push(dataProviderObj);
                    });
                });
                hc.qMeasureInfo.forEach(function(measureDef, index) {
                    var amGraph = {};
                    if (measureDef.amGraph.type == 'Waterfall') {
                        amGraph.type = 'column';
                        amGraph.colorField = 'color' + measureDef.cId;
                        amGraph.lineColor = '#BBBBBB';
                    } else {
                        amGraph.type = measureDef.amGraph.type;
                        amGraph.fillColors = measureDef.amGraph.fillColors;
                        amGraph.lineColor = measureDef.amGraph.lineColor;
                    }
                    amGraph.id = measureDef.cId;
                    amGraph.openField = "open" + measureDef.cId;
                    amGraph.valueField = "close" + measureDef.cId;
                    amGraph.title = hc.qMeasureInfo[index].qFallbackTitle;
                    amGraph.labelText = measureDef.amGraph.labelText;
                    amGraph.bulletBorderAlpha = 1;
                    amGraph.hideBulletsCount = 50;
                    amGraph.useLineColorForBulletBorder = true;
                    amGraph.valueAxis = measureDef.amGraph.valueAxis;
                    amGraph.fillAlphas = measureDef.amGraph.fillAlphas;
                    amGraph.fontSize = measureDef.amGraph.fontSize;
                    amGraph.columnWidth = measureDef.amGraph.columnWidth;
                    amGraph.clustered = measureDef.amGraph.clustered;
                    amGraph.lineThickness = measureDef.amGraph.lineThickness;
                    amGraph.dashLength = measureDef.amGraph.dashLength;
                    amGraph.balloonText = measureDef.amGraph.balloonText;
                    amGraph.bullet = measureDef.amGraph.bullet;
                    amGraph.bulletAlpha = measureDef.amGraph.bulletAlpha;
                    amGraph.bulletColor = measureDef.amGraph.bulletColor;
                    amGraph.bulletSize = measureDef.amGraph.bulletSize;
                    amGraph.labelOffset = measureDef.amGraph.labelOffset;
                    amGraph.labelPosition = measureDef.amGraph.labelPosition;
                    amGraph.labelRotation = measureDef.amGraph.labelRotation;
                    amGraph.behindColumns = measureDef.amGraph.behindColumns;
                    amGraphs.push(amGraph);
                });

                var chart = AmCharts.makeChart($element[0], {
                    "type": "serial",
                    "theme": "none",
                    "usePrefixes": layout.amChart.usePrefixes,
                    "depth3D": layout.amChart.depth3D,
                    "angle": layout.amChart.angle,
                    "fontFamily": layout.amChart.fontFamily,
                    "fontSize": layout.amChart.fontSize,
                    "handDrawn": layout.amChart.handDrawn,
                    "precision": 2,
                    "titles": [{
                        text: layout.amChart.titles.text,
                        alpha: layout.amChart.titles.alpha,
                        bold: layout.amChart.titles.bold,
                        color: layout.amChart.titles.color,
                        size: layout.amChart.titles.size
                    }],
                    "numberFormatter": {
                        precision: layout.amChart.numberFormatter.precision,
                        decimalSeparator: layout.amChart.numberFormatter.decimalSeparator,
                        thousandsSeparator: layout.amChart.numberFormatter.thousandsSeparator
                    },
                    "valueAxes": [{
                        "id": "v1",
                        "position": "left",
                        "autoGridCount": false,
                        "stackType": layout.amChart.valueAxis.leftStackType,
                        "fontSize": layout.amChart.valueAxis.fontSize,
                        "title": layout.amChart.valueAxis.leftTitle,
                        "precision": layout.amChart.numberFormatter.precision
                    }, {
                        "id": "v2",
                        "position": "right",
                        "autoGridCount": false,
                        "stackType": layout.amChart.valueAxis.rightStackType,
                        "fontSize": layout.amChart.valueAxis.fontSize,
                        "title": layout.amChart.valueAxis.rightTitle,
                        "precision": layout.amChart.numberFormatter.precision
                    }],
                    "graphs": amGraphs,
                    "trendLines": trendLines,
                    "chartCursor": {
                        "pan": false,
                        "valueLineEnabled": true,
                        "valueLineBalloonEnabled": true,
                        "cursorAlpha": 0,
                        "valueLineAlpha": 0.2
                    },
                    "categoryField": "dimText",
                    "categoryAxis": {
                        "parseDates": false,
                        "dashLength": 1,
                        "minorGridEnabled": true,
                        "labelRotation": layout.amChart.categoryAxis.labelRotation,
                        "fontSize": layout.amChart.categoryAxis.fontSize,
                        "title": layout.amChart.categoryAxis.title
                    },
                    "legend": {
                        "equalWidths": false,
                        "useGraphSettings": true,
                        "enabled": layout.amChart.legend.enabled,
                        "position": layout.amChart.legend.position
                    },
                    "export": {
                        "enabled": true
                    },
                    "dataProvider": dataProvider
                });
                if (layout.amChart.handDrawn) {
                    $element.find("*").css("font-family", "Kristen ITC");
                } else {
                    $element.find("*").css("font-family", layout.amChart.fontFamily);
                }

                /* tak Simon :o */
                chart.addListener("clickGraphItem", handleClickGraphItem);

                function handleClickGraphItem(event) {
                    qlik.currApp().field(layout.qHyperCube.qDimensionInfo[0].qGroupFieldDefs[0]).selectValues([event.item.category], true, false);
                }
            }

        };

    });
