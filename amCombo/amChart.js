define([
    './amChartTitles',
    './amChartValueAxis',
    './amChartCategoryAxis',
    './amChartLegend'
], function(amChartTitles, amChartValueAxis, amChartCategoryAxis, amChartLegend) {
    'use strict';
    var showBalloon = {
        type: "boolean",
        component: "switch",
        label: "Show balloons",
        ref: "amChart.balloon.enabled",
        options: [{
            value: true,
            label: "On"
        },
        {
            value: false,
            label: "Off"
        }],
        defaultValue: true
    };

    var depth3D = {
        type: "number",
        component: "slider",
        label: "Depth",
        ref: "amChart.depth3D",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 0
    };

    var angle = {
        type: "number",
        component: "slider",
        label: "Angle",
        ref: "amChart.angle",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 0
    };

    var fontFamily = {
        ref: "amChart.fontFamily",
        label: "Font Family",
        type: "string",
        defaultValue: "Verdana"
    };

    var fontSize = {
        ref: "amChart.fontSize",
        label: "Font Size",
        type: "number",
        defaultValue: 12
    };
    var handDrawn = {
        type: "boolean",
        component: "switch",
        label: "Hand Drawn",
        ref: "amChart.handDrawn",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: false
    };
    var standardSettings = {
        type: "items",
        label: "amChart settings",
        items: {
            fontFamily: fontFamily,
            fontSize: fontSize,
            showBalloon: showBalloon,
            handDrawn: handDrawn,
            depth3D: depth3D,
            angle: angle
        }
    };

    return {
        component: "expandable-items",
        label: "amChart",
        items: {
            standardSettings: standardSettings,
            titles: amChartTitles,
            valueAxis: amChartValueAxis,
            categoryAxis: amChartCategoryAxis,
            legend: amChartLegend
        }
    };
});
