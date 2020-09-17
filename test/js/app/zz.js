"use strict";

// Unit tests
QUnit.test( 'ZZDom selectors test', function( assert ) {
    var t1_1_original = 'white',
        t1_1_modified = 'yellow';
    assert.equal( document.getElementById( 't1-1' ).textContent, t1_1_original );
    var id = zz( '#', 't1-1' )
        .text( t1_1_modified )
        .attr( 'id' );
    assert.equal( document.getElementById( 't1-1' ).textContent, t1_1_modified );
    assert.equal( zz( '#t1-1' ).text(), t1_1_modified );
    assert.equal( id, 't1-1' );
    
    var t1_2_1_original = 'white',
        t1_2_2_original = 'red',
        t1_2_modified = 'yellow';
    assert.equal( document.getElementById( 't1-2-1' ).textContent, t1_2_1_original );
    assert.equal( document.getElementById( 't1-2-2' ).textContent, t1_2_2_original );
    var ids = [];
    zz( '.', 't1-2' )
        .text( t1_2_modified )
        .each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't1-2-1', 't1-2-2' ] );
    assert.equal( document.getElementById( 't1-2-1' ).textContent, t1_2_modified );
    assert.equal( document.getElementById( 't1-2-2' ).textContent, t1_2_modified );
    assert.equal( zz( '#t1-2-1' ).text(), t1_2_modified );
    assert.equal( zz( '#t1-2-2' ).text(), t1_2_modified );
    
    var t1_3_1_original = 'white',
        t1_3_2_original = 'red',
        t1_3_3_original = 'black',
        t1_3_modified = 'yellow';
    assert.equal( document.getElementById( 't1-3-1' ).textContent, t1_3_1_original );
    assert.equal( document.getElementById( 't1-3-2' ).textContent, t1_3_2_original );
    assert.equal( document.getElementById( 't1-3-3' ).textContent, t1_3_3_original );
    var ids = [];
    zz( 't', 'i' )
        .text( t1_3_modified )
        .each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't1-3-2', 't1-3-3' ] );
    assert.equal( document.getElementById( 't1-3-1' ).textContent, t1_3_1_original );
    assert.equal( document.getElementById( 't1-3-2' ).textContent, t1_3_modified );
    assert.equal( document.getElementById( 't1-3-3' ).textContent, t1_3_modified );
    assert.equal( zz( '#t1-3-1' ).text(), t1_3_1_original );
    assert.equal( zz( '#t1-3-2' ).text(), t1_3_modified );
    assert.equal( zz( '#t1-3-3' ).text(), t1_3_modified );
    
    var t1_4_1_original = 'white',
        t1_4_2_original = 'red',
        t1_4_3_original = 'black',
        t1_4_modified = 'yellow';
    assert.equal( document.getElementById( 't1-4-1' ).textContent, t1_4_1_original );
    assert.equal( document.getElementById( 't1-4-2' ).textContent, t1_4_2_original );
    assert.equal( document.getElementById( 't1-4-3' ).textContent, t1_4_3_original );
    var ids = [];
    zz( 'n', 'myname' )
        .text( t1_4_modified )
        .each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't1-4-2', 't1-4-3' ] );
    assert.equal( document.getElementById( 't1-4-1' ).textContent, t1_4_1_original );
    assert.equal( document.getElementById( 't1-4-2' ).textContent, t1_4_modified );
    assert.equal( document.getElementById( 't1-4-3' ).textContent, t1_4_modified );
    assert.equal( zz( '#t1-4-1' ).text(), t1_4_1_original );
    assert.equal( zz( '#t1-4-2' ).text(), t1_4_modified );
    assert.equal( zz( '#t1-4-3' ).text(), t1_4_modified );
    
    var t1_5_1_original = 'white',
        t1_5_2_original = 'red',
        t1_5_3_original = 'black',
        t1_5_modified = 'yellow';
    assert.equal( document.getElementById( 't1-5-1' ).textContent, t1_5_1_original );
    assert.equal( document.getElementById( 't1-5-2' ).textContent, t1_5_2_original );
    assert.equal( document.getElementById( 't1-5-3' ).textContent, t1_5_3_original );
    var ids = [];
    zz( '#t1-5 span.selected' )
        .text( t1_5_modified )
        .each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't1-5-2', 't1-5-3' ] );
    assert.equal( document.getElementById( 't1-5-1' ).textContent, t1_4_1_original );
    assert.equal( document.getElementById( 't1-5-2' ).textContent, t1_4_modified );
    assert.equal( document.getElementById( 't1-5-3' ).textContent, t1_4_modified );
    assert.equal( zz( '#t1-5-1' ).text(), t1_4_1_original );
    assert.equal( zz( '#t1-5-2' ).text(), t1_4_modified );
    assert.equal( zz( '#t1-5-3' ).text(), t1_4_modified );
});

QUnit.test( 'Element test', function( assert ) {
    var t2_1_original = 'white',
        t2_1_modified = 'yellow';
    assert.equal( document.getElementById( 't2-1' ).textContent, t2_1_original );
    var id = zz( document.getElementById( 't2-1' ) )
        .text( t2_1_modified )
        .attr( 'id' );
    assert.equal( document.getElementById( 't2-1' ).textContent, t2_1_modified );
    assert.equal( zz( '#t2-1' ).text(), t2_1_modified );
    assert.equal( id, 't2-1' );
});

QUnit.test( 'HTMLCollection test', function( assert ) {
    var t3_1_1_original = 'white',
        t3_1_2_original = 'red',
        t3_1_modified = 'yellow';
    assert.equal( document.getElementById( 't3-1-1' ).textContent, t3_1_1_original );
    assert.equal( document.getElementById( 't3-1-2' ).textContent, t3_1_2_original );
    var ids = [];
    zz( document.getElementsByClassName( 't3-1' ) )
        .text( t3_1_modified )
        .each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't3-1-1', 't3-1-2' ] );
    assert.equal( document.getElementById( 't3-1-1' ).textContent, t3_1_modified );
    assert.equal( document.getElementById( 't3-1-2' ).textContent, t3_1_modified );
    assert.equal( zz( '#t3-1-1' ).text(), t3_1_modified );
    assert.equal( zz( '#t3-1-2' ).text(), t3_1_modified );
});

QUnit.test( 'NodeList test', function( assert ) {
    var t4_1_1_original = 'white',
        t4_1_2_original = 'red',
        t4_1_3_original = 'black',
        t4_1_modified = 'yellow';
    assert.equal( document.getElementById( 't4-1-1' ).textContent, t4_1_1_original );
    assert.equal( document.getElementById( 't4-1-2' ).textContent, t4_1_2_original );
    assert.equal( document.getElementById( 't4-1-3' ).textContent, t4_1_3_original );
    var ids = [];
    zz( document.getElementsByName( 'anothername' ) )
        .text( t4_1_modified )
        .each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't4-1-2', 't4-1-3' ] );
    assert.equal( document.getElementById( 't4-1-1' ).textContent, t4_1_1_original );
    assert.equal( document.getElementById( 't4-1-2' ).textContent, t4_1_modified );
    assert.equal( document.getElementById( 't4-1-3' ).textContent, t4_1_modified );
    assert.equal( zz( '#t4-1-1' ).text(), t4_1_1_original );
    assert.equal( zz( '#t4-1-2' ).text(), t4_1_modified );
    assert.equal( zz( '#t4-1-3' ).text(), t4_1_modified );
});


