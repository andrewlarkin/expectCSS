define('runner', ['vm', 'util', 'fs', 'styles', 'expect'], function(vm, util, fs, styles, Expect){
    var load = styles.load,
        expect = function(selector) { return new Expect(selector); };

    return function(spec) {
        fs.readFile(spec, 'ascii', function(err, data) {
            //var executeScript = vm.createScript(data);

            //executeScript.runInThisContext();
            //
            eval(data);
        });
    };
});
