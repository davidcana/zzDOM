"use strict";

var Qunit = require( 'qunit' );
var utils = require( '../test/src/app/utils-node.js' );

var zz = require( '../index.js' );
require( '../plugin-events.js' );

QUnit.test( 'trigger, on and off test', function( assert ) {
    // Use t14-1-1c as a counter of clicks
    zz( '#t14-1-1b' ).el.addEventListener( 
        'click', 
        function(){ 
            var current = parseInt( zz( '#t14-1-1c' ).text(), 10 );
            zz( '#t14-1-1c' ).text( ++current );
        } 
    );
    zz( '#t14-1-2b' ).el.addEventListener( 
        'click', 
        function(){ 
            var current = parseInt( zz( '#t14-1-2c' ).text(), 10 );
            zz( '#t14-1-2c' ).text( ++current );
        } 
    );
    
    assert.equal( zz( '#t14-1-1c' ).text(), '0' );
    assert.equal( zz( '#t14-1-2c' ).text(), '0' );
    var ids = [];
    zz( '.t14-1' )
        .trigger( 'click' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't14-1-1b', 't14-1-2b' ] );
    assert.equal( zz( '#t14-1-1c' ).text(), '1' );
    assert.equal( zz( '#t14-1-2c' ).text(), '1' );
    zz( '#t14-1-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-1-1c' ).text(), '1' );
    assert.equal( zz( '#t14-1-2c' ).text(), '2' );
    ids = [];
    zz( '.t14-1' )
        .trigger( 'click' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't14-1-1b', 't14-1-2b' ] );
    assert.equal( zz( '#t14-1-1c' ).text(), '2' );
    assert.equal( zz( '#t14-1-2c' ).text(), '3' );
    
    // Test on/off using event name
    // Use t14-2c as a counter of clicks
    zz( '.t14-2' ).on( 
        'click', 
        function(){ 
            var current = parseInt( zz( '#t14-2c' ).text(), 10 );
            zz( '#t14-2c' ).text( ++current );
        } 
    );
    
    assert.equal( zz( '#t14-2c' ).text(), '0' );
    zz( '#t14-2-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-2c' ).text(), '1' );
    zz( '#t14-2-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-2c' ).text(), '2' );
    
    zz( '.t14-2' ).off( 'click' );
    zz( '#t14-2-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-2c' ).text(), '2' );
    zz( '#t14-2-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-2c' ).text(), '2' );
    
    // Test on/off using NO event name
    // Use t14-3c as a counter of clicks
    zz( '.t14-3' ).on( 
        'click', 
        function(){ 
            var current = parseInt( zz( '#t14-3c' ).text(), 10 );
            zz( '#t14-3c' ).text( ++current );
        } 
    );
    
    assert.equal( zz( '#t14-3c' ).text(), '0' );
    zz( '#t14-3-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-3c' ).text(), '1' );
    zz( '#t14-3-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-3c' ).text(), '2' );
    
    zz( '.t14-3' ).off();
    zz( '#t14-3-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-3c' ).text(), '2' );
    zz( '#t14-3-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-3c' ).text(), '2' );
    
    // Test on/off using event name and listener
    // Use t14-4c as a counter of clicks
    var t4Listener = function(){ 
        var current = parseInt( zz( '#t14-4c' ).text(), 10 );
        zz( '#t14-4c' ).text( ++current );
    };
    zz( '.t14-4' ).on( 'click', t4Listener );
    
    assert.equal( zz( '#t14-4c' ).text(), '0' );
    zz( '#t14-4-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-4c' ).text(), '1' );
    zz( '#t14-4-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-4c' ).text(), '2' );
    
    zz( '.t14-4' ).off( 'click', t4Listener );
    zz( '#t14-4-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-4c' ).text(), '2' );
    zz( '#t14-4-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-4c' ).text(), '2' );
    
    // Test on/off using event name and listener: 2 listeners
    // Use t14-5c as a counter of clicks
    var t5Listener1 = function(){ 
        var current = parseInt( zz( '#t14-5c' ).text(), 10 );
        zz( '#t14-5c' ).text( ++current );
    };
    var t5Listener2 = function(){ 
        var current = parseInt( zz( '#t14-5c' ).text(), 10 );
        zz( '#t14-5c' ).text( 10 + current );
    };
    zz( '.t14-5-1' ).on( 'click', t5Listener1 );
    zz( '.t14-5-2' ).on( 'click', t5Listener2 );
    
    assert.equal( zz( '#t14-5c' ).text(), '0' );
    zz( '#t14-5-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-5c' ).text(), '1' );
    zz( '#t14-5-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-5c' ).text(), '2' );
    zz( '#t14-5-3b' ).trigger( 'click' );
    assert.equal( zz( '#t14-5c' ).text(), '12' );
    zz( '#t14-5-4b' ).trigger( 'click' );
    assert.equal( zz( '#t14-5c' ).text(), '22' );
    
    zz( '.t14-5-2' ).off( 'click', t5Listener2 );
    zz( '#t14-5-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-5c' ).text(), '23' );
    zz( '#t14-5-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-5c' ).text(), '24' );
    zz( '#t14-5-3b' ).trigger( 'click' );
    assert.equal( zz( '#t14-5c' ).text(), '24' );
    zz( '#t14-5-4b' ).trigger( 'click' );
    assert.equal( zz( '#t14-5c' ).text(), '24' );
    
    zz( '.t14-5-1' ).off( 'click', t5Listener1 );
    zz( '#t14-5-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-5c' ).text(), '24' );
    zz( '#t14-5-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-5c' ).text(), '24' );
    zz( '#t14-5-3b' ).trigger( 'click' );
    assert.equal( zz( '#t14-5c' ).text(), '24' );
    zz( '#t14-5-4b' ).trigger( 'click' );
    assert.equal( zz( '#t14-5c' ).text(), '24' );
    
    // Test on/off using event name and listener: 2 listeners from 2 different events
    // Use t14-6c as a counter of clicks
    var t6Listener1 = function(){ 
        var current = parseInt( zz( '#t14-6c' ).text(), 10 );
        zz( '#t14-6c' ).text( ++current );
    };
    var t6Listener2 = function(){ 
        var current = parseInt( zz( '#t14-6c' ).text(), 10 );
        zz( '#t14-6c' ).text( 10 + current );
    };
    zz( '.t14-6-1' ).on( 'click', t6Listener1 );
    zz( '.t14-6-2' ).on( 'focus', t6Listener2 );
    
    assert.equal( zz( '#t14-6c' ).text(), '0' );
    zz( '#t14-6-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-6c' ).text(), '1' );
    zz( '#t14-6-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-6c' ).text(), '2' );
    zz( '#t14-6-3b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-6c' ).text(), '12' );
    zz( '#t14-6-4b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-6c' ).text(), '22' );
    
    zz( '.t14-6-2' ).off( 'focus', t6Listener2 );
    zz( '#t14-6-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-6c' ).text(), '23' );
    zz( '#t14-6-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-6c' ).text(), '24' );
    zz( '#t14-6-3b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-6c' ).text(), '24' );
    zz( '#t14-6-4b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-6c' ).text(), '24' );
    
    zz( '.t14-6-1' ).off( 'click', t6Listener1 );
    zz( '#t14-6-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-6c' ).text(), '24' );
    zz( '#t14-6-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-6c' ).text(), '24' );
    zz( '#t14-6-3b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-6c' ).text(), '24' );
    zz( '#t14-6-4b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-6c' ).text(), '24' );
    
    // Test on/off using event name: 2 listeners from 2 different events
    // Use t14-7c as a counter of clicks
    var t7Listener1 = function(){ 
        var current = parseInt( zz( '#t14-7c' ).text(), 10 );
        zz( '#t14-7c' ).text( ++current );
    };
    var t7Listener2 = function(){ 
        var current = parseInt( zz( '#t14-7c' ).text(), 10 );
        zz( '#t14-7c' ).text( 10 + current );
    };
    zz( '.t14-7-1' ).on( 'click', t7Listener1 );
    zz( '.t14-7-2' ).on( 'focus', t7Listener2 );
    
    assert.equal( zz( '#t14-7c' ).text(), '0' );
    zz( '#t14-7-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-7c' ).text(), '1' );
    zz( '#t14-7-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-7c' ).text(), '2' );
    zz( '#t14-7-3b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-7c' ).text(), '12' );
    zz( '#t14-7-4b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-7c' ).text(), '22' );
    
    zz( '.t14-7-2' ).off( 'focus' );
    zz( '#t14-7-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-7c' ).text(), '23' );
    zz( '#t14-7-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-7c' ).text(), '24' );
    zz( '#t14-7-3b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-7c' ).text(), '24' );
    zz( '#t14-7-4b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-7c' ).text(), '24' );
    
    zz( '.t14-7-1' ).off( 'click' );
    zz( '#t14-7-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-7c' ).text(), '24' );
    zz( '#t14-7-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-7c' ).text(), '24' );
    zz( '#t14-7-3b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-7c' ).text(), '24' );
    zz( '#t14-7-4b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-7c' ).text(), '24' );
    
    // Test on/off using NO event name: 2 listeners from 2 different events
    // Use t14-8c as a counter of clicks
    var t8Listener1 = function(){ 
        var current = parseInt( zz( '#t14-8c' ).text(), 10 );
        zz( '#t14-8c' ).text( ++current );
    };
    var t8Listener2 = function(){ 
        var current = parseInt( zz( '#t14-8c' ).text(), 10 );
        zz( '#t14-8c' ).text( 10 + current );
    };
    zz( '.t14-8-1' ).on( 'click', t8Listener1 );
    zz( '.t14-8-2' ).on( 'focus', t8Listener2 );
    
    assert.equal( zz( '#t14-8c' ).text(), '0' );
    zz( '#t14-8-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-8c' ).text(), '1' );
    zz( '#t14-8-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-8c' ).text(), '2' );
    zz( '#t14-8-3b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-8c' ).text(), '12' );
    zz( '#t14-8-4b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-8c' ).text(), '22' );
    
    zz( '.t14-8-2' ).off();
    zz( '#t14-8-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-8c' ).text(), '23' );
    zz( '#t14-8-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-8c' ).text(), '24' );
    zz( '#t14-8-3b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-8c' ).text(), '24' );
    zz( '#t14-8-4b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-8c' ).text(), '24' );
    
    zz( '.t14-8-1' ).off();
    zz( '#t14-8-1b' ).trigger( 'click' );
    assert.equal( zz( '#t14-8c' ).text(), '24' );
    zz( '#t14-8-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-8c' ).text(), '24' );
    zz( '#t14-8-3b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-8c' ).text(), '24' );
    zz( '#t14-8-4b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-8c' ).text(), '24' );
});
