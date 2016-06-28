requirejs.config({
    paths: {
        "amcharts": "http://www.amcharts.com/lib/3/amcharts",
        "amcharts.serial": "http://www.amcharts.com/lib/3/serial",
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
        './initialProperties',
        'amcharts.serial'
    ],
    function($, props, initProps) {
        return {
            definition: props,
            initialProperties: initProps,
            paint: function($element, layout) {
                var hc = layout.qHyperCube;
                var dataProvider = [];
                var amGraphs = [];
                hc.qDataPages[0].qMatrix.forEach(function(row, index) {
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
                    amGraphs.push({
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
                    "valueAxes": [{
                        "id": "v1",
                        "position": "left",
                        "stackType": layout.amChart.valueAxis.leftStackType,
                        "autoGridCount": false,
                        "fontSize": layout.amChart.valueAxis.fontSize,
                        "title": layout.amChart.valueAxis.leftTitle
                    }, {
                        "id": "v2",
                        "position": "right",
                        "stackType": layout.amChart.valueAxis.rightStackType,
                        "autoGridCount": false,
                        "fontSize": layout.amChart.valueAxis.fontSize,
                        "title": layout.amChart.valueAxis.rightTitle
                    }],
                    "graphs": amGraphs,
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
                        "labelRotation": layout.amChart.categoryAxis.labelRotation,
                        "fontSize": layout.amChart.categoryAxis.fontSize,
                        "title": layout.amChart.categoryAxis.title
                    },
                    "legend": {
                        "enabled": layout.amChart.legend.enabled,
                        "useGraphSettings": true,
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
            }
        };
    });
