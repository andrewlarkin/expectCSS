define('styles', ['fs', 'observer'], function(fs, observer){

    var cachedStyles = {},

        trim = function(string){  //trim whitespace
            return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        };

    var styles = {
        set: function(rule, property, value){
            cachedStyles[rule] = cachedStyles[rule] || {};

            cachedStyles[rule][property] = value;
        },

        get: function(rule){
            return cachedStyles[rule];
        },

        load: function(path) {
            if (!path.match('.css')) {
                console.log('File must be a valid CSS file');
                return;
            }

            fs.readFile(path, 'ascii', function(err, data) {
                if (err) {
                    console.log(err);
                    throw err;
                }

                observer.emit('cssLoaded');
            });
        },

        parseCss: function(){
            return false;
        }
    };

    observer.on('cssLoaded', function(data){
        styles.parseCss(trim(data));
    });

    return styles;
}); 
