load('src/examples/test.css');

expect('.someClass').
    toHaveProperties({
        display: 'block',
        color: 'white'
    }).toBeOverridden();
    
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
