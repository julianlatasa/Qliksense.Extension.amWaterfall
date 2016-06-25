# Qliksense Extension integrating amCharts.
## Work in progress

## Introduction
This project is a work in progress extension, for integrating the
[amCharts](https://www.amcharts.com/) into a Qliksense extension.
At the moment the project is an implementation of a waterfall chart, however emphasis is made on making a connection between the customer properties settings in Qliksense and the API in amCharts, that are not specific to the waterfall type, but are mostly generic API properties or at most specific to the 'serial' type chart.

## Screenshots
![Standard Look](StandardLook.PNG)
![Title Settings](TitleSettings.PNG)
![3D Effects](3DEffects.PNG)
![Font Styling And Balloon](fontStylingAndBalloon.PNG)
![Hand Drawn Effect](handDrawnEffect.PNG)

## Further implementation
### More charts!
Implement other serial charts (mostly I have to change the way the dataProvider & trendlines objects are created, settings will hopefully be reusable atleast to a 90% degree or similar). Implement a selector on chart type.

### Optimization!
Not much thought has been put into optimization at the moment, will have to look through the code and others too see if e.g. the way i create the dataProvider is optimal.

### including .zippin in Grunt build.
Include a zip creating for the grunt buil file to create onclick importable .zip extension projects.

## How to use
At the moment, transfer the amWaterfall.js, amWaterfall.qext, wbFolder.wbl files to your extension folder.

I've included some default 'synthetic' dimensions and expressions that should help you understand how dimensions and measures are used in the chart. If you don't know how the valuelist & pick & match functions work, especially in relation to synthetic dimensions google it (ill find a link here for later on).