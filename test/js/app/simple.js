"use strict";

// Unit tests
QUnit.test( 'text and html test', function( assert ) {
    var t1_1_original = 'white',
        t1_1_modified = 'yellow';
    assert.equal( document.getElementById( 't1-1' ).textContent, t1_1_original );
    zz( '#t1-1' ).text( t1_1_modified );
    assert.equal( document.getElementById( 't1-1' ).textContent, t1_1_modified );
    assert.equal( zz( '#t1-1' ).text(), t1_1_modified );
    
    var t1_2_original = '<a href="https://www.fsf.org/">FSF</a>',
        t1_2_modified = '<a href="https://www.mozilla.org/">mozilla</a>';
    assert.equal( document.getElementById( 't1-2' ).innerHTML, t1_2_original );
    zz( '#t1-2' ).html( t1_2_modified );
    assert.equal( document.getElementById( 't1-2' ).innerHTML, t1_2_modified );
    assert.equal( zz( '#t1-2' ).html(), t1_2_modified );
});

QUnit.test( 'remove and empty test', function( assert ) {
    var t2_1_original = 'To remove';
    assert.equal( document.getElementById( 't2-1' ).textContent, t2_1_original );
    zz( '#t2-1' ).remove();
    assert.equal( document.getElementById( 't2-1' ), null );
    
    var t2_2_original = 'To be empty';
    assert.equal( document.getElementById( 't2-2' ).textContent, t2_2_original );
    zz( '#t2-2' ).empty();
    assert.equal( document.getElementById( 't2-2' ).textContent, '' );
});

QUnit.test( 'replaceWith test', function( assert ) {
    var t3_1_original = '<span id="t3-1-in">To replace</span>',
        t3_1_modified = 'Replaced text';
    assert.equal( document.getElementById( 't3-1' ).innerHTML, t3_1_original );
    zz( '#t3-1-in' ).replaceWith( t3_1_modified );
    assert.equal( document.getElementById( 't3-1' ).innerHTML, t3_1_modified );
});

QUnit.test( 'attr and removeAttr test', function( assert ) {
    var t4_1_original = 'https://www.fsf.org/',
        t4_1_modified = 'https://www.mozilla.org/';
    assert.equal( document.getElementById( 't4-1' ).getAttribute( 'href' ), t4_1_original );
    zz( '#t4-1' ).attr( 'href', t4_1_modified );
    assert.equal( document.getElementById( 't4-1' ).getAttribute( 'href' ), t4_1_modified );
    assert.equal( zz( '#t4-1' ).attr( 'href' ), t4_1_modified );
    
    var t4_2_original = 'FSF';
    assert.equal( document.getElementById( 't4-2' ).getAttribute( 'name' ), t4_2_original );
    zz( '#t4-2' ).removeAttr( 'name' );
    assert.equal( document.getElementById( 't4-2' ).getAttribute( 'name' ), null );
    assert.equal( zz( '#t4-2' ).attr( 'name' ), null );
});

QUnit.test( 'addClass, hasClass, removeClass and toggleClass test', function( assert ) {
    var t5_1_class = 'myclass';
    assert.ok( document.getElementById( 't5-1' ).classList.contains( t5_1_class ) );
    assert.ok( zz( '#t5-1' ).hasClass( t5_1_class ) );

    var t5_2_class = 'addedclass';
    assert.notOk( document.getElementById( 't5-2' ).classList.contains( t5_2_class ) );
    zz( '#t5-2' ).addClass( t5_2_class );
    assert.ok( document.getElementById( 't5-2' ).classList.contains( t5_2_class ) );
    
    var t5_3_class = 'otherclass';
    assert.ok( document.getElementById( 't5-3' ).classList.contains( t5_3_class ) );
    zz( '#t5-3' ).removeClass( t5_3_class );
    assert.notOk( document.getElementById( 't5-3' ).classList.contains( t5_3_class ) );
    
    var t5_4_class = 'addedclass';
    assert.notOk( document.getElementById( 't5-4' ).classList.contains( t5_4_class ) );
    zz( '#t5-4' ).toggleClass( t5_4_class );
    assert.ok( document.getElementById( 't5-4' ).classList.contains( t5_4_class ) );
    
    var t5_5_class = 'otherclass';
    assert.ok( document.getElementById( 't5-5' ).classList.contains( t5_5_class ) );
    zz( '#t5-5' ).removeClass( t5_5_class );
    assert.notOk( document.getElementById( 't5-5' ).classList.contains( t5_5_class ) );
});

QUnit.test( 'after, before, append, prepend, prev and next test', function( assert ) {
    var t6_1_original = '<li id=\"t6-1-1\">Text 1</li><li id=\"t6-1-2\">Text 2</li>',
        t6_1_modified = '<li id=\"t6-1-1\">Text 1</li><li>New text</li><li id=\"t6-1-2\">Text 2</li>';
    utils.assertHtml( assert, 't6-1', t6_1_original );
    zz( '#t6-1-1' ).after( '<li>New text</li>' );
    utils.assertHtml( assert, 't6-1', t6_1_modified );
    
    var t6_2_original = '<li id=\"t6-2-1\">Text 1</li><li id=\"t6-2-2\">Text 2</li>',
        t6_2_modified = '<li id=\"t6-2-1\">Text 1</li><li>New text</li><li id=\"t6-2-2\">Text 2</li>';
    utils.assertHtml( assert, 't6-2', t6_2_original );
    zz( '#t6-2-2' ).before( '<li>New text</li>' );
    utils.assertHtml( assert, 't6-2', t6_2_modified );
    
    var t6_3_original = '<li id=\"t6-3-1\">Text 1</li><li id=\"t6-3-2\">Text 2</li>',
        t6_3_modified = '<li id=\"t6-3-1\">Text 1</li><li id=\"t6-3-2\">Text 2</li><li>New text</li>';
    utils.assertHtml( assert, 't6-3', t6_3_original );
    zz( '#t6-3' ).append( '<li>New text</li>' );
    utils.assertHtml( assert, 't6-3', t6_3_modified );
    
    var t6_4_original = '<li id=\"t6-4-1\">Text 1</li><li id=\"t6-4-2\">Text 2</li>',
        t6_4_modified = '<li>New text</li><li id=\"t6-4-1\">Text 1</li><li id=\"t6-4-2\">Text 2</li>';
    utils.assertHtml( assert, 't6-4', t6_4_original );
    zz( '#t6-4' ).prepend( '<li>New text</li>' );
    utils.assertHtml( assert, 't6-4', t6_4_modified );
});

QUnit.test( 'siblings, prev and next test', function( assert ) {
    var ids = [];
    zz( '#t7-1-2' ).siblings().each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't7-1-1', 't7-1-3' ] );
    
    assert.equal( zz( '#t7-2-2' ).prev().attr( 'id' ), 't7-2-1' );
    
    assert.equal( zz( '#t7-2-2' ).next().attr( 'id' ), 't7-2-3' );
    
    var ids = [];
    zz( '#t7-4-2' ).siblings( '.selected' ).each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't7-4-1', 't7-4-4' ] );
});

QUnit.test( 'children, index and parent test', function( assert ) {
    var ids = [];
    zz( '#t8-1' ).children().each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't8-1-1', 't8-1-2', 't8-1-3' ] );
    
    assert.equal( zz( '#t8-2-1' ).index(), 1 );
    assert.equal( zz( '#t8-2-2' ).index(), 2 );
    assert.equal( zz( '#t8-2-3' ).index(), 3 );
    
    assert.equal( zz( '#t8-3-1' ).parent().attr( 'id' ), 't8-3' );
    assert.equal( zz( '#t8-3-2' ).parent().attr( 'id' ), 't8-3' );
    assert.equal( zz( '#t8-3-3' ).parent().attr( 'id' ), 't8-3' );
    
    ids = [];
    zz( '#t8-4' ).children( '.selected' ).each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't8-4-1', 't8-4-3' ] );
});

QUnit.test( 'filter and find test', function( assert ) {
    var ids = [];
    zz( '#t9-1' ).find( '.a' ).each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't9-1-1', 't9-1-2', 't9-1-3-1' ] );
    
    ids = [];
    zz( '#t9-1' ).find( '.b' ).each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't9-1-1', 't9-1-3-2', 't9-1-4', 't9-1-4-2' ] );
    
    ids = [];
    zz( '#t9-1' ).find( '.a.b' ).each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't9-1-1' ] );

    ids = [];
    zz( '#t9-1' ).find( '.c' ).each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [] );
    
    ids = [];
    zz( '#t9-2-1' ).filter( '.a' ).each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't9-2-1' ] );
    
    ids = [];
    zz( '#t9-2-1' ).filter( '.b' ).each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [] );
    
    ids = [];
    zz( '#t9-2-1' ).filter( '.a.b' ).each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [] );
    
    ids = [];
    zz( '#t9-2-2' ).filter( '.a' ).each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't9-2-2' ] );
    
    ids = [];
    zz( '#t9-2-2' ).filter( '.b' ).each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't9-2-2' ] );
    
    ids = [];
    zz( '#t9-2-2' ).filter( '.a.b' ).each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't9-2-2' ] );
    
    ids = [];
    zz( '#t9-2-3' ).filter( '.a' ).each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [] );
    
    ids = [];
    zz( '#t9-2-3' ).filter( '.b' ).each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [] );
    
    ids = [];
    zz( '#t9-2-3' ).filter( '.a.b' ).each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [] );
    
    ids = [];
    zz( '#t9-2-1' )
        .filter( 
            function( zzEl ){ 
                return zzEl.attr( 'class' ) === 'a b' 
            }
        )
        .each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [] );
    
    ids = [];
    zz( '#t9-2-2' )
        .filter( 
            function( zzEl ){ 
                return zzEl.attr( 'class' ) === 'a b' 
            }
        )
        .each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't9-2-2' ] );           
});

QUnit.test( 'css test', function( assert ) {
    var t11_1_original = null,
        t11_1_modified = 'color: red;';
    assert.equal( document.getElementById( 't11-1' ).getAttribute( 'style' ), t11_1_original );
    zz( '#t11-1' ).css( 'color', 'red' );
    assert.equal( document.getElementById( 't11-1' ).getAttribute( 'style' ), t11_1_modified );
    assert.equal( zz( '#t11-1' ).css( 'color' ), 'rgb(255, 0, 0)' );
    
    var t11_2_original = null,
        t11_2_modified = 'background-color: red;';
    assert.equal( document.getElementById( 't11-2' ).getAttribute( 'style' ), t11_2_original );
    zz( '#t11-2' ).css( 'background-color', 'red' );
    assert.equal( document.getElementById( 't11-2' ).getAttribute( 'style' ), t11_2_modified );
    assert.equal( zz( '#t11-2' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    
    var t11_3_original = 'color: green',
        t11_3_modified = 'color: red;';
    assert.equal( document.getElementById( 't11-3' ).getAttribute( 'style' ), t11_3_original );
    zz( '#t11-3' ).css( 'color', 'red' );
    assert.equal( document.getElementById( 't11-3' ).getAttribute( 'style' ), t11_3_modified );
    assert.equal( zz( '#t11-3' ).css( 'color' ), 'rgb(255, 0, 0)' );
    
    var t11_4_original = 'color: green',
        t11_4_modified = 'color: green; background-color: red;';
    assert.equal( document.getElementById( 't11-4' ).getAttribute( 'style' ), t11_4_original );
    zz( '#t11-4' ).css( 'background-color', 'red' );
    assert.equal( document.getElementById( 't11-4' ).getAttribute( 'style' ), t11_4_modified );
    assert.equal( zz( '#t11-4' ).css( 'color' ), 'rgb(0, 128, 0)' );
    assert.equal( zz( '#t11-4' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    
    var t11_5_original = null,
        t11_5_modified = 'color: white; background-color: red;';
    assert.equal( document.getElementById( 't11-5' ).getAttribute( 'style' ), t11_5_original );
    zz( '#t11-5' ).css({
        color: 'white',
        'background-color': 'red' 
    });
    assert.equal( document.getElementById( 't11-5' ).getAttribute( 'style' ), t11_5_modified );
    assert.equal( zz( '#t11-5' ).css( 'color' ), 'rgb(255, 255, 255)' );
    assert.equal( zz( '#t11-5' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
});
