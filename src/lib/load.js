define('load', ['fs', 'styles'], function(fs, styles){

    var trim = function(string){  //trim whitespace
        return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    },

    buildRules = function(data){
        var i = 0, j, length = data.length,
            rule, properties,
            bracketPos = 0;

        while (bracketPos !== -1) {
            bracketPos = data.indexOf('{');
            if (bracketPos === -1) {
                break;
            } else {
                rule = data.slice(i, bracketPos);

                rule = trim(rule);

                console.log('*' + rule + '*');

                i = bracketPos + 1;
                bracketPos = data.indexOf('}');

                properties = splitProperties(data.slice(i, bracketPos));

                for (j = 0; j < properties.length; j += 1) {
                    console.log(properties[j].property + ': ' + properties[j].value);
                    styles.set(rule, properties[j].property, properties[j].value);
                }
                //remove the parsed rule from the data string
                data = data.substr(bracketPos + 1);

                i = 0;
                bracketPos = 0;
            }
        }
    },

    splitProperties = function(data) {
       var i, length, keyValue,
            properties = [];

        data = data.split(';');
        length = data.length;

        for (i = 0; i < length; i += 1) {
            data[i] = trim(data[i]);

            if (!!data[i]) {
                keyValue = data[i].split(':');

                keyValue[0] = trim(keyValue[0]);
                keyValue[1] = trim(keyValue[1]);

                properties.push({property: trim(keyValue[0]), value: trim(keyValue[1])});
            }
        }

        return properties;
    };

    var load = function(cssPath){

        if (!cssPath.match('.css')) {
            return false;
        }

        fs.readFile(cssPath, 'ascii', function(err, data){
            if (err) throw err;
            //if file is present
            //strip out all comments
            data = data.replace(/\/\*.*\*\//, '');
            console.log(data);

            //build the style object with all appropriate rules
            buildRules(data);

            //once loaded, it triggers an event indicating that the file has been loaded;
        });
    };

    return load;
});
