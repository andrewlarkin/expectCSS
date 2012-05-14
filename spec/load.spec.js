var requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'src/lib',
    nodeRequire: require
});

requirejs(['load', 'styles'], function(load, styles){
    var testFile = 'src/examples/test.css';

    describe('When loading a css file..', function(){
        it('should return false if the path name is not a css file', function(){
            expect(load('someFileName')).toBe(false);
        });

        it('should create a style object', function(){
            load(testFile);
        });

    });
});
