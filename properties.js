define([], function() {
    'use strict';

    // *****************************************************************************
    // Dimensions & Measures & Sorting
    // *****************************************************************************
    var dimensions = {
        uses: "dimensions",
        min: 1,
        max: 1
    };

    var measures = {
        uses: "measures",
        min: 2,
        max: 2
    };

    var sorting = {
        uses: "sorting"
    };
    // *****************************************************************************
    // Appearance Section
    // *****************************************************************************
    // Text box definition

    var fontFamily = {
        ref: "props.design.fontFamily",
        label: "Font Family",
        type: "string",
        defaultValue: "Verdana"
    };
    var fontSizeDim = {
        ref: "props.design.fontSizeDim",
        label: "Font Size Dimension",
        type: "number",
        defaultValue: "12"
    };
    var fontSizeY = {
        ref: "props.design.fontSizeY",
        label: "Font Size Y-axis",
        type: "number",
        defaultValue: "12"
    };
    var fontSizeVal = {
        ref: "props.design.fontSizeVal",
        label: "Font Size Labels",
        type: "number",
        defaultValue: "12"
    };
    var fontSizeBalloon = {
        ref: "props.design.fontSizeBalloon",
        label: "Font Size Balloons",
        type: "number",
        defaultValue: "10"
    };
    var valueAxis = {
        type: "string",
        component: "dropdown",
        label: "Value Axis",
        ref: "props.design.valueAxis",
        options: [{
            value: "left",
            label: "left"
        }, {
            value: "right",
            label: "right"
        }],
        defaultValue: "left"
    };
    var font = {
        type: "items",
        label: "Font styling",
        items: {
            fontFamily: fontFamily,
            fontSizeDim: fontSizeDim,
            fontSizeY: fontSizeY,
            fontSizeVal: fontSizeVal,
            fontSizeBalloon: fontSizeBalloon
        }
    };
    var handDrawn = {
        type: "boolean",
        component: "switch",
        label: "Hand Drawn",
        ref: "props.design.handDrawn",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: false
    };
    var titleString = {
        type: "string",
        label: "Title",
        ref: "props.design.titleString",
        defaultValue: "Title Waterfall"
    };
    var categoryTitle = {
        type: "boolean",
        component: "switch",
        label: "Category Title",
        ref: "props.design.categoryTitle",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: true
    };
    var chartTitle = {
        type: "boolean",
        component: "switch",
        label: "Chart Title",
        ref: "props.design.chartTitle",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: true
    };
    var valueAxisTitle = {
        type: "boolean",
        component: "switch",
        label: "Value Axis Title",
        ref: "props.design.valueAxisTitle",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: true
    };
    var titleSize = {
        type: "number",
        label: "Font Size",
        ref: "props.design.titleSize",
        defaultValue: 10
    };
    var title = {
        type: "items",
        label: "Title Settings",
        items: {
            titleString: titleString,
            titleSize: titleSize,
            chartTitle: chartTitle,
            valueAxisTitle: valueAxisTitle,
            categoryTitle: categoryTitle
        }
    };
    var depth = {
        type: "number",
        component: "slider",
        label: "Depth",
        ref: "props.design.depth",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 0
    };
    var angle = {
        type: "number",
        component: "slider",
        label: "Angle",
        ref: "props.design.angle",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 0
    };
    var rotateDim = {
        type: "number",
        component: "slider",
        label: "Rotate Dimension Labels",
        ref: "props.design.rotateDim",
        min: 0,
        max: 90,
        step: 45,
        defaultValue: 0
    };
    var rotateVal = {
        type: "number",
        component: "slider",
        label: "Rotate Value Labels",
        ref: "props.design.rotateVal",
        min: 0,
        max: 90,
        step: 45,
        defaultValue: 0
    };
    var rotateGraph = {
        type: "boolean",
        component: "switch",
        label: "rotateGraph",
        ref: "props.design.rotateGraph",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: true
    };
    var design = {
        type: "items",
        label: "Design",
        items: {
            handDrawn: handDrawn,
            valueAxis: valueAxis,
            depth: depth,
            angle: angle,
            rotateGraph: rotateGraph,
            rotateDim: rotateDim,
            rotateVal: rotateVal
        }
    };

    var appearanceSection = {
        component: "expandable-items",
        label: "Layout Settings",
        items: {
            title: title,
            font: font,
            design: design

        }
    };

    // *****************************************************************************
    // Main property panel definition
    // ~~
    // Only what's defined here will be returned from properties.js
    // *****************************************************************************

    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: dimensions,
            measures: measures,
            sorting: sorting,
            appearance: appearanceSection

        }
    };
});
