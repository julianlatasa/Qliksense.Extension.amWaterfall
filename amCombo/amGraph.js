define([], function() {
    'use strict';
    // *****************************************************************************
    // Standard Settings > Various
    // *****************************************************************************
    var amGraphType = {
        type: "string",
        component: "dropdown",
        label: "Type",
        ref: "qDef.amGraph.type",
        options: [{
            value: "column",
            label: "Bar"
        }, {
            value: "line",
            label: "Line"
        }, {
            value: "smoothedLine",
            label: "Smoothed Line"
        }]
    };

    var valueAxis = {
        type: "string",
        component: "dropdown",
        label: "Axis",
        ref: "qDef.amGraph.valueAxis",
        options: [{
            value: "v1",
            label: "left"
        }, {
            value: "v2",
            label: "right"
        }],
        deaultValue: "v1"
    };
    var fillColors = {
        type: "string",
        label: "Fill Color",
        ref: "qDef.amGraph.fillColors"
    };
    var fillAlphas = {
        type: "number",
        component: "slider",
        label: "Area fill Opacity",
        ref: "qDef.amGraph.fillAlphas",
        min: 0,
        max: 1,
        step: 0.1,
        defaultValue: 0
    };
    var fontSize = {
        type: "number",
        label: "Font size",
        ref: "qDef.amGraph.fontSize",
        defaultValue: 10
    };
    var columnWidth = {
        type: "number",
        component: "slider",
        label: "Bar Width",
        ref: "qDef.amGraph.columnWidth",
        min: 0,
        max: 1,
        step: 0.1,
        defaultValue: 0.8
    };
    var clustered = {
        type: "boolean",
        component: "switch",
        label: "Columns Clustered",
        ref: "qDef.amGraph.clustered",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: false
    };

    var groupColumn = {
        type: "items",
        items: {
            columnWidth: columnWidth,
            columnClustered: clustered
        },
        show: function(m) {
            if (m.qDef.amGraph.type == "column") {
                return true;
            } else {
                return false;
            }
        }
    };

    // *****************************************************************************
    // Standard Settings > Line/Border settings
    // *****************************************************************************
    var lineColor = {
        type: "string",
        label: "Line Color",
        ref: "qDef.amGraph.lineColor"
    };
    var lineThickness = {
        type: "number",
        component: "slider",
        label: "Line Thickness",
        ref: "qDef.amGraph.lineThickness",
        min: 0,
        max: 10,
        step: 0.5,
        defaultValue: 1
    };
    var dashLength = {
        type: "number",
        component: "slider",
        label: "Dash Length",
        ref: "qDef.amGraph.dashLength",
        min: 0,
        max: 20,
        step: 1,
        defaultValue: 0
    };
    var groupLine = {
        type: "items",
        items: {
            lineColor: lineColor,
            lineThickness: lineThickness,
            dashLength: dashLength
        }
    };
    // *****************************************************************************
    // Standard Settings Grouping
    // *****************************************************************************
    var showStandard = {
        ref: "qDef.amGraph.showStandard",
        type: "boolean",
        label: "Show Standard amGraph Settings",
        component: "switch",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "off"
        }],
        defaultValue: false
    };

    var groupStandard = {
        type: "items",
        label: "amGraph Settings",
        items: {
            amGraphType: amGraphType,
            valueAxis: valueAxis,
            fillColors: fillColors,
            fillAlphas: fillAlphas,
            fontSize: fontSize,
            groupColumn: groupColumn,
            groupLine: groupLine
        },
        show: function(m) {
            return m.qDef.amGraph.showStandard;
        }
    };

    // *****************************************************************************
    // Advanced Settings > Ballooons
    // *****************************************************************************
    var balloonText = {
        ref: "qDef.amGraph.balloonText",
        label: "Balloon Text",
        type: "string",
        defaultValue: "<b>[[title]]</b><br/>[[value]]"
    };
    var showBalloon = {
        ref: "qDef.amGraph.showBalloon",
        type: "boolean",
        label: "Show Balloon Settings",
        component: "switch",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "off"
        }],
        defaultValue: false
    };
    var groupBalloon = {
        type: "items",
        items: {
            balloonText: balloonText
        },
        show: function(m) {
            return m.qDef.amGraph.showBalloon;
        }
    };
    // *****************************************************************************
    // Advanced Settings > Bullets
    // *****************************************************************************
    var bullet = {
        type: "string",
        component: "dropdown",
        label: "Bullet Icon",
        ref: "qDef.amGraph.bullet",
        options: [{
            value: "none",
            label: "None"
        }, {
            value: "round",
            label: "Round"
        }, {
            value: "square",
            label: "Square"
        }, {
            value: "triangleUp",
            label: "Triangle Up"
        }, {
            value: "triangleDown",
            label: "Triangle Down"
        }, {
            value: "bubble",
            label: "Bubble"
        }],
        defaultValue: "none"
    };
    var bulletAlpha = {
        type: "number",
        component: "slider",
        label: "Bullet Alpha",
        ref: "qDef.amGraph.bulletAlpha",
        min: 0,
        max: 1,
        step: 0.1,
        defaultValue: 1
    };
    var bulletColor = {
        type: "string",
        label: "Bullet Color",
        ref: "qDef.amGraph.bulletColor",
        defaultValue: "#FFFFFF"
    };
    var bulletSize = {
        type: "number",
        component: "slider",
        label: "Bullet Size",
        ref: "qDef.amGraph.bulletSize",
        min: 0,
        max: 20,
        step: 1,
        defaultValue: 5
    };
    var showBullet = {
        ref: "qDef.amGraph.showBullet",
        type: "boolean",
        label: "Show Bullet Settings",
        component: "switch",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "off"
        }],
        defaultValue: false
    };
    var groupBullet = {
        type: "items",
        items: {
            bullet: bullet,
            bulletAlpha: bulletAlpha,
            bulletColor: bulletColor,
            bulletSize: bulletSize
        },
        show: function(m) {
            return m.qDef.amGraph.showBullet;
        }
    };
    // *****************************************************************************
    // Advanced Settings > Value Labels
    // *****************************************************************************
    var labelOffset = {
        ref: "qDef.amGraph.labelOffset",
        label: "Label Offset",
        component: "slider",
        type: "number",
        min: 0,
        max: 10,
        step: 0.1,
        defaultValue: 0
    };
    var labelPosition = {
        ref: "qDef.amGraph.labelPosition",
        label: "Label Position",
        component: "dropdown",
        type: "string",
        options: [{
            value: "top",
            label: "Top"
        }, {
            value: "bottom",
            label: "Bottom"
        }, {
            value: "right",
            label: "Right"
        }, {
            value: "left",
            label: "Left"
        }, {
            value: "inside",
            label: "Inside"
        }, {
            value: "middle",
            label: "Middle"
        }],
        defaultValue: "top"
    };
    var labelRotation = {
        type: "number",
        component: "slider",
        label: "Rotate Value Labels",
        ref: "qDef.amGraph.labelRotation",
        min: 0,
        max: 360,
        step: 1,
        defaultValue: 0
    };
    var labelText = {
        ref: "qDef.amGraph.labelText",
        label: "Label Text",
        type: "string",
        defaultValue: "[[value]]"
    };
    var showLabel = {
        ref: "qDef.amGraph.showLabel",
        type: "boolean",
        label: "Show Label Settings",
        component: "switch",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "off"
        }],
        defaultValue: false
    };
    var groupLabel = {
        type: "items",
        items: {
            labelOffset: labelOffset,
            labelPosition: labelPosition,
            labelRotation: labelRotation,
            labelText: labelText
        },
        show: function(m) {
            return m.qDef.amGraph.showLabel;
        }
    };
    // *****************************************************************************
    // Advanced Settings > Various
    // *****************************************************************************
    var behindColumns = {
        type: "boolean",
        component: "dropdown",
        label: "line graphs behind columns",
        ref: "qDef.amGraph.behindColumns",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "Off"
        }],
        defaultValue: false
    };
    var showVarious = {
        ref: "qDef.amGraph.showVarious",
        type: "boolean",
        label: "Show Various Settings",
        component: "switch",
        options: [{
            value: true,
            label: "On"
        }, {
            value: false,
            label: "off"
        }],
        defaultValue: false
    };
    var groupVarious = {
        type: "items",
        items: {
            behindColumns: behindColumns
        },
        show: function(m) {
            return m.qDef.amGraph.showVarious;
        }
    };
    // *****************************************************************************
    // RETURN OBJECT
    // *****************************************************************************
    return {
            showStandard: showStandard,
            groupStandard: groupStandard,
            showBalloon: showBalloon,
            groupBalloon: groupBalloon,
            showBullet: showBullet,
            groupBullet: groupBullet,
            showLabel: showLabel,
            groupLabel: groupLabel,
            showVarious: showVarious,
            groupVarious: groupVarious
    };
});
