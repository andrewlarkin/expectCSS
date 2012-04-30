var ExpectCSS = (function(){

    var ExpectCSS = {

        load: function(path) {

        },

        verify: function(elementString) {
            var classes, id, testObj, i;

            //Gets the class names from the string
            classes = elementString.match(/\.[A-Za-z]*/g);

            if (classes) {
                for (i = 0; i < classes.length; i += 1){
                    elementString = elementString.replace(classes[i], ''); //strip out the class names from the string
                }

                classes = classes.join(' ');
                classes = classes.replace(/\./g, ''); //strip out the '.'
            }

            //Gets the id tag from the string
            id = elementString.match(/#[A-Za-z]*/);

            if (id) {
                id = id.toString();

                elementString = elementString.replace(id, '');

                id = id.replace('#', '');
            }

            //Gets attribute names from the string


            testObj = document.createElement(elementString);

            testObj.className = classes;
            testObj.id = id;

            return testObj;
        }
    };

    return ExpectCSS;
})();

//it should load all CSS docmuents into the DOM
//
//it should look at each test and create an element with the appropriate attributes
//for example: if the test is #someId div.someClass then it should create the element:
//  <div id="someId"><div class="someClass"></div></div>
//
//  verify('div.someClass #someId').toBe({ display: 'none', border: '1px solid #000'});
//
//Need to be able to handle attributes
//Need to validate nested properties
