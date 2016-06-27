# Qliksense Extension integrating amCharts.

## Introduction
This is a work in progress project for integrating [amCharts](https://www.amcharts.com/) charting library into qliksense extension(s).

At the moment the project is an implementation of a waterfall chart in the amWaterfall folder and a combo chart in the amCombo folder.

### Latest Change
* Cleaned up folders & added zipping to build functionality.
* Added new screeenshots of the combo chart, which should be functional now, albeit not very tested.
* Made the connection between all the appearance settings & the chart API (you can now 3d, choose clustered bars, handrawn, change fontsize/family etc. etc.)
* Fixed an error that made the combo only work with precisly 4 measures.

## Screenshots
### Combo Chart
![Combo Chart Screens](comboPictures/womboCombo.png)
### Waterfall Chart
![Waterfall Chart Screens](waterfallPictures/waterFall.png)

## How to use
Import amCombo.zip & amWaterfall.zip into your qliksense dev-hub.

I've included some default 'synthetic' dimensions and expressions that should help you understand how dimensions and measures are used in the chart. If you don't know how the valuelist & pick & match functions work, especially in relation to synthetic dimensions there is a post [here](https://community.qlik.com/blogs/qlikviewdesignblog/2013/07/01/valuelist-for-those-tricky-situations) by Alexander Karlsson explaining valuelist together with an IF statement.

The pick(match()) structure does the same thing as the if sentence in this case. Where instead of having
case1 = statement1, return mes1..
case2 = statement2, return mes2.
The structure is more
case1,case2,..statement1,statement2..mes1,mes2...

## Known issues
* The axis rotation API settings doesn't seem to work if you rotate the whole graph via the rotate graph setting.