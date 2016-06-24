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
        label: "Hand Drawn",
        ref: "props.design.handDrawn",
        defaultValue: false
    };
    var titleString = {
        type: "string",
        label: "Title",
        ref: "props.design.titleString",
        defaultValue: "Title Waterfall"
    };
    var titleSize = {
        type: "number",
        label: "Font Size",
        ref: "props.design.titleSize",
        defaultValue: 10
    };
    var titleBold = {
        type: "boolean",
        label: "Bold",
        ref: "props.design.titleBold",
        defaultValue: true
    };
    var title = {
        type: "items",
        label: "Title Settings",
        items: {
            titleString: titleString,
            titleSize: titleSize,
            titleBold: titleBold
        }
    };
    var design = {
        type: "items",
        label: "Design",
        items: {
            handDrawn: handDrawn,
            valueAxis: valueAxis
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
