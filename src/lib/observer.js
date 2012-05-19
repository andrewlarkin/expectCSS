define('observer', ['events', 'util'], function(events, util) {
    var Observer = function(){
        events.EventEmitter.call(this);
    };

    util.inherits(Observer, events.EventEmitter);

    return new Observer();
});
