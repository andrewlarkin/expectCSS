var requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'src/lib',
    nodeRequire: require
});

requirejs(['runner', 'observer'], function(runner, observer){

    runner(process.argv[2]);

    //load spec based on args passed into script call (proccess.argv)
});
