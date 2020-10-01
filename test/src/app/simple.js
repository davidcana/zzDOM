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
        .each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't7-1-1', 't7-1-3' ] );
    
    assert.equal( zz( '#t7-2-2' ).prev().attr( 'id' ), 't7-2-1' );
    
    assert.equal( zz( '#t7-2-2' ).next().attr( 'id' ), 't7-2-3' );
    
    ids = [];
    zz( '#t7-4-2' )
        .siblings( '.selected' )
        .each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
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
