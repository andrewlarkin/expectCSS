var ExpectCSS = (function(){

    var ExpectCSS = {

        load: function(path) {

        },

        verify: function(elementString) {
            var classes, id, attrs, attrValue, tempAttr, attrObj = {}, testObj, i;

            //Gets the class names from the string
            classes = elementString.match(/\.[A-Za-z]*/g);

            if (classes) {
                for (i = 0; i < classes.length; i += 1){
                    elementString = elementString.replace(classes[i], ''); //strip out the class names from the string
                }

                classes = classes.join(' ');
                classes = classes.replace(/\./g, ''); //strip out the '.'
                attrObj.className = classes;
            }

            //Gets the id tag from the string
            id = elementString.match(/#[A-Za-z]*/);

            if (id) {
                id = id.toString(); //convert array to string

                elementString = elementString.replace(id, '');

                id = id.replace('#', '');
                attrObj.id = id;
            }

            //Gets the attribute selectors from the string
            attrs = elementString.match(/\[([^\]]*)\]/g);

            //iterate through attributes
            if (attrs) {
                for (i = 0; i < attrs.length; i += 1){
                    //remove the attribute from the element string
                    elementString = elementString.replace(attrs[i], '');
                    //strip brackets and quotes
                    attrs[i] = attrs[i].replace(/[\[\]"']/g, '');

                    if (attrs[i].match('~=')) {
                        tempAttr = attrs[i].split(/~=/);
                        attrValue = !(tempAttr[1]);
                    } else if (attrs[i].match(/\|=/)) {
                        tempAttr = attrs[i].split('|=');
                        attrValue = tempAttr[1];
                    } else {
                        tempAttr = attrs[i].split('=');
                        attrValue = tempAttr[1] || true;;
                    }

                    //if value, assign it to property
                    //else assign property as true
                    attrObj[tempAttr[0]] = attrValue;
                }
            }

            elementString = (elementString === '') ? 'div' : elementString;

            //Gets attribute names from the string
            testObj = document.createElement(elementString);

            var attr;
            for (attr in attrObj) {
                testObj[attr] = attrObj[attr];
            }

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
//
//possible pseudo-classes to consider: 
//  first-child
//  first-line
//  first-letter
//  hover
//  active
//  link
//  visited
//  before
//  after
//  lang
//
//and attributes to cosider:
//  [foo]
//  [foo="bar"]
//  [foo~="bar"]
//  [foo|="bar"]
//
//also consider:
//  E F (decendant)
//  E > F (child)
//  E + F (adjacent siblings)
//  *
//
//
