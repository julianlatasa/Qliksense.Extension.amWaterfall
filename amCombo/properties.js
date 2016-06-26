define([], function() {
    'use strict';
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
    // *****************************************************************************
    // Dimensions & Measures & Sorting
    // *****************************************************************************
    var dimensions = {
        uses: "dimensions",
        min: 1,
        max: 1
    };

    var measureType = {
        type: "string",
        component: "dropdown",
        label: "Type",
        ref: "qDef.props.measureType",
        options: [{
            value: "column",
            label: "Bar"
        }, {
            value: "Line",
            label: "Line"
        }, {
            value: "smoothedLine",
            label: "Smoothed Line"
        }]
    };
    var measureAxis = {
        type: "string",
        component: "dropdown",
        label: "Axis",
        ref: "qDef.props.measureAxis",
        options: [{
            value: "v1",
            label: "left"
        }, {
            value: "v2",
            label: "right"
        }],
        deaultValue: "v1"
    };
    var measureColor = {
        type: "string",
        label: "Color",
        ref: "qDef.props.measureColor" /* cheerUpEmoKid[measureIndex] */
    };

    var lineThickness = {
        type: "number",
        component: "slider",
        label: "Line Thickness",
        ref: "qDef.props.lineThickness",
        min: 0.5,
        max: 10,
        step: 0.5,
        defaultValue: 2
    };

    var measureLine = {
        type: "items",
        items: {
            lineThickness: lineThickness
        },
        show: function(m) {
            if(m.qDef.props.measureType == "smoothedLine" || m.qDef.props.measureType == "Line") {
                return true;
            } else {
                return false;
            }
        }
    };

    var columnWidth = {
        type: "number",
        component: "slider",
        label: "Bar Width",
        ref: "qDef.props.barWidth",
        min: 0.1,
        max: 1,
        step: 0.1,
        defaultValue: 0.5
    };
    var measureColumn = {
        type: "items",
        items: {
            columnWidth: columnWidth
        },
        show: function(m) {
            if(m.qDef.props.measureType == "column") {
                return true;
            } else {
                return false;
            }
        }
    };

    var measureTypeSettings = {
        type: "items",
        items: {
            measureLine: measureLine,
            measureColumn: measureColumn
        }
    };

    var commonSettings = {
        type: "items",
        items: {
            measureColor: measureColor,
            measureAxis: measureAxis,
            measureType: measureType
        }
    };

    var measures = {
        uses: "measures",
        min: 1,
        items: {
            commonSettings: commonSettings,
            measureTypeSettings: measureTypeSettings
        }
    };

    var sorting = {
        uses: "sorting"
    };
    // *****************************************************************************
    // Appearance Section
    // *****************************************************************************

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
    var columnClustered = {
        type: "boolean",
        component: "switch",
        label: "Clustered",
        ref: "props.design.columnClustered",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: false
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
        defaultValue: "Wombo Combo Chart"
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
    var showLegends = {
        type: "boolean",
        component: "switch",
        label: "Show Legends",
        ref: "props.design.showLegends",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: true
    };
        var legendPosition = {
        type: "string",
        component: "dropdown",
        label: "Legend position",
        ref: "props.design.legendPosition",
        options: [{
            value: "top",
            label: "Top"
        }, {
            value: "bottom",
            label: "Bottom"
        },
        {
            value: "left",
            label: "Left"
        },
        {
            value: "right",
            label: "Right"
        }],
        defaultValue: "top",

    };

    var conLegendPosition = {
        type: "items",
        items: {
            legendPosition: legendPosition
        },
        show: function(d) {
            return d.props.design.showLegends;
        }
    };
    var showValueAxisTitle = {
        type: "boolean",
        component: "switch",
        label: "Value Axis Title",
        ref: "props.design.showValueAxisTitle",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: true
    };
    var leftValueAxisTitle = {
        type: "string",
        label: "Left Value Axis Title",
        ref: "props.design.leftValueAxisTitle",
        defaultValue: "Left Value Axis"
    };
    var rightValueAxisTitle = {
        type: "string",
        label: "Right Value Axis Title",
        ref: "props.design.rightValueAxisTitle",
        defaultValue: "Right Value Axis"
    };
    var conValueAxisTitle =  {
        type: "items",
        items: {
            valueAxisTitle: leftValueAxisTitle,
            valueAxisTitle2: rightValueAxisTitle
        },
        show: function(d) {
           return d.props.design.showValueAxisTitle;
        }
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
            showValueAxisTitle: showValueAxisTitle,
            conValueAxisTitle: conValueAxisTitle,
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

    var design = {
        type: "items",
        label: "Design",
        items: {
            showLegends: showLegends,
            conLegendPosition: conLegendPosition,
            columnClustered: columnClustered,
            rotateDim: rotateDim,
            handDrawn: handDrawn,
            depth: depth,
            angle: angle
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
