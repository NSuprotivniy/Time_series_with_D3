var extendConstructor = require('../utils/extendConstructor');
var Eventable = require('../modules/Eventable');

function ChartConstructor() {
    
    this._data = [];
    this._itemsIteratior = 0;
}

extendConstructor(ChartConstructor, Eventable);

var chartConstructorPrototype = ChartConstructor.prototype;

chartConstructorPrototype.addValue = function(valueData) {
    
    console.log(this._itemsIteratior);
    this._data.push({id: this._itemsIteratior++, time: valueData.time, value: valueData.value});
    this._rebuild();   

};

chartConstructorPrototype.removeValue = function(valueData) {
    
    console.log(valueData.id);
    
    var value = this._getValueById(valueData.id);
    
    if (value) {
        var valueIndex = this._data.indexOf(value);
        this._data.splice(valueIndex, 1);
        this._rebuild();
    }
    
};


chartConstructorPrototype._rebuild = function() {
    var chartSelector = document.querySelector('.chart');


    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = chartSelector.offsetWidth - margin.left - margin.right,
        height = chartSelector.offsetHeight - margin.top - margin.bottom;


    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    
    d3.select("svg").selectAll("*").remove();

    var svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("fill", "none")
        .attr("stroke", "black")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var line = d3.line()
        .x(function(d) { return x(d.time); })
        .y(function(d) { return y(d.value); });


    x.domain(d3.extent(this._data, function(d) { return d.time; }));
    y.domain([0, d3.max(this._data, function(d) { return d.value; })]);

      svg.append("path")
          .data([this._data])
          .attr("class", "line")
          .attr("d", line);

      // Add the X Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
          .call(d3.axisLeft(y));
};

chartConstructorPrototype._getValueById = function (id) {
    var data = this._data;

    for (var i = data.length; i-- ;) {
        if (data[i].id === id) {
            return data[i];
        }
    }

    return null;
};


module.exports = ChartConstructor;


