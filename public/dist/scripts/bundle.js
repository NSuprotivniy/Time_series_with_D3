/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function Eventable() {}

var eventablePrototype = Eventable.prototype;

eventablePrototype._initEventable = function () {
    this._eventable_registry = {};
};

function getEventSubscribers(eventable, eventName, needCreate) {
    var registry = eventable._eventable_registry;

    if (eventName in registry) {
        return registry[eventName];

    } else if (needCreate) {
        return registry[eventName] = [];
    }

    return null;
}

eventablePrototype.on = function (eventName, handler, ctx) {
    var subscribers = getEventSubscribers(this, eventName, true);

    subscribers.push({
        handler: handler,
        ctx: ctx
    });

    return this;
};

eventablePrototype.off = function (eventName, handler, ctx) {
    var subscribers = getEventSubscribers(this, eventName);

    if (subscribers) {
        for (var i = subscribers.length; i-- ;) {
            if ((subscribers[i].handler === handler)
                && (subscribers[i].ctx === ctx)
            ) {
                subscribers.splice(i, 1);
                return this;
            }
        }
    }

    return this;
};

eventablePrototype.trigger = function (eventName, data) {
    var subscribers = getEventSubscribers(this, eventName);

    if (subscribers) {
        var subscribersCopy = subscribers.slice();
        for (var i = 0, l = subscribersCopy.length; i !== l; i += 1) {
            subscribersCopy[i].handler.call(subscribersCopy[i].ctx, data);
        }
    }

    return this;
};

module.exports = Eventable;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * @param {Function} Extendable
 * @param {Function} Extension
 * @return {Function} Extendable
 */
function extendConstructor(Extendable, Extension) {
    var extendablePrototype = Extendable.prototype;
    var extensionPrototype = Extension.prototype;

    for (var p in extensionPrototype) {
        extendablePrototype[p] = extensionPrototype[p];
    }

    return Extendable;
}

module.exports = extendConstructor;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Eventable = __webpack_require__(0);
var extendConstructor = __webpack_require__(1);
var templatesEngine = __webpack_require__(7);

function ValueConstructor(valueData) {
    
    
    this._initEventable();
    
    var templateResult = templatesEngine.Value(valueData);
    
    this._remove = templateResult.remove;
    this._value = templateResult.value;
    this._time = templateResult.time;
    this._root = templateResult.root;
    
    this.model = {
        id: valueData.id,
        value: valueData.value,
        time: valueData.time
    };
    
    
    this._remove.addEventListener('click', this);
}

extendConstructor(ValueConstructor, Eventable);

var valueConstructorPrototype = ValueConstructor.prototype;

valueConstructorPrototype.render = function(parent) {
    parent.appendChild(this._root);
    return this;
    
}


valueConstructorPrototype.handleEvent = function (e) {
    switch (e.type) {
        case 'click':
            if (e.target === this._remove) {
                this.remove();
            }
            break;
    }
};

valueConstructorPrototype.remove = function () {
    this._root.parentNode.removeChild(this._root);
    this.trigger('remove', this.model.id);
    return this;
};

module.exports = ValueConstructor;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var extendConstructor = __webpack_require__(1);
var Eventable = __webpack_require__(0);

var ENTER_KEY_CODE = 13;

var CONTROL_PANEL_INPUT = '.js-control_panel-input';

function AddValueConstructor() {
    this._valueInput = document.querySelector(CONTROL_PANEL_INPUT);

    this._valueInput.addEventListener('keypress', this);

    this._initEventable();
}


extendConstructor(AddValueConstructor, Eventable);

var addValueConstructorPrototype = AddValueConstructor.prototype;


addValueConstructorPrototype._addValue = function () {
    var value = this._valueInput.value.trim();

    if (value.length !== 0) {
        this._valueInput.value = '';
    }
    
    return this.trigger('newValue', {
        value: parseInt(value),
        time: new Date()
    });
};


addValueConstructorPrototype.handleEvent = function (e) {
    switch (e.type) {
        case 'keypress':
            if (e.keyCode === ENTER_KEY_CODE) {
                this._addValue();
            }
            break;
    }
};

module.exports = AddValueConstructor;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var extendConstructor = __webpack_require__(1);
var Eventable = __webpack_require__(0);

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




/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Eventable = __webpack_require__(0);
var extendConstructor = __webpack_require__(1);

var Value = __webpack_require__(2);

var VALUES_LIST = '.js-values-list';


function ValuesListConstructor() {

    this._values = [];
    this._valuesList = document.querySelector(VALUES_LIST);
    
    this._itemsIteratior = 0;

    this._initEventable();
}

extendConstructor(ValuesListConstructor, Eventable);

var valuesListConstructorPrototype = ValuesListConstructor.prototype;

valuesListConstructorPrototype.addValue = function (valueData) {
    
    
    var value = new Value(Object.assign(
        {
            id: this._itemsIteratior++,
        },
        valueData
    ));

    this._values.push(value);

    value
        .on('remove', this._onValueRemove, this)
        .render(this._valuesList);

    return this;
};

valuesListConstructorPrototype._getValueById = function (id) {
    var values = this._values;

    for (var i = values.length; i-- ;) {
        if (values[i].model.id === id) {
            return values[i];
        }
    }

    return null;
};

valuesListConstructorPrototype._onValueRemove = function (id) {
    var value = this._getValueById(id);

    if (value) {
        value.off('remove', this._onItemRemove, this);
        var valueIndex = this._values.indexOf(value);
        this._values.splice(valueIndex, 1);
        this.trigger('valueDelete', value.model);
    }

    return this;
};

module.exports = ValuesListConstructor;



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Value = __webpack_require__(2);
var AddValue = __webpack_require__(3);
var ValuesList = __webpack_require__(5);
var Chart = __webpack_require__(4);
var SidePanel = __webpack_require__(8);

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


/***/ }),
/* 7 */
/***/ (function(module, exports) {


var div = document.createElement('div');

function getTemplateRootNode(scriptId) {
    var scriptTag = document.getElementById(scriptId);
    div.innerHTML = scriptTag.innerHTML;
    var result = div.children[0];
    div.removeChild(result);
    return result;
}

var templatesEngine = {
    Value: function (valueData) {
        var root = getTemplateRootNode('ValueTemplate');

        var timeSelector = root.querySelector('.js-values-list-item-time');
        var valueSelector = root.querySelector('.js-values-list-item-value');
        var removeSelector = root.querySelector('.js-values-list-item-remove');
        
        var time = valueData.time;
        var time_str = time.getMinutes() + ":" + time.getSeconds() + ":" + time.getMilliseconds();
        
        timeSelector.innerText = time_str;
        valueSelector.innerText = valueData.value;

        return {
            root: root,
            value: valueSelector,
            time: timeSelector,
            remove: removeSelector
        };
    }
};

module.exports = templatesEngine;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var extendConstructor = __webpack_require__(1);
var Eventable = __webpack_require__(0);

var SIDE_PANEL_BUTTON_LEFT_ID = 'left-side_panel-button';
var SIDE_PANEL_BUTTON_RIGHT_ID = 'right-side_panel-button';
var SIDE_PANEL_LEFT_ID = 'left-side_panel';
var SIDE_PANEL_RIGHT_ID = 'right-side_panel';

var ACTIVE_MODIFICATOR = '__active';
var HIDDEN_MODIFICATOR = '__hidden';

function SideBarConstructor() {
    
    this._left_button = document.getElementById(SIDE_PANEL_BUTTON_LEFT_ID); 
    this._right_button = document.getElementById(SIDE_PANEL_BUTTON_RIGHT_ID); 
    
    this._left_panel = document.getElementById(SIDE_PANEL_LEFT_ID);
    this._right_panel = document.getElementById(SIDE_PANEL_RIGHT_ID);
    
    this._left_panel_active = true;
    this._right_panel_active = true;
    
    this._left_button.addEventListener('click', this);
    this._right_button.addEventListener('click', this);
}

extendConstructor(SideBarConstructor, Eventable);

var sideBarConstructorPrototype = SideBarConstructor.prototype;



sideBarConstructorPrototype._transoform_panel = function(target) {
    
    
    if (target === this._left_button) { 
        this._left_panel_active = !this._left_panel_active;
        this._setPanelModificator(this._left_panel, this._left_panel_active);
    }
    else
    if (target === this._right_button) {
        this._right_panel_active = !this._right_panel_active;
        this._setPanelModificator(this._right_panel, this._right_panel_active);
    }

    
    
};

sideBarConstructorPrototype._setPanelModificator = function(panel, modificator) {
    if (modificator) {
        panel.classList.add(ACTIVE_MODIFICATOR);
        panel.classList.remove(HIDDEN_MODIFICATOR);
    } else {
        panel.classList.add(HIDDEN_MODIFICATOR);
        panel.classList.remove(ACTIVE_MODIFICATOR);
        
    }
    return this;
};

sideBarConstructorPrototype.handleEvent = function (e) {
    switch (e.type) {
        case 'click':
            this._transoform_panel(e.target);
            break;
    }
};

module.exports = SideBarConstructor;

/***/ })
/******/ ]);