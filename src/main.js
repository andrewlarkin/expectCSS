var requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'src/lib',
    nodeRequire: require
});

requirejs(['runner', 'observer'], function(runner, observer){
    console.log('-----------------------------------------');
    console.log('Expect CSS - CSS expectation validation\n');
    console.log('-----------------------------------------');

    runner(process.argv[2]);

    console.log('\n-----------------------------------------\n');

    //load spec based on args passed into script call (proccess.argv)
});
