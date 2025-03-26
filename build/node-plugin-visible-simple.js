"use strict";

var Qunit = require( 'qunit' );
var utils = require( '../test/src/app/utils-node.js' );

var zz = require( '../index.js' );
require( '../plugin-visible.js' );

QUnit.test( 'hide, show, toggle and isVisible test', function( assert ) {
    
    // t15-1 is visible
    assert.notEqual( zz( '#t15-1' ).el.offsetParent, null );
    var id = zz( '#t15-1' )
        .hide()
        .attr( 'id' );
    assert.equal( id, 't15-1' );
    assert.equal( zz( '#t15-1' ).el.offsetParent, null );
    id = zz( '#t15-1' )
        .show()
        .attr( 'id' );
    assert.notEqual( zz( '#t15-1' ).el.offsetParent, null );
    assert.equal( id, 't15-1' );
    id = zz( '#t15-1' )
        .hide()
        .attr( 'id' );
    assert.equal( zz( '#t15-1' ).el.offsetParent, null );
    assert.equal( id, 't15-1' );
    
    // t15-2 is NOT visible
    assert.equal( zz( '#t15-2' ).el.offsetParent, null );
    zz( '#t15-2' ).show();
    assert.notEqual( zz( '#t15-2' ).el.offsetParent, null );
    zz( '#t15-2' ).hide();
    assert.equal( zz( '#t15-2' ).el.offsetParent, null );
    zz( '#t15-2' ).show();
    assert.notEqual( zz( '#t15-2' ).el.offsetParent, null );
    
    // t15-3 is visible
    assert.notEqual( zz( '#t15-3' ).el.offsetParent, null );
    id = zz( '#t15-3' )
        .toggle()
        .attr( 'id' );
    assert.equal( zz( '#t15-3' ).el.offsetParent, null );
    assert.equal( id, 't15-3' );
    id = zz( '#t15-3' )
        .toggle()
        .attr( 'id' );
    assert.notEqual( zz( '#t15-3' ).el.offsetParent, null );
    assert.equal( id, 't15-3' );
    id = zz( '#t15-3' )
        .toggle()
        .attr( 'id' );
    assert.equal( zz( '#t15-3' ).el.offsetParent, null );
    assert.equal( id, 't15-3' );
    
    // t15-4 is NOT visible
    assert.equal( zz( '#t15-4' ).el.offsetParent, null );
    zz( '#t15-4' ).toggle();
    assert.notEqual( zz( '#t15-4' ).el.offsetParent, null );
    zz( '#t15-4' ).toggle();
    assert.equal( zz( '#t15-4' ).el.offsetParent, null );
    zz( '#t15-4' ).toggle();
    assert.notEqual( zz( '#t15-4' ).el.offsetParent, null );
    
    // t15-5 is visible
    assert.notEqual( zz( '#t15-5' ).el.offsetParent, null );
    assert.ok(  zz( '#t15-5' ).isVisible() );
    zz( '#t15-5' ).hide();
    assert.notOk(  zz( '#t15-5' ).isVisible() );
    zz( '#t15-5' ).show();
    assert.ok(  zz( '#t15-5' ).isVisible() );
    
    // t15-6 is NOT visible
    assert.equal( zz( '#t15-6' ).el.offsetParent, null );
    assert.notOk(  zz( '#t15-6' ).isVisible() );
    zz( '#t15-6' ).show();
    assert.ok(  zz( '#t15-6' ).isVisible() );
    zz( '#t15-6' ).hide();
    assert.notOk(  zz( '#t15-6' ).isVisible() );
    
    // t15-7-2 is visible inline
    assert.ok(  zz( '#t15-7-2' ).isVisible() );
    assert.equal( getComputedStyle( zz( '#t15-7-2' ).el, null ).getPropertyValue( 'display' ), 'inline' );
    zz( '#t15-7-2' ).hide();
    assert.notOk(  zz( '#t15-7-2' ).isVisible() );
    assert.equal( getComputedStyle( zz( '#t15-7-2' ).el, null ).getPropertyValue( 'display' ), 'none' );
    zz( '#t15-7-2' ).show();
    assert.ok(  zz( '#t15-7-2' ).isVisible() );
    assert.equal( getComputedStyle( zz( '#t15-7-2' ).el, null ).getPropertyValue( 'display' ), 'inline' );
    
    // t15-8 is visible, must be hide
    assert.notEqual( zz( '#t15-8' ).el.offsetParent, null );
    assert.ok( zz( '#t15-8' ).isVisible() );
    zz( '#t15-8' ).toggle( false );
    assert.equal( zz( '#t15-8' ).el.offsetParent, null );
    assert.notOk( zz( '#t15-8' ).isVisible() );
    
    // t15-9 is visible, do not change
    assert.notEqual( zz( '#t15-9' ).el.offsetParent, null );
    assert.ok( zz( '#t15-9' ).isVisible() );
    zz( '#t15-9' ).toggle( true );
    assert.notEqual( zz( '#t15-9' ).el.offsetParent, null );
    assert.ok( zz( '#t15-9' ).isVisible() );
    
    // t15-10 is NOT visible, do not change
    assert.equal( zz( '#t15-10' ).el.offsetParent, null );
    assert.notOk( zz( '#t15-10' ).isVisible() );
    zz( '#t15-10' ).toggle( false );
    assert.equal( zz( '#t15-10' ).el.offsetParent, null );
    assert.notOk( zz( '#t15-10' ).isVisible() );
    
    // t15-11 is NOT visible, must be shown
    assert.equal( zz( '#t15-11' ).el.offsetParent, null );
    assert.notOk( zz( '#t15-11' ).isVisible() );
    zz( '#t15-11' ).toggle( true );
    assert.notEqual( zz( '#t15-11' ).el.offsetParent, null );
    assert.ok( zz( '#t15-11' ).isVisible() );
    
    // t15-12 is NOT visible, do not change
    assert.equal( zz( '#t15-12' ).el.offsetParent, null );
    assert.notOk( zz( '#t15-12' ).isVisible() );
    assert.equal( zz( '#t15-12' ).attr( 'data-display' ), null );
    zz( '#t15-12' ).hide();
    assert.equal( zz( '#t15-12' ).el.offsetParent, null );
    assert.notOk( zz( '#t15-12' ).isVisible() );
    assert.equal( zz( '#t15-12' ).attr( 'data-display' ), null );
    
    // t15-13 is visible, do not change
    assert.notEqual( zz( '#t15-13' ).el.offsetParent, null );
    assert.ok( zz( '#t15-13' ).isVisible() );
    zz( '#t15-13' ).show();
    assert.notEqual( zz( '#t15-13' ).el.offsetParent, null );
    assert.ok( zz( '#t15-13' ).isVisible() );
    
    // t15-14 is visible and inline, must be hide and shown and already be online
    assert.notEqual( zz( '#t15-14' ).el.offsetParent, null );
    assert.ok( zz( '#t15-14' ).isVisible() );
    assert.equal( getComputedStyle( zz( '#t15-14' ).el ).display, 'inline' );
    zz( '#t15-14' ).hide();
    assert.equal( zz( '#t15-14' ).el.offsetParent, null );
    assert.notOk( zz( '#t15-14' ).isVisible() );
    assert.equal( getComputedStyle( zz( '#t15-14' ).el ).display, 'none' );
    zz( '#t15-14' ).show();
    assert.notEqual( zz( '#t15-14' ).el.offsetParent, null );
    assert.ok( zz( '#t15-14' ).isVisible() );
    assert.equal( getComputedStyle( zz( '#t15-14' ).el ).display, 'inline' );
});


QUnit.test( 'fadeIn and fadeOut test', function( assert ) {

    // fadeOut
    assert.ok( zz( '#t29-1' ).isVisible() );
    const done1 = assert.async();
    zz( '#t29-1' ).fadeOut(
        {
            callback: function(){
                assert.notOk( zz( '#t29-1' ).isVisible() );
                done1();
            }
        }
    );

    // fadeIn
    assert.notOk( zz( '#t29-2' ).isVisible() );
    const done2 = assert.async();
    zz( '#t29-2' ).fadeIn(
        {
            callback: function(){
                assert.ok( zz( '#t29-2' ).isVisible() );
                done2();
            }
        }
    );

    // fadeOut then fadeIn
    assert.ok( zz( '#t29-3' ).isVisible() );
    const done3 = assert.async();
    zz( '#t29-3' ).fadeOut(
        {
            callback: function(){
                assert.notOk( zz( '#t29-3' ).isVisible() );
                zz( '#t29-3' ).fadeIn(
                    {
                        callback: function(){
                            assert.ok( zz( '#t29-3' ).isVisible() );
                            done3();
                        }
                    }
                );
            }
        }
    );

    // fadeOut test time
    var ms = 300;
    assert.ok( zz( '#t29-4' ).isVisible() );
    const done4 = assert.async();
    zz( '#t29-4' ).fadeOut(
        {
            ms: ms
        }
    );
    assert.ok( zz( '#t29-4' ).isVisible() ); // Still visible
    setTimeout(
        function () {
            assert.notOk( zz( '#t29-4' ).isVisible() ); // Must not be visible yet
            done4();
        },
        ms + 100
    );

    // fadeOut no arguments
    assert.ok( zz( '#t29-5' ).isVisible() );
    zz( '#t29-5' ).fadeOut();
    assert.ok( zz( '#t29-5' ).isVisible() ); // Still visible
    const done5 = assert.async();
    setTimeout(
        function () {
            assert.notOk( zz( '#t29-5' ).isVisible() ); // Must not be visible yet
            done5();
        },
        500
    );
});