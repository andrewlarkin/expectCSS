define('rule', function(){
    //TODO: promote this to a utility class
    var trim = function(string){  //trim whitespace
            return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        };

    //A class to generate a rule object, which can be modified to add new properties and verify against expected properties
    var Rule = function(selector) {

        this.name = selector;

        //TODO: add verification for valid CSS properties
        this.styles = {};

        this.setProperty = function(property, value){
            //TODO: set warning if a property is overwritten
            //TODO: set 'sub-properties' such as border-width, border-weight, etc
            this.styles[property] = value;
        };

        this.getProperty = function(property) {
            return this.styles[property];
        };

        //takes a string and builds out properties
        this.buildProperties = function(data){
            var i, length, property;

            data = data.split(';');
            length = data.length;

            for (i = 0; i < length; i += 1) {
                if (data[i] !== '') {
                    property = data[i].split(':');
                    //TODO: Add verification that this is a valid property

                    this.setProperty(trim(property[0]), trim(property[1]));
                }
            }
        };
    };

    return Rule;

});
