"use strict";

var Qunit = require( 'qunit' );
var utils = require( '../test/src/app/utils-node.js' );

var zz = require( '../index.js' );
require( '../plugin-events.js' );

QUnit.test( 'trigger, on and off test', function( assert ) {
    // Test trigger, event using vanilla addEventListener
    // Use t14-1c as a counter of clicks
    zz( '#t14-1b' ).el.addEventListener( 
        'click', 
        function(){ 
            var current = parseInt( zz( '#t14-1c' ).text(), 10 );
            zz( '#t14-1c' ).text( ++current );
        } 
    );
    
    assert.equal( zz( '#t14-1c' ).text(), '0' );
    var id = zz( '#t14-1b' )
        .trigger( 'click' )
        .attr( 'id' );
    assert.equal( zz( '#t14-1c' ).text(), '1' );
    assert.equal( id, 't14-1b' );
    
    id = zz( '#t14-1b' )
        .trigger( 'click' )
        .attr( 'id' );
    assert.equal( zz( '#t14-1c' ).text(), '2' );
    assert.equal( id, 't14-1b' );
    
    // Test on/off using event name
    // Use t14-2c as a counter of clicks
    zz( '#t14-2b' ).on( 
        'click', 
        function(){ 
            var current = parseInt( zz( '#t14-2c' ).text(), 10 );
            zz( '#t14-2c' ).text( ++current );
        } 
    );
    
    assert.equal( zz( '#t14-2c' ).text(), '0' );
    zz( '#t14-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-2c' ).text(), '1' );
    
    zz( '#t14-2b' ).off( 'click' );
    zz( '#t14-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-2c' ).text(), '1' );
    
    // Test on/off using NO event name
    // Use t14-3c as a counter of clicks
    zz( '#t14-3b' ).on( 
        'click', 
        function(){ 
            var current = parseInt( zz( '#t14-3c' ).text(), 10 );
            zz( '#t14-3c' ).text( ++current );
        } 
    );
    
    assert.equal( zz( '#t14-3c' ).text(), '0' );
    zz( '#t14-3b' ).trigger( 'click' );
    assert.equal( zz( '#t14-3c' ).text(), '1' );
    
    zz( '#t14-3b' ).off();
    zz( '#t14-3b' ).trigger( 'click' );
    assert.equal( zz( '#t14-3c' ).text(), '1' );
    
    // Test on/off using event name and listener
    // Use t14-4c as a counter of clicks
    var t4Listener = function(){ 
        var current = parseInt( zz( '#t14-4c' ).text(), 10 );
        zz( '#t14-4c' ).text( ++current );
    };
    zz( '#t14-4b' ).on( 'click', t4Listener );
    
    assert.equal( zz( '#t14-4c' ).text(), '0' );
    zz( '#t14-4b' ).trigger( 'click' );
    assert.equal( zz( '#t14-4c' ).text(), '1' );
    
    zz( '#t14-4b' ).off( 'click', t4Listener );
    zz( '#t14-4b' ).trigger( 'click' );
    assert.equal( zz( '#t14-4c' ).text(), '1' );
    
    // Test on/off using event name and listener: 2 listeners
    // Use t14-5c as a counter of clicks
    var t5Listener1 = function(){ 
        var current = parseInt( zz( '#t14-5c' ).text(), 10 );
        zz( '#t14-5c' ).text( ++current );
    };
    zz( '#t14-5b' ).on( 'click', t5Listener1 );
    var t5Listener2 = function(){ 
        var current = parseInt( zz( '#t14-5c' ).text(), 10 );
        zz( '#t14-5c' ).text( 10 + current );
    };
    zz( '#t14-5b' ).on( 'click', t5Listener2 );
    
    assert.equal( zz( '#t14-5c' ).text(), '0' );
    zz( '#t14-5b' ).trigger( 'click' );
    assert.equal( zz( '#t14-5c' ).text(), '11' );
    
    zz( '#t14-5b' ).off( 'click', t5Listener2 );
    zz( '#t14-5b' ).trigger( 'click' );
    assert.equal( zz( '#t14-5c' ).text(), '12' );
    
    // Test on/off using event name and listener: 2 listeners from 2 different events
    // Use t14-6c as a counter of clicks
    var t6Listener1 = function(){ 
        var current = parseInt( zz( '#t14-6c' ).text(), 10 );
        zz( '#t14-6c' ).text( ++current );
    };
    zz( '#t14-6b' ).on( 'click', t6Listener1 );
    var t6Listener2 = function(){ 
        var current = parseInt( zz( '#t14-6c' ).text(), 10 );
        zz( '#t14-6c' ).text( 10 + current );
    };
    zz( '#t14-6b' ).on( 'focus', t6Listener2 );
    
    assert.equal( zz( '#t14-6c' ).text(), '0' );
    zz( '#t14-6b' ).trigger( 'click' );
    assert.equal( zz( '#t14-6c' ).text(), '1' );
    zz( '#t14-6b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-6c' ).text(), '11' );
    
    zz( '#t14-6b' ).off( 'focus', t6Listener2 );
    zz( '#t14-6b' ).trigger( 'click' );
    assert.equal( zz( '#t14-6c' ).text(), '12' );
    zz( '#t14-6b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-6c' ).text(), '12' );
    
    // Test on/off using event name: 2 listeners from 2 different events
    // Use t14-7c as a counter of clicks
    var t7Listener1 = function(){ 
        var current = parseInt( zz( '#t14-7c' ).text(), 10 );
        zz( '#t14-7c' ).text( ++current );
    };
    zz( '#t14-7b' ).on( 'click', t7Listener1 );
    var t7Listener2 = function(){ 
        var current = parseInt( zz( '#t14-7c' ).text(), 10 );
        zz( '#t14-7c' ).text( 10 + current );
    };
    zz( '#t14-7b' ).on( 'focus', t7Listener2 );
    
    assert.equal( zz( '#t14-7c' ).text(), '0' );
    zz( '#t14-7b' ).trigger( 'click' );
    assert.equal( zz( '#t14-7c' ).text(), '1' );
    zz( '#t14-7b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-7c' ).text(), '11' );
    
    zz( '#t14-7b' ).off( 'focus' );
    zz( '#t14-7b' ).trigger( 'click' );
    assert.equal( zz( '#t14-7c' ).text(), '12' );
    zz( '#t14-7b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-7c' ).text(), '12' );
    
    // Test on/off using NO event name: 2 listeners from 2 different events
    // Use t14-8c as a counter of clicks
    var t8Listener1 = function(){ 
        var current = parseInt( zz( '#t14-8c' ).text(), 10 );
        zz( '#t14-8c' ).text( ++current );
    };
    zz( '#t14-8b' ).on( 'click', t8Listener1 );
    var t8Listener2 = function(){ 
        var current = parseInt( zz( '#t14-8c' ).text(), 10 );
        zz( '#t14-8c' ).text( 10 + current );
    };
    zz( '#t14-8b' ).on( 'focus', t8Listener2 );
    
    assert.equal( zz( '#t14-8c' ).text(), '0' );
    zz( '#t14-8b' ).trigger( 'click' );
    assert.equal( zz( '#t14-8c' ).text(), '1' );
    zz( '#t14-8b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-8c' ).text(), '11' );
    
    zz( '#t14-8b' ).off();
    zz( '#t14-8b' ).trigger( 'click' );
    assert.equal( zz( '#t14-8c' ).text(), '11' );
    zz( '#t14-8b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-8c' ).text(), '11' );
    
    // Test on using data
    // Use t14-9c as a counter of clicks
    var t9Listener = function( e ){ 
        var current = parseInt( zz( '#t14-9c' ).text(), 10 );
        zz( '#t14-9c' ).text( current + e.data.delta );
    };
    zz( '#t14-9b' ).on( 
        'click', 
        t9Listener, 
        {
            delta: 42
        } 
    );
    
    assert.equal( zz( '#t14-9c' ).text(), '0' );
    zz( '#t14-9b' ).trigger( 'click' );
    assert.equal( zz( '#t14-9c' ).text(), '42' );
    zz( '#t14-9b' ).trigger( 'click' );
    assert.equal( zz( '#t14-9c' ).text(), '84' );
});
