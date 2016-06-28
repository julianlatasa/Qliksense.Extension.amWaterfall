define([], function() {
    'use strict';
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
    var measureArr = [];
    for (i = 0; i < 4; i++) {
        var cheerUpEmoKid = ["#556270", "#4ECDC4", "#C7F464", "#FF6B6B", "#C44D58"];
        var defaultMeasure;
        var bullet;
        var lineThickness;
        var columnWidth;
        var valueAxis;
        var amGraphType;
        var fillAlphas;
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
            default:
                break;
        }
        measureArr.push({
            "qDef": {
                "qGrouping": "N",
                "qDef": defaultMeasure,
                "qLabel": "Measure" + (i + 1),
                "cId": "defaultMes" + (i + 1),
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
    var initialProperties = {
        qHyperCubeDef: {
            qDimensions: [defaultDimension],
            qMeasures: measureArr,
            qInitialDataFetch: [{
                qWidth: 5,
                qHeight: 100
            }]
        }
    };
    return initialProperties;
});
