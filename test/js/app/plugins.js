"use strict";

// Unit tests
QUnit.test( 'Hello world test', function( assert ) {
    
    MultipleZZDom.add( 
        SimpleZZDom.prototype.hello = function(){
            this.el.textContent = 'Hello, world!';
            return this;
        }
    );
    
    var t1_1_original = 'white',
        t1_1_modified = 'Hello, world!';
    assert.equal( zz( '#t1-1' ).text(), t1_1_original );
    var id = zz( '#t1-1' )
        .hello( t1_1_modified )
        .attr( 'id' );
    assert.equal( id, 't1-1' );
    assert.equal( zz( '#t1-1' ).text(), t1_1_modified );
    
    var t2_1_original = [ 'white', 'black', 'red' ],
        t2_1_modified = 'Hello, world!';
    assert.equal( zz( '#t1-2-1' ).text(), t2_1_original[ 0 ] );
    assert.equal( zz( '#t1-2-2' ).text(), t2_1_original[ 1 ] );
    assert.equal( zz( '#t1-2-3' ).text(), t2_1_original[ 2 ] );
    var ids = [];
    zz( '#t1-2 .selected' )
        .hello()
        .each( function( zzEl ){ ids.push( zzEl.attr( 'id' ) ); } );
    assert.equal( zz( '#t1-2-1' ).text(), t2_1_modified );
    assert.equal( zz( '#t1-2-2' ).text(), t2_1_original[ 1 ] );
    assert.equal( zz( '#t1-2-3' ).text(), t2_1_modified );
    assert.deepEqual( ids, [ 't1-2-1', 't1-2-3' ] );
});

QUnit.test( 'is numeric test', function( assert ) {
    
    MultipleZZDom.add( 
        SimpleZZDom.prototype.isNumeric = function(){
            return ! isNaN( this.el.textContent );
        },
        MultipleZZDom.constructors.booleanOr
    );
    
    var t2_1_original = 'white',
        t2_2_original = '7';
    assert.equal( zz( '#t2-1-1' ).text(), t2_1_original );
    assert.equal( zz( '#t2-1-2' ).text(), t2_2_original );
    assert.notOk( zz( '#t2-1-1' ).isNumeric() );
    assert.ok( zz( '#t2-1-2' ).isNumeric() );
    assert.equal( zz( '#t2-1-1' ).text(), t2_1_original );
    assert.equal( zz( '#t2-1-2' ).text(), t2_2_original );
    
    var t2_2_original = [ 'white', '7' ];
    assert.equal( zz( '#t2-2-1' ).text(), t2_2_original[ 0 ] );
    assert.equal( zz( '#t2-2-2' ).text(), t2_2_original[ 1 ] );
    assert.notOk( zz( '#t2-2-1' ).isNumeric() );
    assert.ok( zz( '#t2-2-2' ).isNumeric() );
    assert.ok( zz( '#t2-2 .t2-2' ).isNumeric() );
    assert.equal( zz( '#t2-2-1' ).text(), t2_2_original[ 0 ] );
    assert.equal( zz( '#t2-2-2' ).text(), t2_2_original[ 1 ] );
    
    var t2_3_original = [ 'white', 'red' ];
    assert.equal( zz( '#t2-3-1' ).text(), t2_3_original[ 0 ] );
    assert.equal( zz( '#t2-3-2' ).text(), t2_3_original[ 1 ] );
    assert.notOk( zz( '#t2-3-1' ).isNumeric() );
    assert.notOk( zz( '#t2-3-2' ).isNumeric() );
    assert.notOk( zz( '#t2-3 .t2-3' ).isNumeric() );
    assert.equal( zz( '#t2-3-1' ).text(), t2_3_original[ 0 ] );
    assert.equal( zz( '#t2-3-2' ).text(), t2_3_original[ 1 ] );
});
