define('styles', function(){
    var cachedStyles = {};

    var styles = {
        set: function(rule, property, value){
            cachedStyles[rule] = cachedStyles[rule] || {};

            cachedStyles[rule][property] = value;
        },

        get: function(rule){
            return cachedStyles[rule];
        }
    };

    return styles;
});
