var extendConstructor = require('../utils/extendConstructor');
var Eventable = require('../modules/Eventable');

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