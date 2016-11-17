var DataProvider = function(hyperCube) {
  var self = this;
  self.hyperCube = hyperCube;
  self.dataProvider = [];
  self.amGraphs = [];
};

DataProvider.prototype.addData = function() {
  var self = this;
  self.hyperCube.qDataPages.forEach(function(page, pindex) {
    page.qMatrix.forEach(function(row, rindex) {
      var dataRow = new DataRow(row, rindex, self.hyperCube);
      dataRow.addRowData();
      self.dataProvider.push(dataRow.rowObject);
    });
  });
};

var DataRow = function(row, rindex, hyperCube) {
  var self = this;
  self.hyperCube = hyperCube;
  self.row = row;
  self.rindex = rindex;
  self.rowObject = {};
};

DataRow.prototype.isCellDimension = function(cindex) {
  var self = this;
  return (cindex < self.hyperCube.qDimensionInfo.length ? true : false);
};

DataRow.prototype.findCellId = function(isDimension, cindex) {
  var self = this;
  if (isDimension) {
    return self.hyperCube.qDimensionInfo[cindex].cId;
  } else {
    return self.hyperCube.qMeasureInfo[cindex - self.hyperCube.qDimensionInfo.length].cId;
  }
};

DataRow.prototype.addDimensionInfo = function(cell, cellId) {
  var self = this;
  self.rowObject['elemNumber' + cellId] = cell.qElemNumber;
  self.rowObject['text' + cellId] = cell.qText;
  self.rowObject.dimText = cell.qText;
};

DataRow.prototype.addMeasureInfo = function(cell, cellId) {
  var self = this;
  self.rowObject['text' + cellId] = cell.qText;
  self.rowObject[cellId] = (cell.qNum == 'NaN' ? cell.qText : cell.qNum);
};

DataRow.prototype.addRowData = function() {
  var self = this;
  self.row.forEach(function(cell, cindex) {
    var isDimension = self.isCellDimension(cindex);
    var cellId = self.findCellId(isDimension, cindex);
    if (isDimension) {
      self.addDimensionInfo(cell, cellId);
    } else {
      self.addMeasureInfo(cell, cellId);
    }
  });
};
