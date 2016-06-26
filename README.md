# Qliksense Extension integrating amCharts.

## Introduction
This project is a work in progress qliksense visual extension, for integrating the
[amCharts](https://www.amcharts.com/) charting library.
At the moment the project is an implementation of a waterfall chart in the amWaterfall folder and a work in progress bullet / line combo chart in the amCombo folder.

## Screenshots
### Standard Look
![Standard Look](standardLook.PNG)
### Title Settings
![Title Settings](TitleSettings.PNG)
### 3D Effects
![3D Effects](3DEffects.PNG)
### Font Styling
![Font Styling And Balloon](fontStylingAndBalloon.PNG)
### Hand Drawn Effects
![Hand Drawn Effect](HandDrawnEffect.PNG)
### WIP - Bullet / line combo chart.
![Bullet / line combo chart](comboChartWIP.PNG)


## How to use
At the moment, transfer the amWaterfall.js, amWaterfall.qext, wbFolder.wbl files to your extension folder.

I've included some default 'synthetic' dimensions and expressions that should help you understand how dimensions and measures are used in the chart. If you don't know how the valuelist & pick & match functions work, especially in relation to synthetic dimensions google it (ill find a link here for later on).