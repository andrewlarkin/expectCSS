requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'src/lib',
    nodeRequire: require
});

requirejs(['observer'], function(observer) {

    describe('Observer', function() {
        describe('When the observer module is loaded...', function(){
            it('should be an extension of the events module', function(){
                expect(observer.on).not.toBeUndefined();
            });

            it('should be a singleton (instantiating a new instance should return the same instance)', function(){
                var newObserver;

                requirejs(['observer'], function(o) {
                    newObserver = o;
                });

                expect(newObserver).toBe(observer);
            });
        });

        describe('When setting an event...', function(){
            it('should set an event that can be emitted', function(){
                var test;

                observer.on('someEvent', function(data) {
                    test = data;
                });

                observer.emit('someEvent', 'true');

                expect(test).toBe('true');
            });
        });
    });
});
