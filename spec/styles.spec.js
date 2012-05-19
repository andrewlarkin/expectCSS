var requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'src/lib',
    nodeRequire: require
});

requirejs(['styles'], function(styles){
    var testFile = 'src/examples/test.css';

    describe('Styles', function() {
        beforeEach(function(){
            spyOn(console, 'log');
        });

        describe('When loading a css file..', function(){
            it('should log an error if an invalid file is loaded', function(){
                styles.load('someFileName');

                expect(console.log).toHaveBeenCalledWith('File must be a valid CSS file');
            });

            xit('should throw an exception if the file cannot be found', function(){
                asyncSpecWait();
                expect(styles.load.bind(styles, 'someFileName.css')).toThrow('Cannot find file');
            });

            xit('should create a style object', function(){
                styles.load(testFile);
            });

        });
    });
});
