var Eventable = require('../modules/Eventable');
var extendConstructor = require('../utils/extendConstructor');
var templatesEngine = require('../modules/templatesEngine');

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