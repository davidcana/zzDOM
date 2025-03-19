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
    assert.ok( zz( '#t20-4' ).position().top - t20_4_y_modified < 1 );
});
