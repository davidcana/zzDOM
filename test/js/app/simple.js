"use strict";

// Unit tests
QUnit.test( 'Text and html test', function( assert ) {
    assert.equal( document.getElementById( 't1-1' ).textContent, 'white' );
    zz( '#t1-1' ).text( 'yellow' );
    assert.equal( document.getElementById( 't1-1' ).textContent, 'yellow' );
    
    //https://www.mozilla.org/
});
