var requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'src/lib',
    nodeRequire: require
});

requirejs(['styles', 'observer', 'rule'], function(styles, observer, Rule){
    var testFile = 'src/examples/test.css';

    describe('Styles', function() {

        describe('When loading a css file..', function(){
            beforeEach(function(){
                spyOn(console, 'log');
            });

            it('should log an error if an invalid file is loaded', function(){
                styles.load('someFileName');

                expect(console.log).toHaveBeenCalledWith('File must be a valid CSS file');
            });

            it('should log an error if the file cannot be found', function(){
                styles.load('someFileName.css');
                waits(100);
                runs(function(){
                    expect(console.log).toHaveBeenCalledWith('Unable to locate someFileName.css');
                });
            });

            it('should emit a cssLoaded event and call parseCss method if a valid file is loaded', function(){
                var test;

                observer.on('cssLoaded', function(data){
                    test = data;
                });

                spyOn(styles, 'parse');

                styles.load(testFile);

                waits(100);

                runs(function(){
                    expect(test).not.toBeUndefined();
                    expect(styles.parse).toHaveBeenCalled();
                });
            });

            it('trims whitespace from the data before parsing it', function(){
                spyOn(styles, 'parse');

                observer.emit('cssLoaded', '   some string    ');

                expect(styles.parse).toHaveBeenCalledWith('some string');
            });
        });

        describe('While resetting the styles module...', function(){
            it('clears all styles when the reset method is called', function(){
                var someRule = new Rule('someRule'),
                    anotherRule = new Rule('anotherRule');
                styles.store(someRule);
                styles.store(anotherRule);

                expect(styles.retrieve('someRule')).toBe(someRule);
                expect(styles.retrieve('anotherRule')).toBe(anotherRule);

                styles.reset();

                expect(styles.retrieve('someRule')).toBeUndefined();
                expect(styles.retrieve('anotherRule')).toBeUndefined();
            });
        });

        describe('While parsing the css string...', function(){
            var cssString;

            beforeEach(function(){
                cssString = '.someClass {' +
                                'display: none;' +
                                'background: transparent;' +
                            '}';

            });

            afterEach(function(){
                styles.reset();
            });

            it('does not loop infinitely if there are no brackets in the string', function(){
                expect(styles.parse('no brackets')).toBeUndefined();
            });

            it('gets a selector string if the rule is well-formed (has brackets)', function(){
                spyOn(styles, 'retrieve');

                styles.parse(cssString);

                expect(styles.retrieve).toHaveBeenCalledWith('.someClass');
            });

            describe('...but the rule does not yet exist...', function(){
                it('creates a new instance of the Rule class', function(){
                    expect(styles.retrieve('someClass')).toBeUndefined();

                    styles.parse(cssString);

                    expect(styles.retrieve('.someClass')).not.toBeUndefined();
                });
            });

        });

        describe('When storing a rule...', function(){
            it('stores a rule using the rule name as a key', function(){
                var rule = new Rule('.someClass');

                styles.store(rule);

                expect(styles.retrieve('.someClass')).toBe(rule);
            });
        });
    });
});
