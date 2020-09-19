"use strict";

// Unit tests
QUnit.test( 'Hello world test', function( assert ) {
    /*
    SimpleZZDom.prototype.hello = function(){
        this.el.textContent = 'Hello, world!';
        return this;
    };
    */
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
