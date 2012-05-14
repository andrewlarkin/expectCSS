var requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'lib',
    nodeRequire: require
});

requirejs([], function(){
    //load spec based on args passed into script call (proccess.argv)
});
