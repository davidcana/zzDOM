"use strict";

var Qunit = require( 'qunit' );
var utils = require( '../test/src/app/utils-node.js' );

var zz = require( '../index.js' );
require( '../plugin-visible.js' );

QUnit.test( 'hide, show, toggle and isVisible test', function( assert ) {
    // .t15-1 is visible
    assert.notEqual( zz( '#t15-1-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-1-2' ).el.offsetParent, null );
    var ids = [];
    zz( '.t15-1' )
        .hide()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-1-1', 't15-1-2' ] );
    assert.equal( zz( '#t15-1-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-1-2' ).el.offsetParent, null );
    ids = [];
    zz( '.t15-1' )
        .show()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-1-1', 't15-1-2' ] );
    assert.notEqual( zz( '#t15-1-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-1-2' ).el.offsetParent, null );
    ids = [];
    zz( '.t15-1' )
        .hide()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-1-1', 't15-1-2' ] );
    assert.equal( zz( '#t15-1-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-1-2' ).el.offsetParent, null );
    
    // .t15-2 is NOT visible
    assert.equal( zz( '#t15-2-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-2-2' ).el.offsetParent, null );
    zz( '.t15-2' ).show();
    assert.notEqual( zz( '#t15-2-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-2-2' ).el.offsetParent, null );
    zz( '.t15-2' ).hide();
    assert.equal( zz( '#t15-2-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-2-2' ).el.offsetParent, null );
    zz( '.t15-2' ).show();
    assert.notEqual( zz( '#t15-2-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-2-2' ).el.offsetParent, null );
    
    // .t15-3 is visible
    assert.notEqual( zz( '#t15-3-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-3-2' ).el.offsetParent, null );
    ids = [];
    zz( '.t15-3' )
        .toggle()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-3-1', 't15-3-2' ] );
    assert.equal( zz( '#t15-3-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-3-2' ).el.offsetParent, null );
    ids = [];
    zz( '.t15-3' )
        .toggle()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-3-1', 't15-3-2' ] );
    assert.notEqual( zz( '#t15-3-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-3-2' ).el.offsetParent, null );
    ids = [];
    zz( '.t15-3' )
        .toggle()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-3-1', 't15-3-2' ] );
    assert.equal( zz( '#t15-3-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-3-2' ).el.offsetParent, null );
    
    // .t15-4 is NOT visible
    assert.equal( zz( '#t15-4-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-4-2' ).el.offsetParent, null );
    zz( '.t15-4' ).toggle();
    assert.notEqual( zz( '#t15-4-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-4-2' ).el.offsetParent, null );
    zz( '.t15-4' ).toggle();
    assert.equal( zz( '#t15-4-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-4-2' ).el.offsetParent, null );
    zz( '.t15-4' ).toggle();
    assert.notEqual( zz( '#t15-4-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-4-2' ).el.offsetParent, null );
    
    // .t15-5 is visible
    assert.notEqual( zz( '#t15-5-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-5-2' ).el.offsetParent, null );
    assert.ok( zz( '#t15-5-1' ).isVisible() );
    assert.ok( zz( '#t15-5-2' ).isVisible() );
    zz( '.t15-5' ).hide();
    assert.notOk( zz( '#t15-5-1' ).isVisible() );
    assert.notOk( zz( '#t15-5-2' ).isVisible() );
    zz( '.t15-5' ).show();
    assert.ok( zz( '#t15-5-1' ).isVisible() );
    assert.ok( zz( '#t15-5-2' ).isVisible() );
    
    // .t15-6 is NOT visible
    assert.equal( zz( '#t15-6-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-6-2' ).el.offsetParent, null );
    assert.notOk( zz( '#t15-6-1' ).isVisible() );
    assert.notOk( zz( '#t15-6-2' ).isVisible() );
    zz( '.t15-6' ).show();
    assert.ok(  zz( '#t15-6-1' ).isVisible() );
    assert.ok(  zz( '#t15-6-2' ).isVisible() );
    zz( '.t15-6' ).hide();
    assert.notOk(  zz( '#t15-6-1' ).isVisible() );
    assert.notOk(  zz( '#t15-6-2' ).isVisible() );
    
    // #t15-7-1 is visible and #t15-7-2 is NOT visible
    assert.ok( zz( '#t15-7-1' ).isVisible() );
    assert.notOk( zz( '#t15-7-2' ).isVisible() );
    zz( '.t15-7' ).toggle();
    assert.notOk( zz( '#t15-7-1' ).isVisible() );
    assert.ok( zz( '#t15-7-2' ).isVisible() );
    zz( '.t15-7' ).toggle();
    assert.ok( zz( '#t15-7-1' ).isVisible() );
    assert.notOk( zz( '#t15-7-2' ).isVisible() );
});
