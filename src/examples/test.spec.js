load('src/examples/test.css');

expect('.someClass').
    toHaveProperties({
        display: 'none',
        color: 'white'
    });
    
/*
expect('.someClass', function(){
    toHaveProperties({
        display: 'block',
        color: 'white'
    });

    toBeOverridden();

    toHaveProperty('display', 'block');

});

expect('div.someClass .someOtherClass', function(){
    not(toBeOverridden);
}); */
