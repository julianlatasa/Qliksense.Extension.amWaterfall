requirejs.config({
  paths: {
    "amcharts": "/extensions/amCombo/library/amcharts",
    "amcharts.serial": "/extensions/amCombo/library/serial",
    "amcharts.theme.dark": "/extensions/amCombo/library/dark",
    "amcharts.theme.black": "/extensions/amCombo/library/black",
    "amcharts.theme.chalk": "/extensions/amCombo/library/light",
    "amcharts.theme.light": "/extensions/amCombo/library/chalk",
    //"amcharts.theme.patterns": "/extensions/amCombo/library/patterns"
  },
  shim: {
    "amcharts.serial": {
      deps: ["amcharts", "amcharts.theme.dark", "amcharts.theme.black", "amcharts.theme.chalk", "amcharts.theme.light"],
      exports: "AmCharts",
      init: function() {
        AmCharts.isReady = true;
      }
    }
  }
});
define([
    'qlik',
    'jquery',
    './properties',
    './dataProvider',
    'amcharts.serial'
  ],
  function(qlik, $, props) {
    return {
      definition: props,
      initialProperties: {
        qHyperCubeDef: {
          qDimensions: [],
          qMeasures: [],
          qInitialDataFetch: [{
            qWidth: 6,
            qHeight: 1500
          }]
        }
      },
      paint: function($element, layout) {
        var self = this;
        var hc = layout.qHyperCube;
        var dataProviderNew = new DataProvider(layout.qHyperCube);
        dataProviderNew.addData();
        dataProviderNew.addGraphs();

        //Set themes
        AmCharts.themes.dark = amChartsThemesDark;
        AmCharts.themes.light = amChartsThemesLight;
        AmCharts.themes.black = amChartsThemesBlack;
        AmCharts.themes.chalk = amChartsThemesChalk;
        var valueAxesLeft = {
          "id": "v1",
          "position": "left",
          "autoGridCount": false,
          "stackType": layout.amChart.valueAxis.leftStackType,
          "fontSize": layout.amChart.valueAxis.fontSize,
          "title": layout.amChart.valueAxis.leftTitle
        };
        if (layout.amChart.valueAxis.leftMinimum !== "") {
          valueAxesLeft.minimum = layout.amChart.valueAxis.leftMinimum;
        }
        var valueAxesRight = {
          "id": "v2",
          "position": "right",
          "autoGridCount": false,
          "stackType": layout.amChart.valueAxis.rightStackType,
          "fontSize": layout.amChart.valueAxis.fontSize,
          "title": layout.amChart.valueAxis.rightTitle,

        };
        if (layout.amChart.valueAxis.rightMinimum !== "") {
          valueAxesRight.minimum = layout.amChart.valueAxis.rightMinimum;
        }
        var chart = AmCharts.makeChart($element[0], {
          "type": "serial",
          "rotate": layout.amChart.rotate,
          "theme": layout.amChart.theme,
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
            size: layout.amChart.titles.size
          }],
          "valueAxes": [valueAxesLeft, valueAxesRight],
          "graphs": dataProviderNew.amGraphs, //amGraphs,
          "trendLines": dataProviderNew.trendLines,
          "chartCursor": {
            "selectWithoutZooming": true,
            "pan": false,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha": 0,
            "valueLineAlpha": 0.2
          },
          "categoryField": "text" + hc.qDimensionInfo[0].cId,
          "categoryAxis": {
            "parseDates": false,
            "dashLength": 1,
            "minorGridEnabled": true,
            "labelRotation": layout.amChart.categoryAxis.labelRotation,
            "fontSize": layout.amChart.categoryAxis.fontSize,
            "title": layout.amChart.categoryAxis.title
          },
          "legend": {
            "equalWidths": false,
            "useGraphSettings": true,
            "valueText": "",
            "enabled": layout.amChart.legend.enabled,
            "position": layout.amChart.legend.position
          },
          "balloon": {
            "enabled": layout.amChart.balloon.enabled
          },
          "export": {
            "enabled": true
          },
          "dataProvider": dataProviderNew.dataProvider
        });

        //CSS STUFF
        if (layout.amChart.handDrawn) {
          $element.find("*").css("font-family", "Kristen ITC");
        } else {
          $element.find("*").css("font-family", layout.amChart.fontFamily);
        }

        if (layout.amChart.theme == 'dark' || layout.amChart.theme == 'chalk') {
          $element.css("background-color", "#282828");
        } else {
          if (layout.amChart.theme == 'black') {
            $element.css("background-color", "#222222");
          } else {
            $element.css("background-color", "#FFFFFF");
          }
        }

        $element.css('border-radius', '10px');

        //EVENTS
        chart.chartCursor.addListener("selected", zoomy);

        function zoomy(zomzom) {
          var dimValArray = [];
          dataProvider.forEach(function(row, index) {
            if (index >= zomzom.start && index <= zomzom.end && row["elemNumber" + hc.qDimensionInfo[0].cId] >= 0) {
              dimValArray.push(row["elemNumber" + hc.qDimensionInfo[0].cId]);
            }
          });
          self.selectValues(0, dimValArray, false);
        }

        chart.addListener("clickGraphItem", handleClickGraphItem);

        function handleClickGraphItem(event) {
          var dimValArray = [];
          if (dataProvider[event.index]["elemNumber" + hc.qDimensionInfo[0].cId] >= 0) {
            dimValArray.push(dataProvider[event.index]["elemNumber" + hc.qDimensionInfo[0].cId]);
          }
          self.selectValues(0, dimValArray, false);
        }
      }

    };

  });
