# Qliksense Extension integrating amCharts.

## Introduction
This is a work in progress project for integrating [amCharts](https://www.amcharts.com/) charting library into qliksense extension(s).

At the moment this project is an implementation of a combo chart that includes a waterfall type measure.

The goal of the combo chart is to give the user alooot of settings to mess around with, the screenshot examples below are just a small subset of outcomes you can produce. It is definatly possible to make visualizations that don't make sense or don't follow best practices or similar. I think the standard QlikSense charts are really good at helping the user make charts that make sense and follow best practices, but that sometimes removes alot of flexibility. When developing this extension I will to a greater degree choose flexibility even when it means giving the users settings that potentially can make graphs that don't make sense.

Please rate & give feedback! If you wan't to contribute feel free to message me on github.

### Current Development
Below are the current changes I'm looking into based on feedback from other users.
* Look into handling drill down dimensions.

### Latest 5 Changes
* When you select an area (zoom) or click a value in the chart, instead of zooming through the amCharts API the dimension values are instead selected in the QlikSense application, so that it works similar to other QlikSense objects. (shared zooming/selection between objects).
* When you choose the waterfall measure type, you are now prompted to enter an expression for start and end values. See screenshot below regarding how to use this setup. THe reason for this change was to avoid having to use complex valuelist synthetic dimensions to be able to create a waterfall.
* Changed the chart to use the standard numberformatting settings on the measures instead. (These will be reflected on labels and balloons however they wont be reflected in the value axis which can be a minor problem for % graphs where the actual numbers are different:*100, also with this setup you can't change the labeltext and balloon text but only select wether to show them or not.). This also fixes an issue with the waterfall type measure; before label numbers were accumulative, now they represent the single observation value.
* Changed the refference to the amCharts library to be local instead of CDN.
* Instead of having the waterfall chart in a seperate extension, you can now choose 'Waterfall' as the measure type next to (column/line/smoothedLine).

## Screenshots
### New method for creating waterfall's in the combo chart.
![New waterfall method](comboPictures/comboNewWaterfall.PNG)
### Combo chart (waterfall measure type)
![Waterfall Chart Screens](comboPictures/comboFall.PNG)
### Random settings screens.
![Combo Chart Screens](comboPictures/comboRandom.PNG)
### Combo chart (silly visualizations)
![Really stupid combo charts](comboPictures/sillyGraphs.PNG)
### Combo Chart (New measure Opacity)
![Combo Chart Opacity](comboPictures/areaOpacity.PNG)
### Combo Chart (New stacking settings)
![Combo Chart Opacity](comboPictures/stacking.PNG)

## How to use
Import amCombo.zip into your qliksense dev-hub extensions folder.

## Documentation
When using the amCombo chart the naming and structure follows that of the amCharts API.
* The additional properties on the measures are a subset of the API properties [amGraph](https://docs.amcharts.com/3/javascriptcharts/AmGraph).
* The properties in the amCharts section are a subset of the API properties of the [amSerialChart](https://docs.amcharts.com/3/javascriptcharts/AmSerialChart) and its descendant objects (valueAxes, legend, titles & categoryAxis).

## Disclaimer
I'm in no way affiliated with amcharts.com. Their library is free to use for commercial purposes with the caveate that you must include the link to their website in the charts (as seen on the top left of the chart screenshots). If you would want a version without links to amcharts.com they would have to implement a solution to market.qlik.