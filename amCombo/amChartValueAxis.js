define([], function() {

    var fontSize = {
        type: "number",
        label: "Font Size",
        ref: "amChart.valueAxis.fontSize",
        defaultValue: 12
    };

    var leftTitle = {
        type: "string",
        label: "Left Axis Title",
        ref: "amChart.valueAxis.leftTitle",
        defaultValue: "Left Value Axis"
    };

    var rightTitle = {
        type: "string",
        label: "Right Axis Title",
        ref: "amChart.valueAxis.rightTitle",
        defaultValue: "Right Value Axis"
    };

    var leftCustomValue = {
        type: "string",
        label: "Left Custom Value",
        ref: "amChart.valueAxis.leftCustomValue",
        defaultValue: "0",
        component: "dropdown",
        options: [{
            value: "0",
            label: "Default"
        },
        {
            value: "1",
            label: "Duration"
        },
        {
            value: "2",
            label: "Percentage"
        }]
    };

    var leftStackType = {
        type: "string",
        component: "dropdown",
        label: "Left Axis Stack Type",
        ref: "amChart.valueAxis.leftStackType",
        options: [{
            value: "none",
            label: "None"
        },
        {
            value: "regular",
            label: "Regular"
        },
        {
            value: "100%",
            label: "100%"
        },{
            value: "3d",
            label: "3d"
        }],
        defaultValue: "none"
    };
    var rightStackType = {
        type: "string",
        component: "dropdown",
        label: "Right Axis Stack Type",
        ref: "amChart.valueAxis.rightStackType",
        options: [{
            value: "none",
            label: "None"
        },
        {
            value: "regular",
            label: "Regular"
        },
        {
            value: "100%",
            label: "100%"
        },{
            value: "3d",
            label: "3d"
        }],
        defaultValue: "none"
    };
    var rightCustomValue = {
        type: "string",
        label: "Right Custom Value",
        ref: "amChart.valueAxis.rightCustomValue",
        defaultValue: "0",
        component: "dropdown",
        options: [{
            value: "0",
            label: "Default"
        },
        {
            value: "1",
            label: "Duration"
        },
        {
            value: "2",
            label: "Percentage"
        }]
    };

    var leftMinimum = {
        type: "number",
        label: "Left Axis Minimum",
        ref: "amChart.valueAxis.leftMinimum",
        expression: "always",
        defaultValue: ""
    };
    var rightMinimum = {
        type: "number",
        label: "Right Axis Minimum",
        ref: "amChart.valueAxis.rightMinimum",
        expression: "always",
        defaultValue: ""
    };

    return {
        type: "items",
        label: "amChart.valueAxis",
        items: {
            fontSize: fontSize,
            leftTitle: leftTitle,
            leftStackType: leftStackType,
            leftMinimum: leftMinimum,
            leftCustomValue: leftCustomValue,
            rightTitle: rightTitle,
            rightStackType: rightStackType,
            rightCustomValue: rightCustomValue,
            rightMinimum: rightMinimum
        }
    };

});
