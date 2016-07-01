define([
    './amChartTitles',
    './amChartValueAxis',
    './amChartCategoryAxis',
    './amChartLegend'
], function(amChartTitles, amChartValueAxis, amChartCategoryAxis, amChartLegend) {
    'use strict';
    var usePrefixes = {
        type: "boolean",
        component: "switch",
        label: "Use number prefixes for large numbers",
        ref: "amChart.usePrefixes",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: true
    };

    var precision = {
        type: "number",
        label: "Number of decimals in values",
        ref: "amChart.numberFormatter.precision",
        defaultValue: 2
    };

    var decimalSeparator = {
        type: "string",
        component: "dropdown",
        label: "Character used for decimal separation",
        ref: "amChart.numberFormatter.decimalSeparator",
        options: [{
            value: ".",
            label: "."
        }, {
            value: ",",
            label: ","
        }],
        defaultValue: "."
    };

    var thousandsSeparator = {
        type: "string",
        component: "dropdown",
        label: "Character used for thousands separation",
        ref: "amChart.numberFormatter.thousandsSeparator",
        options: [{
            value: ".",
            label: "."
        }, {
            value: ",",
            label: ","
        }],
        defaultValue: ","
    };

    var numberFormatter = {
        type: "items",
        label: "amChart.numberFormatter",
        items: {
            usePrefixes: usePrefixes,
            precision: precision,
            decimalSeparator: decimalSeparator,
            thousandsSeparator: thousandsSeparator
        }
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
            numberFormatter: numberFormatter,
            titles: amChartTitles,
            valueAxis: amChartValueAxis,
            categoryAxis: amChartCategoryAxis,
            legend: amChartLegend
        }
    };
});
