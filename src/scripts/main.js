var Value = require('./components/Value');
var AddValue = require('./components/AddValue');
var ValuesList = require('./components/ValuesList');

function init() {
    var addValue = new AddValue();
    var valuesList = new ValuesList();
    
    addValue.on('newValue', function(valueData) {valuesList.addValue(valueData)});
}

document.addEventListener('DOMContentLoaded', init);
