
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