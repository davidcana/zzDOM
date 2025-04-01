"use strict";

// Unit tests
QUnit.test( 'text and html test', function( assert ) {
    var t1_1_original = [ 'white', 'black', 'red' ],
        t1_1_modified = 'yellow',
        t1_1_modified_class = 'yellow yellow yellow';
    assert.equal( document.getElementById( 't1-1' ).textContent, t1_1_original[ 0 ] );
    assert.equal( document.getElementById( 't1-2' ).textContent, t1_1_original[ 1 ] );
    assert.equal( document.getElementById( 't1-3' ).textContent, t1_1_original[ 2 ] );
    var ids = [];
    zz( '.t1-1' )
        .text( t1_1_modified )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.equal( zz( '#t1-1' ).text(), t1_1_modified );
    assert.equal( zz( '#t1-2' ).text(), t1_1_modified );
    assert.equal( zz( '#t1-3' ).text(), t1_1_modified );
    assert.deepEqual( ids, [ 't1-1', 't1-2', 't1-3' ] );
    assert.equal( zz( '.t1-1' ).text(), t1_1_modified_class );
    
    var t1_2_original = [ 
        '<a href="https://www.fsf.org/">FSF</a>', 
        '<a href="https://ubuntu.com/">Ubuntu</a>', 
        '<a href="https://www.npmjs.com/">NPM</a>' 
        ],
        t1_2_modified = '<a href="https://www.mozilla.org/">mozilla</a>';
    assert.equal( document.getElementById( 't1-4' ).innerHTML, t1_2_original[ 0 ] );
    assert.equal( document.getElementById( 't1-5' ).innerHTML, t1_2_original[ 1 ] );
    assert.equal( document.getElementById( 't1-6' ).innerHTML, t1_2_original[ 2 ] );
    ids = [];
    zz( '.t1-2' )
        .html( t1_2_modified )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.equal( zz( '#t1-4' ).html(), t1_2_modified );
    assert.equal( zz( '#t1-5' ).html(), t1_2_modified );
    assert.equal( zz( '#t1-6' ).html(), t1_2_modified );
    assert.deepEqual( ids, [ 't1-4', 't1-5', 't1-6' ] );
    assert.equal( zz( '.t1-2' ).html(), t1_2_modified );
});

QUnit.test( 'remove and empty test', function( assert ) {
    var t2_1_original = [ 'To remove', 'Not to remove', 'To remove' ];
    assert.equal( document.getElementById( 't2-1' ).textContent, t2_1_original[ 0 ] );
    assert.equal( document.getElementById( 't2-2' ).textContent, t2_1_original[ 1 ] );
    assert.equal( document.getElementById( 't2-3' ).textContent, t2_1_original[ 2 ] );
    var ids = [];
    zz( '.t2-1.remove' )
        .remove()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't2-1', 't2-3' ] );
    assert.equal( zz( '#t2-2' ).text(), t2_1_original[ 1 ] );
    ids = [];
    zz( '.t2-1' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't2-2' ] );
    
    var t2_2_original = [ 'To be empty', 'To be empty', 'Not to be empty' ];
    assert.equal( document.getElementById( 't2-4' ).innerHTML, t2_2_original[ 0 ] );
    assert.equal( document.getElementById( 't2-5' ).innerHTML, t2_2_original[ 1 ] );
    assert.equal( document.getElementById( 't2-6' ).innerHTML, t2_2_original[ 2 ] );
    ids = [];
    zz( '.t2-2.empty' )
        .empty()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.equal( zz( '#t2-4' ).text(), '' );
    assert.equal( zz( '#t2-5' ).text(), '' );
    assert.equal( zz( '#t2-6' ).text(), t2_2_original[ 2 ] );
    assert.deepEqual( ids, [ 't2-4', 't2-5' ] );
    ids = [];
    zz( '.t2-2' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't2-4', 't2-5', 't2-6' ] );
});

QUnit.test( 'replaceWith test', function( assert ) {
    var t3_1_original = [ 
        '<span id="t3-1-in" class="t3-1-in replace">To replace</span>', 
        '<span id="t3-2-in" class="t3-1-in">Not to replace</span>', 
        '<span id="t3-3-in" class="t3-1-in replace">To replace</span>'
    ],
        t3_1_modified = 'Replaced text';
    assert.equal( document.getElementById( 't3-1' ).innerHTML, t3_1_original[ 0 ] );
    assert.equal( document.getElementById( 't3-2' ).innerHTML, t3_1_original[ 1 ] );
    assert.equal( document.getElementById( 't3-3' ).innerHTML, t3_1_original[ 2 ] );
    var ids = [];
    zz( '.t3-1-in.replace' )
        .replaceWith( t3_1_modified )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't3-1-in', 't3-3-in' ] );
    assert.equal( zz( '#t3-1' ).html(), t3_1_modified );
    assert.equal( zz( '#t3-2' ).html(), t3_1_original[ 1 ] );
    assert.equal( zz( '#t3-3' ).html(), t3_1_modified );
    ids = [];
    zz( '.t3-1-in' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't3-2-in' ] );
});

QUnit.test( 'attr and removeAttr test', function( assert ) {
    var t4_1_original = [ 
        'https://www.fsf.org/', 
        'https://ubuntu.com/', 
        'https://www.npmjs.com/' 
        ],
        t4_1_modified = '<a href="https://www.mozilla.org/">mozilla</a>';
    assert.equal( zz( '#t4-1' ).attr( 'href' ), t4_1_original[ 0 ] );
    assert.equal( zz( '#t4-2' ).attr( 'href' ), t4_1_original[ 1 ] );
    assert.equal( zz( '#t4-3' ).attr( 'href' ), t4_1_original[ 2 ] );
    var ids = [];
    zz( '.t4-1.attr' )
        .attr( 'href', t4_1_modified )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.equal( zz( '#t4-1' ).attr( 'href' ), t4_1_original[ 0 ] );
    assert.equal( zz( '#t4-2' ).attr( 'href' ), t4_1_modified );
    assert.equal( zz( '#t4-3' ).attr( 'href' ), t4_1_modified );
    assert.deepEqual( ids, [ 't4-2', 't4-3' ] );
    assert.deepEqual( zz( '.t4-1.attr' ).attr( 'href' ), t4_1_modified );
    
    var t4_2_original = [ 
        'https://www.fsf.org/', 
        'https://ubuntu.com/', 
        'https://www.npmjs.com/' 
        ],
        t4_2_modified = null;
    assert.equal( zz( '#t4-4' ).attr( 'href' ), t4_2_original[ 0 ] );
    assert.equal( zz( '#t4-5' ).attr( 'href' ), t4_2_original[ 1 ] );
    assert.equal( zz( '#t4-6' ).attr( 'href' ), t4_2_original[ 2 ] );
    ids = [];
    zz( '.t4-2.removeAttr' )
        .removeAttr( 'href' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.equal( zz( '#t4-4' ).attr( 'href' ), t4_2_original[ 0 ] );
    assert.equal( zz( '#t4-5' ).attr( 'href' ), t4_2_modified );
    assert.equal( zz( '#t4-6' ).attr( 'href' ), t4_2_modified );
    assert.deepEqual( ids, [ 't4-5', 't4-6' ] );
});

QUnit.test( 'addClass, hasClass, removeClass and toggleClass test', function( assert ) {
    var t5_1_class = 'myclass';
    assert.ok( document.getElementById( 't5-1' ).classList.contains( t5_1_class ) );
    assert.notOk( document.getElementById( 't5-2' ).classList.contains( t5_1_class ) );
    assert.ok( document.getElementById( 't5-3' ).classList.contains( t5_1_class ) );
    assert.ok( zz( '.t5-1.myclass' ).hasClass( t5_1_class ) );
    
    var t5_2_class = 'addedclass';
    assert.notOk( document.getElementById( 't5-4' ).classList.contains( t5_2_class ) );
    assert.notOk( document.getElementById( 't5-5' ).classList.contains( t5_2_class ) );
    assert.notOk( document.getElementById( 't5-6' ).classList.contains( t5_2_class ) );
    var ids = [];
    zz( '.t5-2' )
        .addClass( t5_2_class )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.ok( zz( '#t5-4' ).hasClass( t5_2_class ) );
    assert.ok( zz( '#t5-5' ).hasClass( t5_2_class ) );
    assert.ok( zz( '#t5-6' ).hasClass( t5_2_class ) );
    assert.deepEqual( ids, [ 't5-4', 't5-5', 't5-6' ] );
    
    var t5_3_class = 'otherclass';
    assert.ok( document.getElementById( 't5-7' ).classList.contains( t5_3_class ) );
    assert.ok( document.getElementById( 't5-8' ).classList.contains( t5_3_class ) );
    assert.ok( document.getElementById( 't5-9' ).classList.contains( t5_3_class ) );
    ids = [];
    zz( '.t5-3' )
        .removeClass( t5_3_class )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.notOk( zz( '#t5-7' ).hasClass( t5_3_class ) );
    assert.notOk( zz( '#t5-8' ).hasClass( t5_3_class ) );
    assert.notOk( zz( '#t5-9' ).hasClass( t5_3_class ) );
    assert.deepEqual( ids, [ 't5-7', 't5-8', 't5-9' ] );
    
    var t5_4_class = 'toggleclass';
    assert.ok( document.getElementById( 't5-10' ).classList.contains( t5_4_class ) );
    assert.notOk( document.getElementById( 't5-11' ).classList.contains( t5_4_class ) );
    ids = [];
    zz( '.t5-4' )
        .toggleClass( t5_4_class )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.notOk( zz( '#t5-10' ).hasClass( t5_4_class ) );
    assert.ok( zz( '#t5-11' ).hasClass( t5_4_class ) );
    assert.deepEqual( ids, [ 't5-10', 't5-11' ] );
    ids = [];
    zz( '.t5-4' )
        .toggleClass( t5_4_class )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.ok( zz( '#t5-10' ).hasClass( t5_4_class ) );
    assert.notOk( zz( '#t5-11' ).hasClass( t5_4_class ) );
    assert.deepEqual( ids, [ 't5-10', 't5-11' ] );
    
    var t5_5_class = 'myclass';
    assert.notOk( document.getElementById( 't5-12' ).classList.contains( t5_5_class ) );
    assert.notOk( document.getElementById( 't5-13' ).classList.contains( t5_5_class ) );
    assert.ok( document.getElementById( 't5-14' ).classList.contains( t5_5_class ) );
    assert.ok( zz( '.t5-5' ).hasClass( t5_5_class ) );
    
    var t5_6_class = 'myclass';
    assert.notOk( document.getElementById( 't5-15' ).classList.contains( t5_6_class ) );
    assert.notOk( document.getElementById( 't5-16' ).classList.contains( t5_6_class ) );
    assert.notOk( document.getElementById( 't5-17' ).classList.contains( t5_6_class ) );
    assert.notOk( zz( '.t5-6' ).hasClass( t5_6_class ) );
});

QUnit.test( 'after, before, append and prepend test', function( assert ) {
    var t6_1_original = '<li id="t6-1-1" class="t6-1">Text 1</li><li id="t6-1-2">Text 2</li><li id="t6-1-3" class="t6-1">Text 3</li>',
        t6_1_modified = '<li id="t6-1-1" class="t6-1">Text 1</li><li>New text</li><li id="t6-1-2">Text 2</li><li id="t6-1-3" class="t6-1">Text 3</li><li>New text</li>';
    utils.assertHtml( assert, 't6-1', t6_1_original );
    var ids = [];
    zz( '.t6-1' )
        .after( '<li>New text</li>' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    utils.assertHtml( assert, 't6-1', t6_1_modified );
    assert.deepEqual( ids, [ 't6-1-1', 't6-1-3' ] );
    
    var t6_2_original = '<li id="t6-2-1" class="t6-2">Text 1</li><li id="t6-2-2">Text 2</li><li id="t6-2-3" class="t6-2">Text 3</li>',
        t6_2_modified = '<li>New text</li><li id="t6-2-1" class="t6-2">Text 1</li><li id="t6-2-2">Text 2</li><li>New text</li><li id="t6-2-3" class="t6-2">Text 3</li>';
    utils.assertHtml( assert, 't6-2', t6_2_original );
    ids = [];
    zz( '.t6-2' )
        .before( '<li>New text</li>' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    utils.assertHtml( assert, 't6-2', t6_2_modified );
    assert.deepEqual( ids, [ 't6-2-1', 't6-2-3' ] );
    
    var t6_3_1_original = '<li>Text 1</li><li>Text 2</li>',
        t6_3_1_modified = '<li>Text 1</li><li>Text 2</li><li>New text</li>',
        t6_3_2_original = '<li>Text 3</li><li>Text 4</li>',
        t6_3_2_modified = '<li>Text 3</li><li>Text 4</li><li>New text</li>';
    utils.assertHtml( assert, 't6-3-1', t6_3_1_original );
    utils.assertHtml( assert, 't6-3-2', t6_3_2_original );
    ids = [];
    zz( '.t6-3' )
        .append( '<li>New text</li>' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    utils.assertHtml( assert, 't6-3-1', t6_3_1_modified );
    utils.assertHtml( assert, 't6-3-2', t6_3_2_modified );
    assert.deepEqual( ids, [ 't6-3-1', 't6-3-2' ] );
    
    var t6_4_1_original = '<li>Text 1</li><li>Text 2</li>',
        t6_4_1_modified = '<li>New text</li><li>Text 1</li><li>Text 2</li>',
        t6_4_2_original = '<li>Text 3</li><li>Text 4</li>',
        t6_4_2_modified = '<li>New text</li><li>Text 3</li><li>Text 4</li>';
    utils.assertHtml( assert, 't6-4-1', t6_4_1_original );
    utils.assertHtml( assert, 't6-4-2', t6_4_2_original );
    ids = [];
    zz( '.t6-4' )
        .prepend( '<li>New text</li>' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    utils.assertHtml( assert, 't6-4-1', t6_4_1_modified );
    utils.assertHtml( assert, 't6-4-2', t6_4_2_modified );
    assert.deepEqual( ids, [ 't6-4-1', 't6-4-2' ] );
});

QUnit.test( 'siblings, prev and next test', function( assert ) {
    var ids = [];
    zz( '.t7-1' )
        .siblings()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't7-1-1-1', 't7-1-1-3', 't7-1-2-1', 't7-1-2-2' ] );
    
    ids = [];
    zz( '.t7-2' )
        .prev()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't7-2-1-1', 't7-2-2-1' ] );
    
    ids = [];
    zz( '.t7-2' )
        .next()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't7-2-1-3', 't7-2-2-3' ] );
});

QUnit.test( 'children, index and parent test', function( assert ) {
    var ids = [];
    zz( '.t8-1' )
        .children()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't8-1-1-1', 't8-1-1-2', 't8-1-1-3', 't8-1-2-1', 't8-1-2-2', 't8-1-2-3' ] );
    
    assert.equal( zz( '.t8-1' ).index(), 1 );
    
    ids = [];
    zz( '.t8-2' )
        .parent()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't8-2-1', 't8-2-2' ] );
    
    ids = [];
    zz( '.t8-1' )
        .children( '.selected' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't8-1-1-2', 't8-1-1-3', 't8-1-2-1' ] );
});

QUnit.test( 'filter and find test', function( assert ) {
    
    var eachFn = function( index, ss ){
        ids.push( ss.attr( 'id' ) ); 
        indexes.push( index );
    };
    
    var ids = [];
    var indexes = [];
    zz( '.t9-1' )
        .find( '.a' )
        .each( eachFn );
    assert.deepEqual( ids, [ 't9-1-1-1', 't9-1-1-2', 't9-1-1-3-1', 't9-1-2-1', 't9-1-2-2', 't9-1-2-3-1' ] );
    assert.deepEqual( indexes, [ 0, 1, 2, 3, 4, 5 ] );
    
    ids = [];
    indexes = [];
    zz( '.t9-1' )
        .find( '.b' )
        .each( eachFn );
    assert.deepEqual( ids, [ 't9-1-1-1', 't9-1-1-3-2', 't9-1-1-4', 't9-1-1-4-2', 't9-1-2-1', 't9-1-2-3-2', 't9-1-2-4', 't9-1-2-4-2' ] );
    assert.deepEqual( indexes, [ 0, 1, 2, 3, 4, 5, 6, 7 ] );
    
    ids = [];
    indexes = [];
    zz( '.t9-1' )
        .find( '.a.b' )
        .each( eachFn );
    assert.deepEqual( ids, [ 't9-1-1-1', 't9-1-2-1' ] );
    assert.deepEqual( indexes, [ 0, 1 ] );
    
    ids = [];
    indexes = [];
    zz( '.t9-1' )
        .find( '.c' )
        .each( eachFn );
    assert.deepEqual( ids, [] );
    assert.deepEqual( indexes, [] );
    
    ids = [];
    indexes = [];
    zz( '.t9-2' )
        .filter( '.a' )
        .each( eachFn );
    assert.deepEqual( ids, [ 't9-2-1-1', 't9-2-1-2', 't9-2-2-1', 't9-2-2-2' ] );
    assert.deepEqual( indexes, [ 0, 1, 2, 3 ] );
    
    ids = [];
    indexes = [];
    zz( '.t9-2' )
        .filter( '.b' )
        .each( eachFn );
    assert.deepEqual( ids, [ 't9-2-1-2', 't9-2-2-2' ] );
    assert.deepEqual( indexes, [ 0, 1 ] );
    
    ids = [];
    indexes = [];
    zz( '.t9-2' )
        .filter( '.a.b' )
        .each( eachFn );
    assert.deepEqual( ids, [ 't9-2-1-2', 't9-2-2-2' ] );
    assert.deepEqual( indexes, [ 0, 1 ] );
    
    ids = [];
    indexes = [];
    zz( '.t9-2' )
        .filter( '.c' )
        .each( eachFn );
    assert.deepEqual( ids, [] );
    assert.deepEqual( indexes, [] );
    
    ids = [];
    indexes = [];
    var fIndexes = [];
    var fIds = [];
    
    zz( '.t9-2' )
        .filter( 
            function( index, ss ){
                var result = ss.attr( 'class' ) === 't9-2 a b';
                if ( result ){
                    fIndexes.push( index );
                    fIds.push( this.getAttribute( 'id' ) );
                }
                return result;
            }
        )
        .each( eachFn );
    assert.deepEqual( ids, [ 't9-2-1-2', 't9-2-2-2' ] );
    assert.deepEqual( indexes, [ 0, 1 ] );
    assert.deepEqual( fIndexes, [ 1, 4 ] );
    assert.deepEqual( fIds, [ 't9-2-1-2', 't9-2-2-2' ] );
    
    ids = [];
    indexes = [];
    fIndexes = [];
    fIds = [];
    zz( '.t9-2' )
        .filter( 
            function( index, ss ){ 
                var result = ss.attr( 'class' ) === 'not-used-class';
                if ( result ){
                    fIndexes.push( index );
                }
                return result;
            }
        )
        .each( eachFn );
    assert.deepEqual( ids, [] );
    assert.deepEqual( indexes, [] );
    assert.deepEqual( fIndexes, [] );
    assert.deepEqual( fIds, [] );
});

QUnit.test( 'clone and is test', function( assert ) {
    var t10_1_original = `
<div class="t10-1-1">
  Hello 1
</div>
<div class="t10-1-1">
  Hello 2
</div>

<div id="t10-1-2">
  Goodbye
</div>
`,
        t10_1_modified = `
<div class="t10-1-1">
  Hello 1
</div>

<div class="t10-1-1">
  Hello 2
</div>

<div id="t10-1-2">
  Goodbye

  <div class="t10-1-1">
    Hello 1
  </div>

  <div class="t10-1-1">
    Hello 2
  </div>
</div>
`;
    utils.assertHtml( assert, 't10-1', t10_1_original );
    var cssClasses = [];
    zz( '.t10-1-1' )
        .clone()
        .appendTo( '#t10-1-2' )
        .each( function( index, ss ){ cssClasses.push( ss.attr( 'class' ) ); } );
    assert.deepEqual( cssClasses, [ 't10-1-1', 't10-1-1' ] );
    utils.assertHtml( assert, 't10-1', t10_1_modified );
    
    assert.notOk( zz( '.t10-2' ).is( null ) );
    
    assert.ok( zz( '.t10-2' ).is( document.getElementById( 't10-2-1' ) ) );
    assert.ok( zz( '.t10-2' ).is( document.getElementById( 't10-2-2' ) ) );
    assert.notOk( zz( '.t10-2' ).is( document.getElementById( 't10-2' ) ) );
    
    assert.ok( zz( '.t10-2' ).is( zz( '#t10-2-1' ) ) );
    assert.ok( zz( '.t10-2' ).is( zz( '#t10-2-2' ) ) );
    assert.notOk( zz( '.t10-2' ).is( zz( '#t10-2' ) ) );
    
    assert.ok( zz( '.t10-2' ).is( 'div' ) );
    assert.notOk( zz( '.t10-2' ).is( 'span' ) );
    assert.ok( zz( '.t10-2' ).is( '.selected' ) );
    assert.notOk( zz( '.t10-2' ).is( '.class-with-no-elements' ) );
    
    assert.ok( zz( '.t10-2' ).is( zz( 'div.t10-2' ) ) );
    assert.notOk( zz( '.t10-2' ).is( zz( 'span.t10-2' ) ) );
    assert.notOk( zz( '.t10-2' ).is( zz( '.t10-3' ) ) );
});

QUnit.test( 'css test', function( assert ) {  
    var t11_1_original = null,
        t11_1_modified = 'color: red;';
    assert.equal( document.getElementById( 't11-1-1' ).getAttribute( 'style' ), t11_1_original );
    assert.equal( document.getElementById( 't11-1-2' ).getAttribute( 'style' ), t11_1_original );
    var ids = [];
    zz( '.t11-1' )
        .css( 'color', 'red' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't11-1-1', 't11-1-2' ] );
    assert.equal( document.getElementById( 't11-1-1' ).getAttribute( 'style' ), t11_1_modified );
    assert.equal( document.getElementById( 't11-1-2' ).getAttribute( 'style' ), t11_1_modified );
    assert.equal( zz( '#t11-1-1' ).css( 'color' ), 'rgb(255, 0, 0)' );
    assert.equal( zz( '#t11-1-2' ).css( 'color' ), 'rgb(255, 0, 0)' );
    
    var t11_2_original = null,
        t11_2_modified = 'background-color: red;';
    assert.equal( document.getElementById( 't11-2-1' ).getAttribute( 'style' ), t11_2_original );
    assert.equal( document.getElementById( 't11-2-2' ).getAttribute( 'style' ), t11_2_original );
    ids = [];
    zz( '.t11-2' )
        .css( 'background-color', 'red' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't11-2-1', 't11-2-2' ] );
    assert.equal( document.getElementById( 't11-2-1' ).getAttribute( 'style' ), t11_2_modified );
    assert.equal( document.getElementById( 't11-2-2' ).getAttribute( 'style' ), t11_2_modified );
    assert.equal( zz( '#t11-2-1' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    assert.equal( zz( '#t11-2-2' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    
    var t11_3_original = 'color: green',
        t11_3_modified = 'color: red;';
    assert.equal( document.getElementById( 't11-3-1' ).getAttribute( 'style' ), t11_3_original );
    assert.equal( document.getElementById( 't11-3-2' ).getAttribute( 'style' ), t11_3_original );
    ids = [];
    zz( '.t11-3' )
        .css( 'color', 'red' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't11-3-1', 't11-3-2' ] );
    assert.equal( document.getElementById( 't11-3-1' ).getAttribute( 'style' ), t11_3_modified );
    assert.equal( document.getElementById( 't11-3-2' ).getAttribute( 'style' ), t11_3_modified );
    assert.equal( zz( '#t11-3-1' ).css( 'color' ), 'rgb(255, 0, 0)' );
    assert.equal( zz( '#t11-3-2' ).css( 'color' ), 'rgb(255, 0, 0)' );
    
    var t11_4_original = 'color: green',
        t11_4_modified = 'color: green; background-color: red;';
    assert.equal( document.getElementById( 't11-4-1' ).getAttribute( 'style' ), t11_4_original );
    assert.equal( document.getElementById( 't11-4-2' ).getAttribute( 'style' ), t11_4_original );
    ids = [];
    zz( '.t11-4' )
        .css( 'background-color', 'red' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't11-4-1', 't11-4-2' ] );
    assert.equal( document.getElementById( 't11-4-1' ).getAttribute( 'style' ), t11_4_modified );
    assert.equal( document.getElementById( 't11-4-2' ).getAttribute( 'style' ), t11_4_modified );
    assert.equal( zz( '#t11-4-1' ).css( 'color' ), 'rgb(0, 128, 0)' );
    assert.equal( zz( '#t11-4-2' ).css( 'color' ), 'rgb(0, 128, 0)' );
    assert.equal( zz( '#t11-4-1' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    assert.equal( zz( '#t11-4-2' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    
    var t11_5_original = null,
        t11_5_modified = 'color: white; background-color: red;';
    assert.equal( document.getElementById( 't11-5-1' ).getAttribute( 'style' ), t11_5_original );
    assert.equal( document.getElementById( 't11-5-2' ).getAttribute( 'style' ), t11_5_original );
    ids = [];
    zz( '.t11-5' )
        .css(
            {
                color: 'white',
                'background-color': 'red' 
            }
        ).each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't11-5-1', 't11-5-2' ] );
    assert.equal( document.getElementById( 't11-5-1' ).getAttribute( 'style' ), t11_5_modified );
    assert.equal( document.getElementById( 't11-5-2' ).getAttribute( 'style' ), t11_5_modified );
    assert.equal( zz( '#t11-5-1' ).css( 'color' ), 'rgb(255, 255, 255)' );
    assert.equal( zz( '#t11-5-2' ).css( 'color' ), 'rgb(255, 255, 255)' );
    assert.equal( zz( '#t11-5-1' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    assert.equal( zz( '#t11-5-2' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    assert.equal( zz( '.t11-5' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    assert.equal( zz( '.t11-5' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    
    var t11_6_original = null,
        t11_6_modified = 'font-size: 25px;';
    assert.equal( document.getElementById( 't11-6-1' ).getAttribute( 'style' ), t11_6_original );
    assert.equal( document.getElementById( 't11-6-2' ).getAttribute( 'style' ), t11_6_original );
    ids = [];
    var indexes = [];
    var fsizes = [];
    zz( '.t11-6' )
        .css(
            {
                'font-size': function( index, ss ){ 
                    indexes.push( index );
                    fsizes.push( this.getAttribute( 'data-fsize' ) );
                    return ss.attr( 'data-fsize' );
                }
            }
        ).each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't11-6-1', 't11-6-2' ] );
    assert.deepEqual( indexes, [ 0, 1 ] );
    assert.deepEqual( fsizes, [ '25px', '26px' ] );
});

QUnit.test( 'height, width, outerHeight and outerWidth test', function( assert ) {
    var ids = [];
    zz( '.t12-1' )
        .height( '2em' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't12-1-1', 't12-1-2' ] );
    assert.equal( document.getElementById( 't12-1-1' ).getAttribute( 'style' ), 'height: 2em;' );
    assert.equal( document.getElementById( 't12-1-2' ).getAttribute( 'style' ), 'height: 2em;' );
    assert.equal( zz( '#t12-1-1' ).height(), 32 );
    assert.equal( zz( '#t12-1-2' ).height(), 32 );
    assert.equal( zz( '.t12-1' ).height(), 32 );
    
    ids = [];
    zz( '.t12-2' )
        .height( 100 )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't12-2-1', 't12-2-2' ] );
    assert.equal( document.getElementById( 't12-2-1' ).getAttribute( 'style' ), 'height: 100px;' );
    assert.equal( document.getElementById( 't12-2-2' ).getAttribute( 'style' ), 'height: 100px;' );
    assert.equal( zz( '#t12-2-1' ).height(), 100 );
    assert.equal( zz( '#t12-2-2' ).height(), 100 );
    assert.equal( zz( '.t12-2' ).height(), 100 );
    
    ids = [];
    zz( '.t12-3' )
        .width( '10em' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't12-3-1', 't12-3-2' ] );
    assert.equal( document.getElementById( 't12-3-1' ).getAttribute( 'style' ), 'width: 10em;' );
    assert.equal( document.getElementById( 't12-3-2' ).getAttribute( 'style' ), 'width: 10em;' );
    assert.equal( zz( '#t12-3-1' ).width(), 160 );
    assert.equal( zz( '#t12-3-2' ).width(), 160 );
    assert.equal( zz( '.t12-3' ).width(), 160 );
    
    ids = [];
    zz( '.t12-4' )
        .height( 800 )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't12-4-1', 't12-4-2' ] );
    assert.equal( document.getElementById( 't12-4-1' ).getAttribute( 'style' ), 'height: 800px;' );
    assert.equal( document.getElementById( 't12-4-2' ).getAttribute( 'style' ), 'height: 800px;' );
    assert.equal( zz( '#t12-4-1' ).height(), 800 );
    assert.equal( zz( '#t12-4-2' ).height(), 800 );
    assert.equal( zz( '.t12-4' ).height(), 800 );
    
    ids = [];
    zz( '.t12-5' )
        .height( '2em' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't12-5-1', 't12-5-2' ] );
    assert.equal( document.getElementById( 't12-5-1' ).getAttribute( 'style' ), 'height: 2em;' );
    assert.equal( document.getElementById( 't12-5-2' ).getAttribute( 'style' ), 'height: 2em;' );
    assert.equal( zz( '#t12-5-1' ).outerHeight(), 64 );
    assert.equal( zz( '#t12-5-2' ).outerHeight(), 64 );
    assert.equal( zz( '#t12-5-1' ).outerHeight( true ), 80 );
    assert.equal( zz( '#t12-5-2' ).outerHeight( true ), 80 );
    assert.equal( zz( '.t12-5' ).outerHeight(), 64 );
    assert.equal( zz( '.t12-5' ).outerHeight( true ), 80 );
    
    ids = [];
    zz( '.t12-6' )
        .height( 100 )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't12-6-1', 't12-6-2' ] );
    assert.equal( document.getElementById( 't12-6-1' ).getAttribute( 'style' ), 'height: 100px;' );
    assert.equal( document.getElementById( 't12-6-2' ).getAttribute( 'style' ), 'height: 100px;' );
    assert.equal( zz( '#t12-6-1' ).outerHeight(), 132 );
    assert.equal( zz( '#t12-6-2' ).outerHeight(), 132 );
    assert.equal( zz( '#t12-6-1' ).outerHeight( true ), 148 );
    assert.equal( zz( '#t12-6-2' ).outerHeight( true ), 148 );
    assert.equal( zz( '.t12-6' ).outerHeight(), 132 );
    assert.equal( zz( '.t12-6' ).outerHeight( true ), 148 );
    
    ids = [];
    zz( '.t12-7' )
        .height( '10em' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't12-7-1', 't12-7-2' ] );
    assert.equal( document.getElementById( 't12-7-1' ).getAttribute( 'style' ), 'height: 10em;' );
    assert.equal( document.getElementById( 't12-7-2' ).getAttribute( 'style' ), 'height: 10em;' );
    assert.equal( zz( '#t12-7-1' ).outerHeight(), 192 );
    assert.equal( zz( '#t12-7-2' ).outerHeight(), 192 );
    assert.equal( zz( '#t12-7-1' ).outerHeight( true ), 208 );
    assert.equal( zz( '#t12-7-2' ).outerHeight( true ), 208 );
    assert.equal( zz( '.t12-7' ).outerHeight(), 192 );
    assert.equal( zz( '.t12-7' ).outerHeight( true ), 208 );
    
    ids = [];
    zz( '.t12-8' )
        .height( 800 )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't12-8-1', 't12-8-2' ] );
    assert.equal( document.getElementById( 't12-8-1' ).getAttribute( 'style' ), 'height: 800px;' );
    assert.equal( document.getElementById( 't12-8-2' ).getAttribute( 'style' ), 'height: 800px;' );
    assert.equal( zz( '#t12-8-1' ).outerHeight(), 832 );
    assert.equal( zz( '#t12-8-2' ).outerHeight(), 832 );
    assert.equal( zz( '#t12-8-1' ).outerHeight( true ), 848 );
    assert.equal( zz( '#t12-8-2' ).outerHeight( true ), 848 );
    assert.equal( zz( '.t12-8' ).outerHeight(), 832 );
    assert.equal( zz( '.t12-8' ).outerHeight( true ), 848 );
});

QUnit.test( 'offset, offsetParent and position test', function( assert ) {
    var ids = [];
    zz( '.t13-1' )
        .offset( { top: 25, left: 30 } )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't13-1-1', 't13-1-2' ] );
    assert.equal( document.getElementById( 't13-1-1' ).getAttribute( 'style' ), 'top: 25px; left: 30px;' );
    assert.equal( document.getElementById( 't13-1-2' ).getAttribute( 'style' ), 'top: 25px; left: 30px;' );
    
    //TODO Test offset() is hard!
    
    assert.notOk( zz( '#t13-2-1' ).hasClass( 'selected' ) );
    assert.notOk( zz( '#t13-2-3' ).hasClass( 'selected' ) );
    ids = [];
    zz( '.t13-2' )
        .offsetParent()
        .addClass( 'selected' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't13-2-1', 't13-2-3' ] );
    assert.ok( zz( '#t13-2-1' ).hasClass( 'selected' ) );
    assert.ok( zz( '#t13-2-3' ).hasClass( 'selected' ) );
    
    var position = zz( '#t13-3-1' ).position();
    assert.equal( position.top, 35 );
    assert.equal( position.left, 320 );
    position = zz( '#t13-3-2' ).position();
    assert.equal( position.top, 35 );
    assert.equal( position.left, 320 );
    position = zz( '.t13-3' ).position();
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

<div id="t16-1-2">
  New div 2
</div>
`;
    utils.assertHtml( assert, 't16-1', t16_1_original );
    var ids = [];
    zz( '<div id="t16-1-1">New div 1</div><div id="t16-1-2">New div 2</div>' )
        .appendTo( '#t16-1' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't16-1-1', 't16-1-2' ] );
    utils.assertHtml( assert, 't16-1', t16_1_modified );
    
    var t16_2_original = 'This is the container t16-2',
        t16_2_modified = `
This is the container t16-2

<div id="t16-2-1">
  New div 1
</div>

<div id="t16-2-2">
  New div 2
</div>
`;
    utils.assertHtml( assert, 't16-2', t16_2_original );
    ids = [];
    zz( '<div id="t16-2-1">New div 1</div><div id="t16-2-2">New div 2</div>' )
        .appendTo( document.getElementById( 't16-2' ) )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't16-2-1', 't16-2-2' ] );
    utils.assertHtml( assert, 't16-2', t16_2_modified );

    var t16_3_original = 'This is the container t16-3',
        t16_3_modified = `
This is the container t16-3

<div id="t16-3-1">
  New div 1
</div>

<div id="t16-3-2">
  New div 2
</div>
`;
    utils.assertHtml( assert, 't16-3', t16_3_original );
    ids = [];
    zz( '<div id="t16-3-1">New div 1</div><div id="t16-3-2">New div 2</div>' )
        .appendTo( zz( '#t16-3' ) )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't16-3-1', 't16-3-2' ] );
    utils.assertHtml( assert, 't16-3', t16_3_modified );

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

  <div class="t16-4-1">
    New div 1
  </div>
  <div class="t16-4-2">
    New div 2
  </div>
</div>

<div>
  Separator 1
</div>

<div class="container t16-4-class" id="t16-4b">
  This is the container t16-4b

  <div class="t16-4-1">
    New div 1
  </div>
  <div class="t16-4-2">
    New div 2
  </div>
</div>

<div>
  Separator 2
</div>

<div class="container t16-4-class" id="t16-4c">
  This is the container t16-4c

  <div class="t16-4-1">
    New div 1
  </div>
  <div class="t16-4-2">
    New div 2
  </div>
</div>
`;
    utils.assertHtml( assert, 't16-4', t16_4_original );
    var classes = [];
    zz( '<div class="t16-4-1">New div 1</div><div class="t16-4-2">New div 2</div>' )
        .appendTo( zz( '.t16-4-class' ) )
        .each( function( index, ss ){ classes.push( ss.attr( 'class' ) ); } );
    assert.deepEqual( classes, [ 't16-4-1', 't16-4-2' ] );
    utils.assertHtml( assert, 't16-4', t16_4_modified );
    
    var t16_5_original = 'This is the container t16-5',
        t16_5_modified = t16_5_original;
    utils.assertHtml( assert, 't16-5', t16_5_original );
    ids = [];
    zz( '<div id="t16-5-1">New div 1</div><div id="t16-5-2">New div 2</div>' )
        .appendTo( document.getElementById( 'non-existing-id-DOM' ) )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't16-5-1', 't16-5-2' ] );
    utils.assertHtml( assert, 't16-5', t16_5_modified );
});

QUnit.test( 'each test', function( assert ) {
    var currentValues = [];
    var indexes = [];
    var arrays = [];
    var thisValues = [];
    
    zz( '.t17-1' ).each( 
        function( index, currentValue, array ){
            currentValues.push( currentValue );
            indexes.push( index );
            arrays.push( array );
            thisValues.push( this );
        } 
    );
    
    assert.equal( currentValues.length, 2 );
    assert.equal( currentValues[ 0 ].attr( 'id' ), 't17-1-1' );
    assert.equal( currentValues[ 1 ].attr( 'id' ), 't17-1-2' );
    assert.deepEqual( indexes, [ 0, 1 ] );
    assert.equal( arrays.length, 2 );
    assert.equal( arrays[ 0 ][ 0 ].getAttribute( 'id' ), 't17-1-1' );
    assert.equal( arrays[ 0 ][ 1 ].getAttribute( 'id' ), 't17-1-2' );
    assert.equal( arrays[ 1 ][ 0 ].getAttribute( 'id' ), 't17-1-1' );
    assert.equal( arrays[ 1 ][ 1 ].getAttribute( 'id' ), 't17-1-2' );
    assert.equal( thisValues.length, 2 );
    assert.equal( thisValues[ 0 ].getAttribute( 'id' ), 't17-1-1' );
    assert.equal( thisValues[ 1 ].getAttribute( 'id' ), 't17-1-2' );
});

QUnit.test( 'array like syntax test', function( assert ) {    
    assert.equal( zz( '.t18-1' ).length, 2 );
    
    assert.ok( zz( '.t18-1' )[ 0 ] instanceof Element );
    assert.equal( zz( '.t18-1' )[ 0 ].getAttribute( 'id' ), 't18-1-1' );
    
    assert.ok( zz( '.t18-1' )[ 1 ] instanceof Element );
    assert.equal( zz( '.t18-1' )[ 1 ].getAttribute( 'id' ), 't18-1-2' );
    
    assert.ok( zz( '.t18-1' )[ 2 ] === undefined );
    
    var ids = [];
    var $divs = zz( '.t18-1' );
    for ( var c = 0; c < $divs.length; ++c ){
        ids.push( $divs[ c ].getAttribute( 'id' ) );
    }
    assert.deepEqual( ids, [ 't18-1-1', 't18-1-2' ] );
});

QUnit.test( 'parents test', function( assert ) {
    var eachFn = function( index, ss ){
        ids.push( ss.attr( 'id' ) ); 
        indexes.push( index );
    };
    
    var ids = [];
    var indexes = [];
    zz( '#t22 .a' )
        .parents()
        .each( eachFn );
    assert.deepEqual( ids, [ 't22-1', 't22', 'body', 'html' ] );
    assert.deepEqual( indexes, [ 0, 1, 2, 3 ] );

    ids = [];
    indexes = [];
    zz( '#t22 .b' )
        .parents()
        .each( eachFn );
    assert.deepEqual( ids, [ 't22-1-1', 't22-1', 't22', 'body', 'html', 't22-1-2' ] );
    assert.deepEqual( indexes, [ 0, 1, 2, 3, 4 , 5 ] );
});

QUnit.test( 'first test', function( assert ) {
    var eachFn = function( index, ss ){
        ids.push( ss.attr( 'id' ) ); 
        indexes.push( index );
    };
    
    var ids = [];
    var indexes = [];
    zz( '#t23 .t23' )
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
    var nodes = zz( '.t24' ).get();
    var ids = eachFn( nodes );
    assert.deepEqual( ids, [ 't24-1', 't24-2' ] );
    
    // Test .get( 0 )
    var el = zz( '.t24' ).get( 0 );
    var id = el.getAttribute( 'id' );
    assert.deepEqual( id, 't24-1' );

    // Test .get( 1 )
    el = zz( '.t24' ).get( 1 );
    id = el.getAttribute( 'id' );
    assert.deepEqual( id, 't24-2' );
    
    // Test .get( 2 ) -> Array has just 2 elements
    el = zz( '.t24' ).get( 2 );
    assert.deepEqual( el, undefined );
});

QUnit.test( 'map test', function( assert ) {
  
    var ids = zz( '.t25' ).map(
        function() {
            return this.id;
        })
    .get()
    .join('|');

    assert.deepEqual( ids, 't25-1|t25-2' );

    ids = zz( '.t25' ).map(
        function( i, node) {
            return i + ':' + node.id;
        })
    .get()
    .join('|');

    assert.deepEqual( ids, '0:t25-1|1:t25-2' );
});

