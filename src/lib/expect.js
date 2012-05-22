define('expect', ['styles', 'observer'], function(styles, observer) {

    var expect = function(selector, tests) {
        this.selector = selector;

        var self = this;

        observer.on('cssLoaded', function(){
            var match;
            //create a collection of possible matches.
            self.matches = styles.match(selector);

            observer.emit('expectReady');

            observer.removeAllListeners('expectReady');
        });
    };

    expect.prototype = {

        toHaveProperties: function(properties) {
            var self = this;

            observer.on('expectReady', function(){

                var property, passed = false, propCheck, partialMatch = false,
                    additionalMatches = [];

                for (var j = 0; j < self.matches.length; j += 1) {

                    for (property in properties) {

                        partialMatch = partialMatch || !!self.matches[j].styles[property];

                        if ((propCheck || typeof propCheck === 'undefined') && partialMatch) {
                            propCheck = (self.matches[j].styles[property] === properties[property]);
                        }
                    }

                    if (propCheck && !passed) {
                        passed = true;
                    } else if (passed && partialMatch) {
                        additionalMatches.push(self.matches[j]);
                    }

                }

                if (passed) {
                    console.log('\033[32m ' + self.selector + ' has the expected properties\n');
                    if (additionalMatches.length) {
                        console.log('\033[31m but is partially overridden by the rules:\033[0m');
                        for (var i = 0; i < additionalMatches.length; i += 1) {
                            console.log('    ' + additionalMatches[i].name);
                        }
                    }
                } else {
                    console.log('\033[31m' + self.selector + ' will not have the expected properties');
                }
            });
        },

        toHaveProperty: function(property, value) {
            return false;
        },

        toBeOverridden: function(){
            return false;
        },

        not: function(test) {
            return !test(); //negates the outcome of whatever test is passed in
        }

    };

    return expect;
});
