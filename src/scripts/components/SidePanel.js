var extendConstructor = require('../utils/extendConstructor');
var Eventable = require('../modules/Eventable');

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