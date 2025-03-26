"use strict";

var Qunit = require( 'qunit' );
var utils = require( '../test/src/app/utils-node.js' );

var zz = require( '../index.js' );

"use strict";

// Unit tests
QUnit.test( 'text and html test', function( assert ) {
    var t1_1_original = 'white',
        t1_1_modified = 'yellow';
    assert.equal( document.getElementById( 't1-1' ).textContent, t1_1_original );
    var id = zz( '#t1-1' )
        .text( t1_1_modified )
        .attr( 'id' );
    assert.equal( document.getElementById( 't1-1' ).textContent, t1_1_modified );
    assert.equal( zz( '#t1-1' ).text(), t1_1_modified );
    assert.equal( id, 't1-1' );
    
    var t1_2_original = '<a href="https://www.fsf.org/">FSF</a>',
        t1_2_modified = '<a href="https://www.mozilla.org/">mozilla</a>';
    assert.equal( document.getElementById( 't1-2' ).innerHTML, t1_2_original );
    id = zz( '#t1-2' )
        .html( t1_2_modified )
        .attr( 'id' );
    assert.equal( document.getElementById( 't1-2' ).innerHTML, t1_2_modified );
    assert.equal( zz( '#t1-2' ).html(), t1_2_modified );
    assert.equal( id, 't1-2' );
});

QUnit.test( 'remove and empty test', function( assert ) {
    var t2_1_original = 'To remove';
    assert.equal( document.getElementById( 't2-1' ).textContent, t2_1_original );
    zz( '#t2-1' ).remove();
    assert.equal( document.getElementById( 't2-1' ), null );
    // Can not test zz( '#t2-1' ).attr( 'id' ), element was removed!
    
    var t2_2_original = 'To be empty';
    assert.equal( document.getElementById( 't2-2' ).textContent, t2_2_original );
    var id = zz( '#t2-2' )
        .empty()
        .attr( 'id' );
    assert.equal( document.getElementById( 't2-2' ).textContent, '' );
    assert.equal( id, 't2-2' );
});

QUnit.test( 'replaceWith test', function( assert ) {
    var t3_1_original = '<span id="t3-1-in">To replace</span>',
        t3_1_modified = 'Replaced text';
    assert.equal( document.getElementById( 't3-1' ).innerHTML, t3_1_original );
    var id = zz( '#t3-1-in' )
        .replaceWith( t3_1_modified )
        .attr( 'id' );
    assert.equal( document.getElementById( 't3-1' ).innerHTML, t3_1_modified );
    assert.equal( id, 't3-1-in' );
});

QUnit.test( 'attr and removeAttr test', function( assert ) {
    var t4_1_original = 'https://www.fsf.org/',
        t4_1_modified = 'https://www.mozilla.org/';
    assert.equal( document.getElementById( 't4-1' ).getAttribute( 'href' ), t4_1_original );
    var id = zz( '#t4-1' )
        .attr( 'href', t4_1_modified )
        .attr( 'id' );
    assert.equal( document.getElementById( 't4-1' ).getAttribute( 'href' ), t4_1_modified );
    assert.equal( zz( '#t4-1' ).attr( 'href' ), t4_1_modified );
    assert.equal( id, 't4-1' );
    
    var t4_2_original = 'FSF';
    assert.equal( document.getElementById( 't4-2' ).getAttribute( 'name' ), t4_2_original );
    id = zz( '#t4-2' )
        .removeAttr( 'name' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't4-2' ).getAttribute( 'name' ), null );
    assert.equal( zz( '#t4-2' ).attr( 'name' ), null );
    assert.equal( id, 't4-2' );
    
    var t4_3_href_original = 'https://www.fsf.org/',
        t4_3_href_modified = 'https://www.mozilla.org/',
        t4_3_name_original = 'FSF',
        t4_3_name_modified = 'Mozilla';
    assert.equal( document.getElementById( 't4-3' ).getAttribute( 'href' ), t4_3_href_original );
    assert.equal( document.getElementById( 't4-3' ).getAttribute( 'name' ), t4_3_name_original );
    id = zz( '#t4-3' )
        .attr( 
            {
                'href': t4_3_href_modified,
                'name': t4_3_name_modified
            }
        )
        .attr( 'id' );
    assert.equal( document.getElementById( 't4-3' ).getAttribute( 'href' ), t4_3_href_modified );
    assert.equal( zz( '#t4-3' ).attr( 'href' ), t4_3_href_modified );
    assert.equal( document.getElementById( 't4-3' ).getAttribute( 'name' ), t4_3_name_modified );
    assert.equal( zz( '#t4-3' ).attr( 'name' ), t4_3_name_modified );
    assert.equal( id, 't4-3' );
    
    var t4_4_name_original = 'FSF';
    assert.equal( document.getElementById( 't4-4' ).getAttribute( 'name' ), t4_4_name_original );
    assert.equal( zz( '#t4-4' ).attr( 'name' ), t4_4_name_original );
    assert.ok( document.getElementById( 't4-4' ).hasAttribute( 'name' ) );
    id = zz( '#t4-4' )
        .attr( 'name', null )
        .attr( 'id' );
    assert.equal( document.getElementById( 't4-4' ).getAttribute( 'name' ), null );
    assert.equal( zz( '#t4-4' ).attr( 'name' ), null );
    assert.notOk( document.getElementById( 't4-4' ).hasAttribute( 'name' ) );
    assert.equal( id, 't4-4' );
    
    var t4_5_href_original = 'https://www.fsf.org/',
        t4_5_href_modified = 'https://www.mozilla.org/',
        t4_5_name_original = 'FSF';
    assert.equal( document.getElementById( 't4-5' ).getAttribute( 'href' ), t4_5_href_original );
    assert.equal( document.getElementById( 't4-5' ).getAttribute( 'name' ), t4_5_name_original );
    assert.ok( document.getElementById( 't4-5' ).hasAttribute( 'href' ) );
    assert.ok( document.getElementById( 't4-5' ).hasAttribute( 'name' ) );
    id = zz( '#t4-5' )
        .attr( 
            {
                'href': t4_5_href_modified,
                'name': null
            }
        )
        .attr( 'id' );
    assert.equal( document.getElementById( 't4-5' ).getAttribute( 'href' ), t4_5_href_modified );
    assert.equal( zz( '#t4-5' ).attr( 'href' ), t4_5_href_modified );
    assert.equal( document.getElementById( 't4-5' ).getAttribute( 'name' ), null );
    assert.equal( zz( '#t4-5' ).attr( 'name' ), null );
    assert.ok( document.getElementById( 't4-5' ).hasAttribute( 'href' ) );
    assert.notOk( document.getElementById( 't4-5' ).hasAttribute( 'name' ) );
    assert.equal( id, 't4-5' );
});

QUnit.test( 'addClass, hasClass, removeClass and toggleClass test', function( assert ) {
    var t5_1_class = 'myclass';
    assert.ok( document.getElementById( 't5-1' ).classList.contains( t5_1_class ) );
    assert.ok( zz( '#t5-1' ).hasClass( t5_1_class ) );

    var t5_2_class = 'addedclass';
    assert.notOk( document.getElementById( 't5-2' ).classList.contains( t5_2_class ) );
    var id = zz( '#t5-2' )
        .addClass( t5_2_class )
        .attr( 'id' );
    assert.ok( document.getElementById( 't5-2' ).classList.contains( t5_2_class ) );
    assert.equal( id, 't5-2' );
    
    var t5_3_class = 'otherclass';
    assert.ok( document.getElementById( 't5-3' ).classList.contains( t5_3_class ) );
    id = zz( '#t5-3' )
        .removeClass( t5_3_class )
        .attr( 'id' );
    assert.notOk( document.getElementById( 't5-3' ).classList.contains( t5_3_class ) );
    assert.equal( id, 't5-3' );
    
    var t5_4_class = 'addedclass';
    assert.notOk( document.getElementById( 't5-4' ).classList.contains( t5_4_class ) );
    id = zz( '#t5-4' )
        .toggleClass( t5_4_class )
        .attr( 'id' );
    assert.ok( document.getElementById( 't5-4' ).classList.contains( t5_4_class ) );
    assert.equal( id, 't5-4' );
    
    var t5_5_class = 'otherclass';
    assert.ok( document.getElementById( 't5-5' ).classList.contains( t5_5_class ) );
    id = zz( '#t5-5' )
        .removeClass( t5_5_class )
        .attr( 'id' );
    assert.notOk( document.getElementById( 't5-5' ).classList.contains( t5_5_class ) );
    assert.equal( id, 't5-5' );
    
    var t5_6_initialClass = 'myclass',
        t5_6_addedClass1 = 'addedclass',
        t5_6_addedClass2 = 'otherclass',
        t5_6_classArray = [ t5_6_addedClass1, t5_6_addedClass2 ];
    assert.ok( document.getElementById( 't5-6' ).classList.contains( t5_6_initialClass ) );
    assert.notOk( document.getElementById( 't5-6' ).classList.contains( t5_6_addedClass1 ) );
    assert.notOk( document.getElementById( 't5-6' ).classList.contains( t5_6_addedClass2 ) );
    id = zz( '#t5-6' )
        .addClass( t5_6_classArray )
        .attr( 'id' );
    assert.ok( document.getElementById( 't5-6' ).classList.contains( t5_6_initialClass ) );
    assert.ok( document.getElementById( 't5-6' ).classList.contains( t5_6_addedClass1 ) );
    assert.ok( document.getElementById( 't5-6' ).classList.contains( t5_6_addedClass2 ) );
    assert.equal( id, 't5-6' );
    
    var t5_7_initialClass1 = 'classtoremove1',
        t5_7_initialClass2 = 'myclass',
        t5_7_initialClass3 = 'classtoremove2',
        t5_7_classArray = [ t5_7_initialClass1, t5_7_initialClass3 ];
    assert.ok( document.getElementById( 't5-7' ).classList.contains( t5_7_initialClass1 ) );
    assert.ok( document.getElementById( 't5-7' ).classList.contains( t5_7_initialClass2 ) );
    assert.ok( document.getElementById( 't5-7' ).classList.contains( t5_7_initialClass3 ) );
    id = zz( '#t5-7' )
        .removeClass( t5_7_classArray )
        .attr( 'id' );
    assert.notOk( document.getElementById( 't5-7' ).classList.contains( t5_7_initialClass1 ) );
    assert.ok( document.getElementById( 't5-7' ).classList.contains( t5_7_initialClass2 ) );
    assert.notOk( document.getElementById( 't5-7' ).classList.contains( t5_7_initialClass3 ) );
    assert.equal( id, 't5-7' );
    
    var t5_8_class1 = 'class1',
        t5_8_class2 = 'class2',
        t5_8_class3 = 'class3',
        t5_8_classArray = [ t5_8_class2, t5_8_class3 ];
    assert.ok( document.getElementById( 't5-8' ).classList.contains( t5_8_class1 ) );
    assert.notOk( document.getElementById( 't5-8' ).classList.contains( t5_8_class2 ) );
    assert.ok( document.getElementById( 't5-8' ).classList.contains( t5_8_class3 ) );
    id = zz( '#t5-8' )
        .toggleClass( t5_8_classArray )
        .attr( 'id' );
    assert.ok( document.getElementById( 't5-8' ).classList.contains( t5_8_class1 ) );
    assert.ok( document.getElementById( 't5-8' ).classList.contains( t5_8_class2 ) );
    assert.notOk( document.getElementById( 't5-8' ).classList.contains( t5_8_class3 ) );
    assert.equal( id, 't5-8' );
    
    var t5_9_initialClass1 = 'classtoremove1',
        t5_9_initialClass2 = 'classtoremove2';
    assert.ok( document.getElementById( 't5-9' ).classList.contains( t5_9_initialClass1 ) );
    assert.ok( document.getElementById( 't5-9' ).classList.contains( t5_9_initialClass2 ) );
    id = zz( '#t5-9' )
        .removeClass()
        .attr( 'id' );
    assert.notOk( document.getElementById( 't5-9' ).classList.contains( t5_9_initialClass1 ) );
    assert.notOk( document.getElementById( 't5-9' ).classList.contains( t5_9_initialClass2 ) );
    assert.equal( id, 't5-9' );
    
    var t5_10_class = 'addedclass';
    assert.notOk( document.getElementById( 't5-10' ).classList.contains( t5_10_class ) );
    id = zz( '#t5-10' )
        .toggleClass( t5_10_class, true )
        .attr( 'id' );
    assert.ok( document.getElementById( 't5-10' ).classList.contains( t5_10_class ) );
    assert.equal( id, 't5-10' );
    
    var t5_11_class = 'otherclass';
    assert.ok( document.getElementById( 't5-11' ).classList.contains( t5_11_class ) );
    id = zz( '#t5-11' )
        .toggleClass( t5_11_class, false )
        .attr( 'id' );
    assert.notOk( document.getElementById( 't5-11' ).classList.contains( t5_11_class ) );
    assert.equal( id, 't5-11' );
    
    var t5_12_class1 = 'class1',
        t5_12_class2 = 'class2',
        t5_12_class3 = 'class3',
        t5_12_classArray = [ t5_12_class2, t5_12_class3 ];
    assert.ok( document.getElementById( 't5-12' ).classList.contains( t5_12_class1 ) );
    assert.notOk( document.getElementById( 't5-12' ).classList.contains( t5_12_class2 ) );
    assert.notOk( document.getElementById( 't5-12' ).classList.contains( t5_12_class3 ) );
    id = zz( '#t5-12' )
        .toggleClass( t5_12_classArray, true )
        .attr( 'id' );
    assert.ok( document.getElementById( 't5-12' ).classList.contains( t5_12_class1 ) );
    assert.ok( document.getElementById( 't5-12' ).classList.contains( t5_12_class2 ) );
    assert.ok( document.getElementById( 't5-12' ).classList.contains( t5_12_class3 ) );
    assert.equal( id, 't5-12' );
    
    var t5_13_class1 = 'class1',
        t5_13_class2 = 'class2',
        t5_13_class3 = 'class3',
        t5_13_classArray = [ t5_13_class2, t5_13_class3 ];
    assert.ok( document.getElementById( 't5-13' ).classList.contains( t5_13_class1 ) );
    assert.ok( document.getElementById( 't5-13' ).classList.contains( t5_13_class2 ) );
    assert.ok( document.getElementById( 't5-13' ).classList.contains( t5_13_class3 ) );
    id = zz( '#t5-13' )
        .toggleClass( t5_13_classArray, false )
        .attr( 'id' );
    assert.ok( document.getElementById( 't5-13' ).classList.contains( t5_13_class1 ) );
    assert.notOk( document.getElementById( 't5-13' ).classList.contains( t5_13_class2 ) );
    assert.notOk( document.getElementById( 't5-13' ).classList.contains( t5_13_class3 ) );
    assert.equal( id, 't5-13' );
});

QUnit.test( 'after, before, append and prepend test', function( assert ) {
    var t6_1_original = '<li id=\"t6-1-1\">Text 1</li><li id=\"t6-1-2\">Text 2</li>',
        t6_1_modified = '<li id=\"t6-1-1\">Text 1</li><li>New text</li><li id=\"t6-1-2\">Text 2</li>';
    utils.assertHtml( assert, 't6-1', t6_1_original );
    var id = zz( '#t6-1-1' )
        .after( '<li>New text</li>' )
        .attr( 'id' );
    utils.assertHtml( assert, 't6-1', t6_1_modified );
    assert.equal( id, 't6-1-1' );
    
    var t6_2_original = '<li id=\"t6-2-1\">Text 1</li><li id=\"t6-2-2\">Text 2</li>',
        t6_2_modified = '<li id=\"t6-2-1\">Text 1</li><li>New text</li><li id=\"t6-2-2\">Text 2</li>';
    utils.assertHtml( assert, 't6-2', t6_2_original );
    id = zz( '#t6-2-2' )
        .before( '<li>New text</li>' )
        .attr( 'id' );
    utils.assertHtml( assert, 't6-2', t6_2_modified );
    assert.equal( id, 't6-2-2' );
    
    var t6_3_original = '<li id=\"t6-3-1\">Text 1</li><li id=\"t6-3-2\">Text 2</li>',
        t6_3_modified = '<li id=\"t6-3-1\">Text 1</li><li id=\"t6-3-2\">Text 2</li><li>New text</li>';
    utils.assertHtml( assert, 't6-3', t6_3_original );
    id = zz( '#t6-3' )
        .append( '<li>New text</li>' )
        .attr( 'id' );
    utils.assertHtml( assert, 't6-3', t6_3_modified );
    assert.equal( id, 't6-3' );
    
    var t6_4_original = '<li id=\"t6-4-1\">Text 1</li><li id=\"t6-4-2\">Text 2</li>',
        t6_4_modified = '<li>New text</li><li id=\"t6-4-1\">Text 1</li><li id=\"t6-4-2\">Text 2</li>';
    utils.assertHtml( assert, 't6-4', t6_4_original );
    id = zz( '#t6-4' )
        .prepend( '<li>New text</li>' )
        .attr( 'id' );
    utils.assertHtml( assert, 't6-4', t6_4_modified );
    assert.equal( id, 't6-4' );
});

QUnit.test( 'siblings, prev and next test', function( assert ) {
    var ids = [];
    zz( '#t7-1-2' )
        .siblings()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't7-1-1', 't7-1-3' ] );
    
    assert.equal( zz( '#t7-2-2' ).prev().attr( 'id' ), 't7-2-1' );
    
    assert.equal( zz( '#t7-2-2' ).next().attr( 'id' ), 't7-2-3' );
    
    ids = [];
    zz( '#t7-4-2' )
        .siblings( '.selected' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't7-4-1', 't7-4-4' ] );
});

QUnit.test( 'children, index and parent test', function( assert ) {
    var ids = [];
    zz( '#t8-1' ).children().each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't8-1-1', 't8-1-2', 't8-1-3' ] );
    
    assert.equal( zz( '#t8-2-1' ).index(), 1 );
    assert.equal( zz( '#t8-2-2' ).index(), 2 );
    assert.equal( zz( '#t8-2-3' ).index(), 3 );
    
    assert.equal( zz( '#t8-3-1' ).parent().attr( 'id' ), 't8-3' );
    assert.equal( zz( '#t8-3-2' ).parent().attr( 'id' ), 't8-3' );
    assert.equal( zz( '#t8-3-3' ).parent().attr( 'id' ), 't8-3' );
    
    ids = [];
    zz( '#t8-4' ).children( '.selected' ).each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't8-4-1', 't8-4-3' ] );
});

QUnit.test( 'filter and find test', function( assert ) {
    
    var eachFn = function( index, ss ){
        ids.push( ss.attr( 'id' ) ); 
        indexes.push( index );
    };
    
    var ids = [];
    var indexes = [];
    zz( '#t9-1' ).find( '.a' ).each( eachFn );
    assert.deepEqual( ids, [ 't9-1-1', 't9-1-2', 't9-1-3-1' ] );
    assert.deepEqual( indexes, [ 0, 1, 2 ] );
    
    ids = [];
    indexes = [];
    zz( '#t9-1' ).find( '.b' ).each( eachFn );
    assert.deepEqual( ids, [ 't9-1-1', 't9-1-3-2', 't9-1-4', 't9-1-4-2' ] );
    assert.deepEqual( indexes, [ 0, 1, 2, 3 ] );
    
    ids = [];
    indexes = [];
    zz( '#t9-1' ).find( '.a.b' ).each( eachFn );
    assert.deepEqual( ids, [ 't9-1-1' ] );
    assert.deepEqual( indexes, [ 0 ] );
    
    ids = [];
    indexes = [];
    zz( '#t9-1' ).find( '.c' ).each( eachFn );
    assert.deepEqual( ids, [] );
    assert.deepEqual( indexes, [] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-1' ).filter( '.a' ).each( eachFn );
    assert.deepEqual( ids, [ 't9-2-1' ] );
    assert.deepEqual( indexes, [ 0 ] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-1' ).filter( '.b' ).each( eachFn );
    assert.deepEqual( ids, [] );
    assert.deepEqual( indexes, [] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-1' ).filter( '.a.b' ).each( eachFn );
    assert.deepEqual( ids, [] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-2' ).filter( '.a' ).each( eachFn );
    assert.deepEqual( ids, [ 't9-2-2' ] );
    assert.deepEqual( indexes, [ 0 ] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-2' ).filter( '.b' ).each( eachFn );
    assert.deepEqual( ids, [ 't9-2-2' ] );
    assert.deepEqual( indexes, [ 0 ] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-2' ).filter( '.a.b' ).each( eachFn );
    assert.deepEqual( ids, [ 't9-2-2' ] );
    assert.deepEqual( indexes, [ 0 ] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-3' ).filter( '.a' ).each( eachFn );
    assert.deepEqual( ids, [] );
    assert.deepEqual( indexes, [] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-3' ).filter( '.b' ).each( eachFn );
    assert.deepEqual( ids, [] );
    assert.deepEqual( indexes, [] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-3' ).filter( '.a.b' ).each( eachFn );
    assert.deepEqual( ids, [] );
    assert.deepEqual( indexes, [] );
    
    var fIndexes = [];
    var fIds = [];
    
    var filterFn = function( index, ss ){
        var result = ss.attr( 'class' ) === 'a b';
        if ( result ){
            fIndexes.push( index );
            fIds.push( this.getAttribute( 'id' ) );
        }
        return result;
    };
    
    ids = [];
    indexes = [];
    fIndexes = [];
    zz( '#t9-2-1' )
        .filter( filterFn )
        .each( eachFn );
    assert.deepEqual( ids, [] );
    assert.deepEqual( indexes, [] );
    assert.deepEqual( fIndexes, [] );
    assert.deepEqual( fIds, [] );
    
    ids = [];
    indexes = [];
    fIndexes = [];
    zz( '#t9-2-2' )
        .filter( filterFn )
        .each( eachFn );
    assert.deepEqual( ids, [ 't9-2-2' ] );
    assert.deepEqual( indexes, [ 0 ] );
    assert.deepEqual( fIndexes, [ 0 ] );
    assert.deepEqual( fIds, [ 't9-2-2' ] );
});

QUnit.test( 'clone and is test', function( assert ) {
    var t10_1_original = `
<div class="t10-1-1">
  Hello
</div>

<div id="t10-1-2">
  Goodbye
</div>
`,
        t10_1_modified = `
	
<div class="t10-1-1">
  Hello
</div>

<div id="t10-1-2">
  Goodbye

  <div class="t10-1-1">
    Hello
  </div>
</div>
`;
    utils.assertHtml( assert, 't10-1', t10_1_original );
    var cssClass = zz( '.t10-1-1' )
        .clone()
        .appendTo( '#t10-1-2' )
        .attr( 'class' );
        assert.equal( cssClass, 't10-1-1' );
    utils.assertHtml( assert, 't10-1', t10_1_modified );
    
    assert.notOk( zz( '#t10-2' ).is( null ) );
    
    assert.ok( zz( '#t10-2' ).is( document.getElementById( 't10-2' ) ) );
    assert.notOk( zz( '#t10-2' ).is( document.getElementById( 't10-1' ) ) );
    
    assert.ok( zz( '#t10-2' ).is( zz( '#t10-2' ) ) );
    assert.notOk( zz( '#t10-2' ).is( zz( '#t10-1' ) ) );
    
    assert.ok( zz( '#t10-2' ).is( 'div' ) );
    assert.notOk( zz( '#t10-2' ).is( 'span' ) );
    
    assert.ok( zz( '#t10-3-1' ).is( zz( '.t10-3' ) ) );
    assert.notOk( zz( '#t10-3' ).is( zz( '.t10-3' ) ) );
});

QUnit.test( 'css test', function( assert ) {
    var t11_1_original = null,
        t11_1_modified = 'color: red;';
    assert.equal( document.getElementById( 't11-1' ).getAttribute( 'style' ), t11_1_original );
    var id = zz( '#t11-1' )
        .css( 'color', 'red' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't11-1' ).getAttribute( 'style' ), t11_1_modified );
    assert.equal( zz( '#t11-1' ).css( 'color' ), 'rgb(255, 0, 0)' );
    assert.equal( id, 't11-1' );
    
    var t11_2_original = null,
        t11_2_modified = 'background-color: red;';
    assert.equal( document.getElementById( 't11-2' ).getAttribute( 'style' ), t11_2_original );
    id = zz( '#t11-2' )
        .css( 'background-color', 'red' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't11-2' ).getAttribute( 'style' ), t11_2_modified );
    assert.equal( zz( '#t11-2' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    assert.equal( id, 't11-2' );
    
    var t11_3_original = 'color: green',
        t11_3_modified = 'color: red;';
    assert.equal( document.getElementById( 't11-3' ).getAttribute( 'style' ), t11_3_original );
    id = zz( '#t11-3' )
        .css( 'color', 'red' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't11-3' ).getAttribute( 'style' ), t11_3_modified );
    assert.equal( zz( '#t11-3' ).css( 'color' ), 'rgb(255, 0, 0)' );
    assert.equal( id, 't11-3' );
    
    var t11_4_original = 'color: green',
        t11_4_modified = 'color: green; background-color: red;';
    assert.equal( document.getElementById( 't11-4' ).getAttribute( 'style' ), t11_4_original );
    id = zz( '#t11-4' )
        .css( 'background-color', 'red' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't11-4' ).getAttribute( 'style' ), t11_4_modified );
    assert.equal( zz( '#t11-4' ).css( 'color' ), 'rgb(0, 128, 0)' );
    assert.equal( zz( '#t11-4' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    assert.equal( id, 't11-4' );
    
    var t11_5_original = null,
        t11_5_modified = 'color: white; background-color: red;';
    assert.equal( document.getElementById( 't11-5' ).getAttribute( 'style' ), t11_5_original );
    id = zz( '#t11-5' )
        .css({
            color: 'white',
            'background-color': 'red' 
        }).attr( 'id' );
    assert.equal( document.getElementById( 't11-5' ).getAttribute( 'style' ), t11_5_modified );
    assert.equal( zz( '#t11-5' ).css( 'color' ), 'rgb(255, 255, 255)' );
    assert.equal( zz( '#t11-5' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    assert.equal( id, 't11-5' );
    
    var t11_6_original = null,
        t11_6_modified = 'color: white; background-color: red;';
    assert.equal( document.getElementById( 't11-6' ).getAttribute( 'style' ), t11_6_original );
    id = zz( '#t11-6' )
        .css({
            color: 'white',
            'background-color': 'red' 
        }).attr( 'id' );
    assert.equal( document.getElementById( 't11-6' ).getAttribute( 'style' ), t11_6_modified );
    assert.equal( zz( '#t11-6' ).css( 'color' ), 'rgb(255, 255, 255)' );
    assert.equal( zz( '#t11-6' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    assert.equal( id, 't11-6' );
    
    var t11_7_original = null,
        t11_7_modified = 'font-size: 30px;';
    assert.equal( document.getElementById( 't11-7' ).getAttribute( 'style' ), t11_7_original );
    id = zz( '#t11-7' )
        .css(
            'font-size', 30 
        ).attr( 'id' );
    assert.equal( document.getElementById( 't11-7' ).getAttribute( 'style' ), t11_7_modified );
    assert.equal( zz( '#t11-7' ).css( 'font-size' ), '30px' );
    assert.equal( id, 't11-7' );
    
    var t11_8_original = null,
        t11_8_modified = 'font-size: 30px;';
    assert.equal( document.getElementById( 't11-8' ).getAttribute( 'style' ), t11_8_original );
    id = zz( '#t11-8' )
        .css(
            'font-size', '30'
        ).attr( 'id' );
    assert.equal( document.getElementById( 't11-8' ).getAttribute( 'style' ), t11_8_modified );
    assert.equal( zz( '#t11-8' ).css( 'font-size' ), '30px' );
    assert.equal( id, 't11-8' );
    
    var t11_9_original = null,
        t11_9_modified = 'font-size: 25px;',
        t11_9_f_id,
        t11_9_f_index,
        t11_9_f_fsize;
    assert.equal( document.getElementById( 't11-9' ).getAttribute( 'style' ), t11_9_original );
    id = zz( '#t11-9' )
        .css(
            'font-size', 
            function( index, ss ){ 
                t11_9_f_index = index;
                t11_9_f_fsize = this.getAttribute( 'data-fsize' );
                return ss.attr( 'data-fsize' );
            }
        ).attr( 'id' );
    assert.equal( document.getElementById( 't11-9' ).getAttribute( 'style' ), t11_9_modified );
    assert.equal( zz( '#t11-9' ).css( 'font-size' ), '25px' );
    assert.equal( id, 't11-9' );
    assert.equal( t11_9_f_index, 0 );
    assert.equal( t11_9_f_fsize, '25px' );
});

QUnit.test( 'height, width, outerHeight and outerWidth test', function( assert ) {
    var id = zz( '#t12-1' )
        .height( '2em' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't12-1' ).getAttribute( 'style' ), 'height: 2em;' );
    assert.equal( zz( '#t12-1' ).height(), 32 );
    assert.equal( id, 't12-1' );
    
    id = zz( '#t12-2' )
        .height( 100 )
        .attr( 'id' );
    assert.equal( document.getElementById( 't12-2' ).getAttribute( 'style' ), 'height: 100px;' );
    assert.equal( zz( '#t12-2' ).height(), 100 );
    assert.equal( id, 't12-2' );
    
    id = zz( '#t12-3' )
        .width( '10em' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't12-3' ).getAttribute( 'style' ), 'width: 10em;' );
    assert.equal( zz( '#t12-3' ).width(), 160 );
    assert.equal( id, 't12-3' );
    
    id = zz( '#t12-4' )
        .height( 800 )
        .attr( 'id' );
    assert.equal( document.getElementById( 't12-4' ).getAttribute( 'style' ), 'height: 800px;' );
    assert.equal( zz( '#t12-4' ).height(), 800 );
    assert.equal( id, 't12-4' );
    
    id = zz( '#t12-5' )
        .height( '2em' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't12-5' ).getAttribute( 'style' ), 'height: 2em;' );
    assert.equal( zz( '#t12-5' ).outerHeight(), 64 );
    assert.equal( zz( '#t12-5' ).outerHeight( true ), 80 );
    assert.equal( id, 't12-5' );
    
    id = zz( '#t12-6' )
        .height( 100 )
        .attr( 'id' );
    assert.equal( document.getElementById( 't12-6' ).getAttribute( 'style' ), 'height: 100px;' );
    assert.equal( zz( '#t12-6' ).outerHeight(), 132 );
    assert.equal( zz( '#t12-6' ).outerHeight( true ), 148 );
    assert.equal( id, 't12-6' );
    
    id = zz( '#t12-7' )
        .height( '10em' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't12-7' ).getAttribute( 'style' ), 'height: 10em;' );
    assert.equal( zz( '#t12-7' ).outerHeight(), 192 );
    assert.equal( zz( '#t12-7' ).outerHeight( true ), 208 );
    assert.equal( id, 't12-7' );
    
    id = zz( '#t12-8' )
        .height( 800 )
        .attr( 'id' );
    assert.equal( document.getElementById( 't12-8' ).getAttribute( 'style' ), 'height: 800px;' );
    assert.equal( zz( '#t12-8' ).outerHeight(), 832 );
    assert.equal( zz( '#t12-8' ).outerHeight( true ), 848 );
    assert.equal( id, 't12-8' );
    
    //assert.notOk( zz( '#t12-9' ).isVisible() );
    assert.notOk( !! zz( '#t12-9' ).el.offsetParent );
    assert.equal( zz( '#t12-9' ).width(), 64 );
    assert.equal( zz( '#t12-9' ).height(), 37 );
    assert.equal( zz( '#t12-9' ).outerWidth(), 64 );
    assert.equal( zz( '#t12-9' ).outerHeight(), 37 );
    
    //assert.notOk( zz( '#t12-10' ).isVisible() );
    assert.notOk( !! zz( '#t12-10' ).el.offsetParent );
    assert.equal( zz( '#t12-10' ).width(), 64 );
    assert.equal( zz( '#t12-10' ).height(), 37 );
    assert.equal( zz( '#t12-10' ).outerWidth(), 74 );
    assert.equal( zz( '#t12-10' ).outerHeight(), 47 );
    assert.equal( zz( '#t12-10' ).outerWidth( true ), 82 );
    assert.equal( zz( '#t12-10' ).outerHeight( true ), 55 );
});

QUnit.test( 'offset, offsetParent and position test', function( assert ) {
    var id = zz( '#t13-1-div' )
        .offset( { top: 25, left: 30 } )
        .attr( 'id' );
    var offset = zz( '#t13-1-div' ).offset();
    assert.equal( document.getElementById( 't13-1-div' ).getAttribute( 'style' ), 'top: 25px; left: 30px;' );
    assert.equal( id, 't13-1-div' );
    
    //TODO Test offset() is hard!
    
    assert.notOk( zz( '#t13-2-1' ).hasClass( 'selected' ) );
    id = zz( '#t13-2-2' )
        .offsetParent()
        .addClass( 'selected' )
        .attr( 'id' );
    assert.ok( zz( '#t13-2-1' ).hasClass( 'selected' ) );
    assert.equal( id, 't13-2-1' );
    
    var position = zz( '#t13-3-div' ).position();
    assert.equal( position.top, 35 );
    assert.equal( position.left, 320 );
});

QUnit.test( 'appendTo test', function( assert ) {
    var t16_1_original = 'This is the container t16-1',
        t16_1_modified = `
This is the container t16-1

<div id="t16-1-1">
  New div 1
</div>
`;
    utils.assertHtml( assert, 't16-1', t16_1_original );
    var id = zz( '<div id="t16-1-1">New div 1</div>' )
        .appendTo( '#t16-1' )
        .attr( 'id' );
    utils.assertHtml( assert, 't16-1', t16_1_modified );
    assert.equal( id, 't16-1-1' );
    
    var t16_2_original = 'This is the container t16-2',
        t16_2_modified = `
This is the container t16-2

<div id="t16-2-1">
  New div 2
</div>
`;
    utils.assertHtml( assert, 't16-2', t16_2_original );
    id = zz( '<div id="t16-2-1">New div 2</div>' )
        .appendTo( document.getElementById( 't16-2' ) )
        .attr( 'id' );
    utils.assertHtml( assert, 't16-2', t16_2_modified );
    assert.equal( id, 't16-2-1' );
    
    var t16_3_original = 'This is the container t16-3',
        t16_3_modified = `
This is the container t16-3

<div id="t16-3-1">
  New div 3
</div>
`;
    utils.assertHtml( assert, 't16-3', t16_3_original );
    id = zz( '<div id="t16-3-1">New div 3</div>' )
        .appendTo( zz( '#t16-3' ) )
        .attr( 'id' );
    utils.assertHtml( assert, 't16-3', t16_3_modified );
    assert.equal( id, 't16-3-1' );
    
    var t16_4_original = `
<div class="container t16-4-class" id="t16-4a">
  This is the container t16-4a
</div>

<div>
  Separator 1
</div>

<div class="container t16-4-class" id="t16-4b">
  This is the container t16-4b
</div>

<div>
  Separator 2
</div>

<div class="container t16-4-class" id="t16-4c">
  This is the container t16-4c
</div>
`,
        t16_4_modified = `
<div class="container t16-4-class" id="t16-4a">
  This is the container t16-4a

  <div id="t16-4-1">
    New div 4
  </div>
</div>

<div>
  Separator 1
</div>

<div class="container t16-4-class" id="t16-4b">
  This is the container t16-4b

  <div id="t16-4-1">
    New div 4
  </div>
</div>

<div>
  Separator 2
</div>

<div class="container t16-4-class" id="t16-4c">
  This is the container t16-4c

  <div id="t16-4-1">
    New div 4
  </div>
</div>
`;
    utils.assertHtml( assert, 't16-4', t16_4_original );
    id = zz( '<div id="t16-4-1">New div 4</div>' )
        .appendTo( zz( '.t16-4-class' ) )
        .attr( 'id' );
    utils.assertHtml( assert, 't16-4', t16_4_modified );
    assert.equal( id, 't16-4-1' );
    
    var t16_5_original = 'This is the container t16-5',
        t16_5_modified = t16_5_original;
    utils.assertHtml( assert, 't16-5', t16_5_original );
    id = zz( '<div id="t16-5-1">New div 5</div>' )
        .appendTo( document.getElementById( 'non-existing-id-DOM' ) )
        .attr( 'id' );
    utils.assertHtml( assert, 't16-5', t16_5_modified );
    assert.equal( id, 't16-5-1' );
});

QUnit.test( 'each test', function( assert ) {
    var currentValues = [];
    var indexes = [];
    var arrays = [];
    var thisValues = [];
    
    zz( '#t17-1' ).each( 
        function( index, currentValue, array ){
            currentValues.push( currentValue );
            indexes.push( index );
            arrays.push( array );
            thisValues.push( this );
        }
    );
    
    assert.equal( currentValues.length, 1 );
    assert.equal( currentValues[ 0 ].attr( 'id' ), 't17-1' );
    assert.deepEqual( indexes, [ 0 ] );
    assert.equal( arrays.length, 1 );
    assert.equal( arrays[ 0 ].length, 1 );
    assert.equal( arrays[ 0 ][ 0 ].getAttribute( 'id' ), 't17-1' );
    assert.equal( thisValues.length, 1 );
    assert.equal( thisValues[ 0 ].getAttribute( 'id' ), 't17-1' );
});

QUnit.test( 'array like syntax test', function( assert ) {    
    assert.equal( zz( '#t18-1' ).length, 1 );
    
    assert.ok( zz( '#t18-1' )[ 0 ] instanceof Element );
    assert.equal( zz( '#t18-1' )[ 0 ].getAttribute( 'id' ), 't18-1' );
    
    assert.ok( zz( '#t18-1' )[ 1 ] === undefined );
    
    assert.ok( zz( '#t18-1' )[ 2 ] === undefined );
    
    var ids = [];
    var $divs = zz( '#t18-1' );
    for ( var c = 0; c < $divs.length; ++c ){
        ids.push( $divs[ c ].getAttribute( 'id' ) );
    }
    assert.deepEqual( ids, [ 't18-1' ] );
});

QUnit.test( 'parents test', function( assert ) {
    var eachFn = function( index, ss ){
        ids.push( ss.attr( 'id' ) ); 
        indexes.push( index );
    };
    
    var ids = [];
    var indexes = [];
    zz( '#t22-1-1-1' )
        .parents()
        .each( eachFn );
    assert.deepEqual( ids, [ 't22-1-1', 't22-1', 't22', 'body', 'html' ] );
    assert.deepEqual( indexes, [ 0, 1, 2, 3, 4 ] );

    ids = [];
    indexes = [];
    zz( '#t22-1-1-2' )
        .parents()
        .each( eachFn );
    assert.deepEqual( ids, [ 't22-1-1', 't22-1', 't22', 'body', 'html' ] );
    assert.deepEqual( indexes, [ 0, 1, 2, 3, 4 ] );

    ids = [];
    indexes = [];
    zz( '#t22-1-2-1' )
        .parents()
        .each( eachFn );
    assert.deepEqual( ids, [ 't22-1-2', 't22-1', 't22', 'body', 'html' ] );
    assert.deepEqual( indexes, [ 0, 1, 2, 3, 4 ] );

    ids = [];
    indexes = [];
    zz( '#t22-1-2-2' )
        .parents()
        .each( eachFn );
    assert.deepEqual( ids, [ 't22-1-2', 't22-1', 't22', 'body', 'html' ] );
    assert.deepEqual( indexes, [ 0, 1, 2, 3, 4 ] );

    ids = [];
    indexes = [];
    zz( '#t22-1-1-1' )
        .parents( '.a' )
        .each( eachFn );
    assert.deepEqual( ids, [ 't22-1-1', 't22' ] );
    assert.deepEqual( indexes, [ 0, 1 ] );

    ids = [];
    indexes = [];
    zz( '#t22-1-1-1' )
        .parents( '.b' )
        .each( eachFn );
    assert.deepEqual( ids, [ 't22-1' ] );
    assert.deepEqual( indexes, [ 0 ] );

    ids = [];
    indexes = [];
    zz( '#t22-1-2-1' )
        .parents( '.a' )
        .each( eachFn );
    assert.deepEqual( ids, [ 't22' ] );
    assert.deepEqual( indexes, [ 0 ] );

    ids = [];
    indexes = [];
    zz( '#t22-1-2-1' )
        .parents( '.b' )
        .each( eachFn );
    assert.deepEqual( ids, [ 't22-1-2', 't22-1' ] );
    assert.deepEqual( indexes, [ 0, 1 ] );
});

QUnit.test( 'first test', function( assert ) {
    var eachFn = function( index, ss ){
        ids.push( ss.attr( 'id' ) ); 
        indexes.push( index );
    };
    
    var ids = [];
    var indexes = [];
    zz( '#t23-1' )
        .first()
        .each( eachFn );
    assert.deepEqual( ids, [ 't23-1' ] );
    assert.deepEqual( indexes, [ 0 ] );
});

QUnit.test( 'get test', function( assert ) {
    
    var eachFn = function( nodes ){
        const result = [];
        for ( const el of nodes ){
            result.push( el.getAttribute( 'id' ) ); 
        }
        return result;
    };
    
    // Test .get()
    var nodes = zz( '#t24-1' ).get();
    var ids = eachFn( nodes );
    assert.deepEqual( ids, [ 't24-1' ] );

    // Test .get( 0 )
    var el = zz( '#t24-1' ).get( 0 );
    var id = el.getAttribute( 'id' );
    assert.deepEqual( id, 't24-1' );

    // Test .get( 1 ) -> Array has just 1 element
    el = zz( '#t24-1' ).get( 1 );
    assert.deepEqual( el, undefined );
});

QUnit.test( 'map test', function( assert ) {
  
    var ids = zz( '.t25' ).map(
        function() {
            return this.id;
        })
    .get()
    .join('|');

    assert.deepEqual( ids, 't25-1' );

    ids = zz( '.t25' ).map(
        function( i, node) {
            return i + ':' + node.id;
        })
    .get()
    .join('|');

    assert.deepEqual( ids, '0:t25-1' );
});


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

    // Test on using trigger params
    // Use t14-10c as a counter of clicks
    var t10Listener = function( e ){ 
        var current = parseInt( zz( '#t14-10c' ).text(), 10 );
        zz( '#t14-10c' ).text( current + e.params.delta );
    };
    zz( '#t14-10b' ).on( 'click', t10Listener );

    zz( '#t14-10b' ).trigger(
        'click',
        {
            delta: 15
        }
    );
    assert.equal( zz( '#t14-10c' ).text(), '15' );

    zz( '#t14-10b' ).trigger(
        'click',
        {
            delta: 10
        }
    );
    assert.equal( zz( '#t14-10c' ).text(), '25' );

    // Test on using data and trigger params
    // Use t14-11c as a counter of clicks
    var t11Listener = function( e ){ 
        var current = parseInt( zz( '#t14-11c' ).text(), 10 );
        zz( '#t14-11c' ).text( current + e.data.delta + e.params.delta );
    };
    zz( '#t14-11b' ).on( 
        'click', 
        t11Listener, 
        {
            delta: 2
        }
    );
    zz( '#t14-11b' ).trigger(
        'click',
        {
            delta: 5
        }
    );
    assert.equal( zz( '#t14-11c' ).text(), '7' );

    zz( '#t14-11b' ).trigger(
        'click',
        {
            delta: 3
        }
    );
    assert.equal( zz( '#t14-11c' ).text(), '12' );
});

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
QUnit.test( 'val and checked test', function( assert ) {
    var t19_1_original = 'test value t19-1',
        t19_1_modified = t19_1_original + ' modified',
        t19_2_original = 'test value t19-2',
        t19_2_modified = t19_2_original + ' modified',
        t19_3_original = 'test value t19-3',
        t19_3_modified = t19_3_original + ' modified',
        t19_4_original = 'mozilla',
        t19_4_modified = 'fsf',
        t19_5_original = [ 'mozilla', 'linux' ],
        t19_5_modified = [ 'fsf', 'linux' ];
    assert.equal( zz( '#t19-1' ).val(), t19_1_original );
    assert.equal( zz( '#t19-2' ).val(), t19_2_original );
    assert.equal( zz( '#t19-3' ).val(), t19_3_original );
    assert.equal( zz( '#t19-4' ).val(), t19_4_original );
    assert.deepEqual( zz( '#t19-5' ).val(), t19_5_original );
    
    zz( '#t19-1' ).val( t19_1_modified );
    assert.equal( zz( '#t19-1' ).val(), t19_1_modified );
    
    zz( '#t19-2' ).val( t19_2_modified );
    assert.equal( zz( '#t19-2' ).val(), t19_2_modified );
    
    zz( '#t19-3' ).val( t19_3_modified );
    assert.equal( zz( '#t19-3' ).val(), t19_3_modified );
    
    zz( '#t19-4' ).val( t19_4_modified );
    assert.equal( zz( '#t19-4' ).val(), t19_4_modified );
    
    zz( '#t19-5' ).val( t19_5_modified );
    assert.deepEqual( zz( '#t19-5' ).val(), t19_5_modified );
    
    assert.notOk( zz( '#t19-6' ).checked() );
    zz( '#t19-6' ).checked( true );
    assert.ok( zz( '#t19-6' ).checked() );
    zz( '#t19-6' ).checked( false );
    assert.notOk( zz( '#t19-6' ).checked() );
    
    assert.ok( zz( '#t19-7' ).checked() );
    zz( '#t19-7' ).checked( false );
    assert.notOk( zz( '#t19-7' ).checked() );
    zz( '#t19-7' ).checked( true );
    assert.ok( zz( '#t19-7' ).checked() );
});

QUnit.test( 'disabled test', function( assert ) {
    var t26_1_original = 'test value t26-1';
    assert.equal( zz( '#t26-1' ).val(), t26_1_original );
    assert.notOk( zz( '#t26-1' ).disabled() );

    zz( '#t26-1' ).disabled( true );
    assert.ok( zz( '#t26-1' ).disabled() );

    zz( '#t26-1' ).disabled( false );
    assert.notOk( zz( '#t26-1' ).disabled() );

    zz( '#t26-1' ).disabled( true );
    assert.ok( zz( '#t26-1' ).disabled() );
});

/*
(From https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate)
Elements targeted by this selector are:

<input type="checkbox"> elements whose indeterminate property is set to true
<input type="radio"> elements, when all radio buttons with the same name value in the form are unchecked
<progress> elements in an indeterminate state
*/
QUnit.test( 'indeterminate checkbox test', function( assert ) {

    assert.notOk( zz( '#t27-1' ).indeterminate() );

    zz( '#t27-1' ).indeterminate( true );
    assert.ok( zz( '#t27-1' ).indeterminate() );

    zz( '#t27-1' ).indeterminate( false );
    assert.notOk( zz( '#t27-1' ).indeterminate() );

    zz( '#t27-1' ).indeterminate( true );
    assert.ok( zz( '#t27-1' ).indeterminate() );
});

QUnit.test( 'prop test', function( assert ) {

    // checked
    assert.notOk( zz( '#t28-1' ).prop( 'checked' ) );

    zz( '#t28-1' ).prop( 'checked', true );
    assert.ok( zz( '#t28-1' ).prop( 'checked' ) );

    zz( '#t28-1' ).prop( 'checked', false );
    assert.notOk( zz( '#t28-1' ).prop( 'checked' ) );
    
    zz( '#t28-1' ).prop( 'checked', true );
    assert.ok( zz( '#t28-1' ).prop( 'checked' ) );

    // disabled
    assert.notOk( zz( '#t28-2' ).prop( 'disabled' ) );

    zz( '#t28-2' ).prop( 'disabled', true );
    assert.ok( zz( '#t28-2' ).prop( 'disabled' ) );

    zz( '#t28-2' ).prop( 'disabled', false );
    assert.notOk( zz( '#t28-2' ).prop( 'disabled' ) );

    zz( '#t28-2' ).prop( 'disabled', true );
    assert.ok( zz( '#t28-2' ).prop( 'disabled' ) );

    // indeterminate
    assert.notOk( zz( '#t28-3' ).prop( 'indeterminate' ) );

    zz( '#t28-3' ).prop( 'indeterminate', true );
    assert.ok( zz( '#t28-3' ).prop( 'indeterminate' ) );

    zz( '#t28-3' ).prop( 'indeterminate', false );
    assert.notOk( zz( '#t28-3' ).prop( 'indeterminate' ) );

    zz( '#t28-3' ).prop( 'indeterminate', true );
    assert.ok( zz( '#t28-3' ).prop( 'indeterminate' ) );
});

QUnit.test( 'center test', function( assert ) {
    var t20_1_x_original = ( document.documentElement.clientWidth - 75 ) / 2,
        t20_1_y_original = ( document.documentElement.clientHeight - 50 ) / 2,
        t20_1_pos_original = {
            top: t20_1_y_original,
            left: t20_1_x_original
        },
        t20_2_x_original = 500,
        t20_2_x_modified = ( document.documentElement.clientWidth - 75 ) / 2,
        t20_3_y_original = 800,
        t20_3_y_modified = ( document.documentElement.clientHeight - 50 ) / 2,
        t20_4_x_original = 100,
        t20_4_y_original = 120,
        t20_4_x_modified = ( document.documentElement.clientWidth - 75 ) / 2,
        t20_4_y_modified = ( document.documentElement.clientHeight - 50 ) / 2;
    
    assert.equal( zz( '#t20-1' ).getXCenter(), t20_1_x_original );
    assert.equal( zz( '#t20-1' ).getYCenter(), t20_1_y_original );
    assert.deepEqual( zz( '#t20-1' ).getCenter(), t20_1_pos_original );
    
    assert.equal( zz( '#t20-2' ).position().left, t20_2_x_original );
    zz( '#t20-2' ).centerX();
    assert.ok( zz( '#t20-2' ).position().left - t20_2_x_modified < 1 );
    
    assert.equal( zz( '#t20-3' ).position().top, t20_3_y_original );
    zz( '#t20-3' ).centerY();
    assert.ok( zz( '#t20-3' ).position().top - t20_3_y_modified < 1 );
    
    assert.equal( zz( '#t20-4' ).position().left, t20_4_x_original );
    assert.equal( zz( '#t20-4' ).position().top, t20_4_y_original );
    zz( '#t20-4' ).center();
    assert.ok( zz( '#t20-4' ).position().left - t20_4_x_modified < 1 );
    //assert.equal( zz( '#t20-4' ).position().top, t20_4_y_modified );
    //alert(zz( '#t20-4' ).position().top - t20_4_y_modified);
    assert.ok( zz( '#t20-4' ).position().top - t20_4_y_modified < 1 );
});
