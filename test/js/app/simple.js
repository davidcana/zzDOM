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
    
    var ids = [];
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
    
    // TODO Test offset() is hard!
    
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

QUnit.test( 'trigger test', function( assert ) {
    // Use t14-2 as a counter of clicks
    zz( '#t14-1' ).el.addEventListener( 
        'click', 
        function(){ 
            var current = parseInt( zz( '#t14-2' ).text() );
            zz( '#t14-2' ).text( ++current );
        } 
    );
    
    assert.equal( zz( '#t14-2' ).text(), '0' );
    var id = zz( '#t14-1' )
        .trigger( 'click' )
        .attr( 'id' );
    assert.equal( zz( '#t14-2' ).text(), '1' );
    assert.equal( id, 't14-1' );
    
    id = zz( '#t14-1' )
        .trigger( 'click' )
        .attr( 'id' );
    assert.equal( zz( '#t14-2' ).text(), '2' );
    assert.equal( id, 't14-1' );
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
