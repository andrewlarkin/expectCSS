var requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'src/lib',
    nodeRequire: require
});

requirejs(['rule'], function(Rule){
    describe('Rule', function(){
        var selector, properties, ruleInstance;

        beforeEach(function(){
            selector = '.someClass';

            ruleInstance = new Rule(selector);
        });

        describe('When instantiating a new Rule...', function() {
            it('sets the name of the rule to the selector', function(){
                expect(ruleInstance.name).toBe(selector);
            });
        });

        describe('When setting a property...', function(){
            it('stores the value with the property as a key', function(){
                ruleInstance.setProperty('display', 'block');

                expect(ruleInstance.styles.display).toBe('block');
            });
        });

        describe('When getting a property...', function(){
            beforeEach(function(){
                ruleInstance.setProperty('display', 'block');
            });

            it('retrieves the value of the property specified', function(){
                expect(ruleInstance.getProperty('display')).toBe('block');
            });
        });

        describe('When building style properties...', function(){
            beforeEach(function(){
                properties = 'display: block; background-color: white;';
            });

            it('sets a property for each value in the appropriately formatted string', function(){
                ruleInstance.buildProperties(properties);

                expect(ruleInstance.getProperty('display')).toBe('block');
                expect(ruleInstance.getProperty('background-color')).toBe('white');
            });
        });
    });
});
