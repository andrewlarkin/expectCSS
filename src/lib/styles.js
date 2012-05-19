define('styles', ['fs', 'observer', 'rule'], function(fs, observer, Rule){

    var trim = function(string){  //trim whitespace
            return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        };

    var styles = {

        setRule: function(selector, rule) {
            this.rules[selector] = rule;
        },

        getRule: function(selector){
            return this.rules[selector]; //each rule object should be a class...
        },

        rules: {},

        load: function(path) {
            if (!path.match('.css')) {
                console.log('File must be a valid CSS file');
                return;
            }

            fs.readFile(path, 'ascii', function(err, data) {
                if (err) {
                    console.log('Unable to locate ' + path);
                    return;
                }

                observer.emit('cssLoaded', data);
            });
        },

        parseCss: function(data){
            var penBracketPos, closeBracketPos,
                selector, rule;

            openBracketPos = data.indexOf('{');
            closeBracketPos = data.indexOf('}');

            while (openBracketPos !== -1 && closeBracketPos !== -1) {

                if (penBracketPos > closeBracketPos) {
                    break;
                }

                selector = trim(data.slice(0, openBracketPos));

                rule = this.getRule(selector) || new Rule(selector); //This needs to be changed to create a new Rule instance

                rule.buildProperties(data.slice(openBracketPos + 1, closeBracketPos));

                    //set rule
                this.setRule(selector, rule);
                    //strip out this rule
                data = data.substr(closeBracketPos + 1);
                    //update bracket pos
                openBracketPos = data.indexOf('{');
                closeBracketPos = data.indexOf('}');
            };

        }
    };

    observer.on('cssLoaded', function(data){
        styles.parseCss(trim(data));
    });

    return styles;
}); 
