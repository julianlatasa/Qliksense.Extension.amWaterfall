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
    var design = {
        type: "items",
        label: "Design",
        items: {
            fontFamily: fontFamily
        }
    };

    var appearanceSection = {
        uses: "settings",
        items: {
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
