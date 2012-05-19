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

                spyOn(styles, 'parseCss');

                styles.load(testFile);

                waits(100);

                runs(function(){
                    expect(test).not.toBeUndefined();
                    expect(styles.parseCss).toHaveBeenCalled();
                });
            });

            it('trims whitespace from the data before parsing it', function(){
                spyOn(styles, 'parseCss');

                observer.emit('cssLoaded', '   some string    ');

                expect(styles.parseCss).toHaveBeenCalledWith('some string');
            });
        });

        describe('While parsing the css string...', function(){
            var cssString = '.someClass {' +
                                'display: none;' +
                                'background: transparent;' +
                            '}';

            it('does not loop infinitely if there are no brackets in the string', function(){
                expect(styles.parseCss('no brackets')).toBeUndefined();
            });

            it('gets a selector string if the rule is well-formed (has brackets)', function(){
                spyOn(styles, 'getRule');

                styles.parseCss(cssString);

                expect(styles.getRule).toHaveBeenCalledWith('.someClass');
            });

            describe('...but the rule does not yet exist...', function(){
                it('creates a new instance of the Rule class', function(){
                    
                });
            });
        });

        //TODO: Test setter
        //
        //TODO: Test getter
    });
});
