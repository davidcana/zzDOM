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
    id = zz( 's', '#t1-5 span.selected' )
        .text( t1_5_modified )
        .attr( 'id' );
    assert.equal( id, 't1-5-2' );
    assert.equal( document.getElementById( 't1-5-1' ).textContent, t1_5_1_original );
    assert.equal( document.getElementById( 't1-5-2' ).textContent, t1_5_modified );
    assert.equal( document.getElementById( 't1-5-3' ).textContent, t1_5_3_original );
    assert.equal( zz( '#t1-5-1' ).text(), t1_5_1_original );
    assert.equal( zz( '#t1-5-2' ).text(), t1_5_modified );
    assert.equal( zz( '#t1-5-3' ).text(), t1_5_3_original );
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

QUnit.test( 'Nodes test', function( assert ) {
    var t5_1_1_original = 'white',
        t5_1_2_original = 'red',
        t5_1_3_original = 'black',
        t5_1_modified = 'yellow';
    assert.equal( document.getElementById( 't5-1-1' ).textContent, t5_1_1_original );
    assert.equal( document.getElementById( 't5-1-2' ).textContent, t5_1_2_original );
    assert.equal( document.getElementById( 't5-1-3' ).textContent, t5_1_3_original );
    var ids = [];
    zz( document.querySelectorAll( '#t5-1 .t5-1' ) )
        .text( t5_1_modified )
        .each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't5-1-2', 't5-1-3' ] );
    assert.equal( document.getElementById( 't5-1-1' ).textContent, t5_1_1_original );
    assert.equal( document.getElementById( 't5-1-2' ).textContent, t5_1_modified );
    assert.equal( document.getElementById( 't5-1-3' ).textContent, t5_1_modified );
    assert.equal( zz( '#t5-1-1' ).text(), t5_1_1_original );
    assert.equal( zz( '#t5-1-2' ).text(), t5_1_modified );
    assert.equal( zz( '#t5-1-3' ).text(), t5_1_modified );
});

QUnit.test( 'Standard selectors test', function( assert ) {
    var t6_1_1_original = 'white',
        t6_1_2_original = 'red',
        t6_1_3_original = 'black',
        t6_1_modified = 'yellow';
    assert.equal( document.getElementById( 't6-1-1' ).textContent, t6_1_1_original );
    assert.equal( document.getElementById( 't6-1-2' ).textContent, t6_1_2_original );
    assert.equal( document.getElementById( 't6-1-3' ).textContent, t6_1_3_original );
    var ids = [];
    zz( document.querySelectorAll( '#t6-1 .t6-1' ) )
        .text( t6_1_modified )
        .each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't6-1-2', 't6-1-3' ] );
    assert.equal( document.getElementById( 't6-1-1' ).textContent, t6_1_1_original );
    assert.equal( document.getElementById( 't6-1-2' ).textContent, t6_1_modified );
    assert.equal( document.getElementById( 't6-1-3' ).textContent, t6_1_modified );
    assert.equal( zz( '#t6-1-1' ).text(), t6_1_1_original );
    assert.equal( zz( '#t6-1-2' ).text(), t6_1_modified );
    assert.equal( zz( '#t6-1-3' ).text(), t6_1_modified );
});

QUnit.test( 'HTML code test', function( assert ) {
    var t7_1_original = 'This is the container t7-1',
        t7_1_modified = `
This is the container t7-1

<div id="t7-1-in">
  New div
</div>
`;
    utils.assertHtml( assert, 't7-1', t7_1_original );
    var id = zz( '<div id="t7-1-in">New div</div>' )
        .appendTo( '#t7-1' )
        .attr( 'id' );
    utils.assertHtml( assert, 't7-1', t7_1_modified );
    assert.equal( id, 't7-1-in' );
    
    var t7_2_original = 'This is the container t7-2',
        t7_2_modified = `
This is the container t7-2

<div id="t7-2-in1">
  New div 1
</div>

<div id="t7-2-in2">
  New div 2
</div>
`;
    utils.assertHtml( assert, 't7-2', t7_2_original );
    var ids = [];
    zz( '<div id="t7-2-in1">New div 1</div><div id="t7-2-in2">New div 2</div>' )
        .appendTo( '#t7-2' )
        .each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't7-2-in1', 't7-2-in2' ] );
    utils.assertHtml( assert, 't7-2', t7_2_modified );
});

QUnit.test( 'Null test', function( assert ) {
    zz( document.querySelectorAll( '#non-existing-id' ) ).text( 'this is useless' );
    assert.ok( true );
    
    var instance = zz( document.querySelectorAll( '#non-existing-id' ) ).attr( 'id' );
    assert.ok( instance instanceof zzDOM.MM );
    assert.deepEqual( instance.list, [] );
    assert.deepEqual( instance.nodes, [] );
    
    instance = zz( document.querySelectorAll( '#non-existing-id' ) );
    assert.ok( instance instanceof zzDOM.MM );
    assert.deepEqual( instance.list, [] );
    assert.deepEqual( instance.nodes, [] );
    
    instance = zz( '#non-existing-id' );
    assert.ok( instance instanceof zzDOM.MM );
    assert.deepEqual( instance.list, [] );
    assert.deepEqual( instance.nodes, [] );
});

QUnit.test( 'Exceptions test', function( assert ) {
    assert.throws(
        function() {
            zz( 'unknown', 'some text' ).text( 'this is useless' );
        },
        'Unsupported selector id found running zz function: unknown'
    );
    
    assert.throws(
        function() {
            zz( 1 ).text( 'this is useless' );
        },
        'Unsupported selector id found running zz function: unknown'
    );

});

