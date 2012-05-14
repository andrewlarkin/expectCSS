//TODO: convert these tests to work with jasmine-node
xdescribe('Expect CSS', function(){

    describe('When attempting to verify a css rule', function(){
        it('creates a DOM element which can be verified', function(){
            var testObjString = "div";

            expect(ExpectCSS.verify(testObjString).tagName).toBe('DIV');
        });

        it('creates a DOM element of type DIV if no tag type is provided', function(){
            var testObjString = '.someClass',
                testObj = ExpectCSS.verify(testObjString);

            expect(testObj.tagName).toBe('DIV');
        });

        it('adds a class to the element if one is provided', function(){
            var testObjString = 'div.someClass',
                testObj = ExpectCSS.verify(testObjString);

            expect(testObj.tagName).toBe('DIV');
            expect(testObj.className).toBe('someClass');
        });

        it('adds multiple classes to the element if multiple classes are provided', function(){
            var testObjString = 'div.someClass.anotherClass',
                testObj = ExpectCSS.verify(testObjString);

            expect(testObj.tagName).toBe('DIV');
            expect(testObj.className).toBe('someClass anotherClass');
        });


        it('adds an id tag to the element if one is provided', function(){
            var testObjString = 'div#someId',
                testObj = ExpectCSS.verify(testObjString);

            expect(testObj.tagName).toBe('DIV');
            expect(testObj.id).toBe('someId');
        });

        it('adds both an id and a class tag if they are both present', function(){
            var testObjString = 'div#someId.someClass',
                testObj = ExpectCSS.verify(testObjString);

            expect(testObj.tagName).toBe('DIV');
            expect(testObj.id).toBe('someId');
            expect(testObj.className).toBe('someClass');

        });

        it('adds the appropriate attribute foo with the property "bar" if [foo="bar"] is present', function(){
            var testObjString = 'div[foo="bar"]',
                testObj = ExpectCSS.verify(testObjString);

            expect(testObj.foo).toBe('bar');
        });

        it('adds the appropriate attributes with the appropriate properties if multiple attributes are present', function(){
            var testObjString = 'div[foo="bar"][fooToo="barToo"]',
                testObj = ExpectCSS.verify(testObjString);

            expect(testObj.foo).toBe('bar');
            expect(testObj.fooToo).toBe('barToo');
        });

        it('sets the appropriate attribute to false if [foo~="bar"] is present', function(){
            var testObj = ExpectCSS.verify('div[foo~="bar"]');

            expect(testObj.foo).not.toBe('bar');
            expect(testObj.foo).toBe(false);
        });

        it('sets the appropriate attribute to "bar" if [foo|="bar"] is present', function(){
            var testObj = ExpectCSS.verify('div[foo|="bar"]');

            expect(testObj.foo).toBe('bar');
        });

    });

    describe('When loading a css document...', function(){
        it('loads the styles', function(){
            ExpectCSS.load('test.css');

            var element = document.createElement('div');
            element.className = 'test';

            print(document.readUrl);
            print(window.getComputedStyle(element, null).getPropertyValue('backgroundColor'));
        });
    });

});
