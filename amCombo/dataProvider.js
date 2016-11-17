var DataProvider = function(hyperCube) {
  var self = this;
  self.hyperCube = hyperCube;
  self.dataProvider = [];
  self.amGraphs = [];
};

DataProvider.prototype.addGraphs = function() {
  var self = this;
  self.hyperCube.qMeasureInfo.forEach(function(measureDef, mindex) {
    var graph;
    if (measureDef.amGraph.type == 'Waterfall') {
      graph = new DataGraphWaterfall(measureDef);
    } else {
      graph = new DataGraph(measureDef);
    }
    graph.showLabel();
    self.amGraphs.push(graph);
  });
};

var DataGraph = function(measureDef) {
  var self = this;
  self.measureDef = measureDef;
  self.type = measureDef.amGraph.type;
  self.lineColor = measureDef.amGraph.fillColors;
  self.fillColorsField = 'color' + measureDef.cId;
  self.colorField = 'color' + measureDef.cId;
  self.lineColorField = 'lineColor' + measureDef.cId;
  self.id = measureDef.cId;
  self.title = measureDef.qFallbackTitle;
  self.bulletBorderAlpha = 1;
  self.hideBulletsCount = 50;
  self.useLineColorForBulletBorder = true;
  self.balloonText = "<b>[[title]]</b><br/>[[text" + measureDef.cId + "]]";
  self.valueAxis = measureDef.amGraph.valueAxis;
  self.fillAlphas = measureDef.amGraph.fillAlphas;
  self.fontSize = measureDef.amGraph.fontSize;
  self.columnWidth = measureDef.amGraph.columnWidth;
  self.clustered = measureDef.amGraph.clustered;
  self.lineThickness = measureDef.amGraph.lineThickness;
  self.dashLength = measureDef.amGraph.dashLength;
  self.bullet = measureDef.amGraph.bullet;
  self.bulletAlpha = measureDef.amGraph.bulletAlpha;
  self.bulletColor = measureDef.amGraph.bulletColor;
  self.bulletSize = measureDef.amGraph.bulletSize;
  self.labelOffset = measureDef.amGraph.labelOffset;
  self.labelPosition = measureDef.amGraph.labelPosition;
  self.labelRotation = measureDef.amGraph.labelRotation;
  self.behindColumns = measureDef.amGraph.behindColumns;
  self.valueField = measureDef.cId;
};

DataGraph.prototype.showLabel = function() {
  var self = this;
  if (self.measureDef.amGraph.showLabel === true) {
    amGraph.labelText = "[[text" + self.measureDef.cId + "]]";
  }
};

var DataGraphWaterfall = function(measureDef) {
  var self = this;
  DataGraph.call(self, measureDef);
  self.type = 'column';
  self.openField = "open" + measureDef.cId;
  self.valueField = "close" + measureDef.cId;
};

DataGraphWaterfall.prototype = Object.create(DataGraph.prototype);
DataGraphWaterfall.prototype.constructor = DataGraphWaterfall;

DataProvider.prototype.addData = function() {
  var self = this;
  self.hyperCube.qDataPages.forEach(function(page, pindex) {
    page.qMatrix.forEach(function(row, rindex) {
      var dataRow = new DataRow(row, rindex, self.hyperCube, self);
      dataRow.addRowData();
    });
  });
};

var DataRow = function(row, rindex, hyperCube, dataProvider) {
  var self = this;
  self.dataProvider = dataProvider;
  self.hyperCube = hyperCube;
  self.row = row;
  self.rindex = rindex;
  self.rowObject = {};
};

DataRow.prototype.isCellDimension = function(cindex) {
  var self = this;
  return cindex < self.hyperCube.qDimensionInfo.length;
};

DataRow.prototype.isCellWaterfall = function(cindex) {
  var self = this;
  return self.hyperCube.qMeasureInfo[cindex - self.hyperCube.qDimensionInfo.length].amGraph.type == 'Waterfall';
};

DataRow.prototype.findCellId = function(isDimension, cindex) {
  var self = this;
  if (isDimension) {
    return self.hyperCube.qDimensionInfo[cindex].cId;
  } else {
    return self.hyperCube.qMeasureInfo[cindex - self.hyperCube.qDimensionInfo.length].cId;
  }
};

DataRow.prototype.addRowData = function() {
  var self = this;
  var dataPointStart = {};
  var dataPointEnd = {};
  self.row.forEach(function(cell, cindex) {
    var isDimension = self.isCellDimension(cindex);
    var cellId = self.findCellId(isDimension, cindex);
    var dataPoint;
    var lastClose;
    switch (isDimension) {
      case true:
        dataPoint = new DimensionPoint(self.hyperCube, self.rindex, cell, cindex, cellId);
        break;
      case false:
        var isWaterfall = self.isCellWaterfall(cindex);
        switch (isWaterfall) {
          case true:
            switch (self.rindex) {
              case 0:
                lastClose = 0;
                dataPointStart = new WaterfallPointBounds(self.hyperCube, self.rindex, cell, cindex, cellId, lastClose, 'start');
                dataPointStart.addAllData();
                self.dataProvider.dataProvider.push(dataPointStart.values);
                break;
              case self.hyperCube.qSize.qcy - 1:
                lastClose = 0;
                dataPointEnd = new WaterfallPointBounds(self.hyperCube, self.rindex, cell, cindex, cellId, lastClose, 'end');
                dataPointEnd.addAllData();
                break;
              default:
                lastClose = self.dataProvider.dataProvider[self.rindex]['close' + cellId];
                break;
            }
            dataPoint = new WaterfallPoint(self.hyperCube, self.rindex, cell, cindex, cellId, lastClose);
            break;
          case false:
            dataPoint = new DataPoint(self.hyperCube, self.rindex, cell, cindex, cellId);
            break;
        }
    }
    dataPoint.addAllData();
    self.rowObject = Object.assign(self.rowObject, dataPoint.values);
  });
  self.dataProvider.dataProvider.push(self.rowObject);
  if (self.hyperCube.qSize.qcy - 1 === self.rindex) {
    self.dataProvider.dataProvider.push(dataPointEnd.values);
  }
};

var DataPoint = function(hyperCube, rindex, cell, cindex, cellId) {
  var self = this;
  self.hyperCube = hyperCube;
  self.cell = cell;
  self.cindex = cindex;
  self.cellId = cellId;
  self.values = {};
};

DataPoint.prototype.addPointData = function() {
  var self = this;
  self.values['text' + self.cellId] = self.cell.qText;
  self.values[self.cellId] = (self.cell.qNum == 'NaN' ? self.cell.qText : self.cell.qNum);
};

DataPoint.prototype.addAllData = function() {
  var self = this;
  self.addPointData();
};

var DimensionPoint = function(hyperCube, rindex, cell, cindex, cellId) {
  var self = this;
  DataPoint.call(self, hyperCube, rindex, cell, cindex, cellId);
};

DimensionPoint.prototype = Object.create(DataPoint.prototype);
DimensionPoint.prototype.constructor = DimensionPoint;

DimensionPoint.prototype.addDimensionData = function() {
  var self = this;
  self.values['elemNumber' + self.cellId] = self.cell.qElemNumber;
  self.values.dimText = self.cell.qText;
};

DimensionPoint.prototype.addAllData = function() {
  var self = this;
  self.addPointData();
  self.addDimensionData();
};

var MeasurePoint = function(hyperCube, rindex, cell, cindex, cellId) {
  var self = this;
  DataPoint.call(self, hyperCube, rindex, cell, cindex, cellId);
};

MeasurePoint.prototype = Object.create(DataPoint.prototype);
MeasurePoint.prototype.constructor = MeasurePoint;

MeasurePoint.prototype.addMeasureData = function() {
  var self = this;
  if (typeof self.cell.qAttrExps.qValues[0].qText != 'undefined') {
    self.values['color' + self.cellId] = self.cell.qAttrExps.qValues[0].qText;
  }
  if (typeof self.cell.qAttrExps.qValues[1].qText != 'undefined') {
    self.values['lineColor' + self.cellId] = self.cell.qAttrExps.qValues[1].qText;
  }
};

var WaterfallPoint = function(hyperCube, rindex, cell, cindex, cellId, lastClose) {
  var self = this;
  MeasurePoint.call(self, hyperCube, rindex, cell, cindex, cellId);
  self.lastClose = lastClose;
};

WaterfallPoint.prototype = Object.create(MeasurePoint.prototype);
WaterfallPoint.prototype.constructor = WaterfallPoint;

WaterfallPoint.prototype.addWaterfallData = function() {
  var self = this;
  var open = self.lastClose;
  var close = self.lastClose + self.cell.qNum;

  self.values['open' + self.cellId] = open;
  self.values['close' + self.cellId] = close;

  if (typeof self.cell.qAttrExps.qValues[0].qText == 'undefined') {
    self.values['color' + self.cellId] = open > close ? '#54cb6a' : '#cc4b48';
  }
  if (typeof self.cell.qAttrExps.qValues[1].qText == 'undefined') {
    self.values['lineColor' + self.cellId] = '#888888';
  }

};

WaterfallPoint.prototype.addAllData = function() {
  var self = this;
  self.addPointData();
  self.addMeasureData();
  self.addWaterfallData();
};

var WaterfallPointBounds = function(hyperCube, rindex, cell, cindex, cellId, lastClose, bound) {
  var self = this;
  WaterfallPoint.call(self, hyperCube, rindex, cell, cindex, cellId, lastClose);
  self.bound = bound;
  self[bound] = hyperCube.qMeasureInfo[cindex - hyperCube.qDimensionInfo.length].waterfall[bound];
  self[bound + 'label'] = hyperCube.qMeasureInfo[cindex - hyperCube.qDimensionInfo.length].waterfall[bound + 'Label'];
  self[bound + 'visible'] = true;
  self[bound + 'color'] = "#1c8ceb";
};

WaterfallPointBounds.prototype = Object.create(WaterfallPoint.prototype);
WaterfallPointBounds.prototype.constructor = WaterfallPointBounds;


WaterfallPointBounds.prototype.addWaterfallBound = function() {
  var self = this;
  self.values['text' + self.hyperCube.qDimensionInfo[0].cId] = self[self.bound + 'label'];
  self.values['text' + self.cellId] = self[self.bound];
  self.values['elemNumber' + self.hyperCube.qDimensionInfo[0].cId] = -2;
  self.values['open' + self.cellId] = 0;
  self.values['close' + self.cellId] = self.lastClose + self[self.bound];
  self.values['color' + self.cellId] = self[self.bound + 'color'];
  self.values.dimText = self[self.bound + 'label'];
};

WaterfallPointBounds.prototype.addAllData = function() {
  var self = this;
  self.addPointData();
  self.addMeasureData();
  self.addWaterfallData();
  self.addWaterfallBound();
};
