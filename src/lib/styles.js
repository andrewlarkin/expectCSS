define('styles', ['fs', 'observer', 'rule'], function(fs, observer, Rule){

    var trim = function(string){  //trim whitespace
            if (string && string !== '') {
                return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            }
        };

    var styles = {

        store: function(rule) {
            this.rules[rule.name] = rule;
        },

        retrieve: function(selector){
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

                //TODO: Instead of stripping out comments, parse them for tests, then strip them out.
                data = data.replace(/\/\*.*\*\//, '');

                observer.emit('cssLoaded', data);
            });
        },

        parse: function(data){
            var penBracketPos, closeBracketPos,
                selector, rule;

            openBracketPos = data.indexOf('{');
            closeBracketPos = data.indexOf('}');

            while (openBracketPos !== -1 && closeBracketPos !== -1) {

                if (penBracketPos > closeBracketPos) {
                    break;
                }

                selector = trim(data.slice(0, openBracketPos));

                rule = this.retrieve(selector) || new Rule(selector); //This needs to be changed to create a new Rule instance

                rule.buildProperties(data.slice(openBracketPos + 1, closeBracketPos));

                    //set rule
                this.store(rule);
                    //strip out this rule
                data = data.substr(closeBracketPos + 1);
                    //update bracket pos
                openBracketPos = data.indexOf('{');
                closeBracketPos = data.indexOf('}');
            };
        },

        match: function(selector) {
            var selectorSegments = selector.split(' '),
                segmentsLength = selectorSegments.length,
                ruleSegments,
                ruleSegmentsLength,
                matches = [],
                bestMatch,
                ruleName,
                i, j;

            for (ruleName in this.rules) {
                ruleSegments = ruleName.split(' ');
                ruleSegmentsLength = ruleSegments.length;

                if (selectorSegments[segmentsLength - 1] !== ruleSegments[ruleSegmentsLength - 1]) {
                    continue;
                }

                //TODO: need to check the last segment for specificity
                matches.push(this.rules[ruleName]);
            }

            return matches;
        },

        reset: function(){
            this.rules = {};
        }
    };

    observer.on('cssLoaded', function(data){
        styles.parse(trim(data));
    });

    return styles;
}); 
