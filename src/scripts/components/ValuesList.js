var Eventable = require('../modules/Eventable');
var extendConstructor = require('../utils/extendConstructor');

var Value = require('../components/Value');

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

