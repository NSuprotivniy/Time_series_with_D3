var Value = require('./components/Value');
var AddValue = require('./components/AddValue');
var ValuesList = require('./components/ValuesList');
var Chart = require('./components/Chart');
var SidePanel = require('./components/SidePanel');

function init() {
    var addValue = new AddValue();
    var valuesList = new ValuesList();
    var chart = new Chart();
    var sidePanel = new SidePanel();
    
    addValue.on('newValue', function(valueData) {valuesList.addValue(valueData)});
    addValue.on('newValue', function(valueData) {chart.addValue(valueData)});
    valuesList.on('valueDelete', function(valueData) {chart.removeValue(valueData)});
}

document.addEventListener('DOMContentLoaded', init);
