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
