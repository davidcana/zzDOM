QUnit.test( 'val and checked test', function( assert ) {
    var t19_1_1_original = 'test value t19-1-1',
        t19_1_2_original = 'test value t19-1-2',
        t19_1_modified = 'test value t19-1' + ' modified',
        t19_2_1_original = 'test value t19-2-1',
        t19_2_2_original = 'test value t19-2-2',
        t19_2_modified = 'test value t19-2' + ' modified',
        t19_3_1_original = 'test value t19-3-1',
        t19_3_2_original = 'test value t19-3-2',
        t19_3_modified = 'test value t19-3' + ' modified',
        t19_4_1_original = 'mozilla',
        t19_4_2_original = 'linux',
        t19_4_modified = 'fsf',
        t19_5_1_original = [ 'mozilla', 'linux' ],
        t19_5_2_original = [ 'fsf', 'mozilla' ],
        t19_5_modified = [ 'fsf', 'linux' ];
    assert.equal( zz( '#t19-1-1' ).val(), t19_1_1_original );
    assert.equal( zz( '#t19-1-2' ).val(), t19_1_2_original );
    assert.equal( zz( '#t19-2-1' ).val(), t19_2_1_original );
    assert.equal( zz( '#t19-2-2' ).val(), t19_2_2_original );
    assert.equal( zz( '#t19-3-1' ).val(), t19_3_1_original );
    assert.equal( zz( '#t19-3-2' ).val(), t19_3_2_original );
    assert.equal( zz( '#t19-4-1' ).val(), t19_4_1_original );
    assert.equal( zz( '#t19-4-2' ).val(), t19_4_2_original );
    assert.deepEqual( zz( '#t19-5-1' ).val(), t19_5_1_original );
    assert.deepEqual( zz( '#t19-5-2' ).val(), t19_5_2_original );
    
    zz( '.t19-1' ).val( t19_1_modified );
    assert.equal( zz( '#t19-1-1' ).val(), t19_1_modified );
    assert.equal( zz( '#t19-1-2' ).val(), t19_1_modified );
    
    zz( '.t19-2' ).val( t19_2_modified );
    assert.equal( zz( '#t19-2-1' ).val(), t19_2_modified );
    assert.equal( zz( '#t19-2-2' ).val(), t19_2_modified );
    
    zz( '.t19-3' ).val( t19_3_modified );
    assert.equal( zz( '#t19-3-1' ).val(), t19_3_modified );
    assert.equal( zz( '#t19-3-2' ).val(), t19_3_modified );
    
    zz( '.t19-4' ).val( t19_4_modified );
    assert.equal( zz( '#t19-4-1' ).val(), t19_4_modified );
    assert.equal( zz( '#t19-4-2' ).val(), t19_4_modified );
    
    zz( '.t19-5' ).val( t19_5_modified );
    assert.deepEqual( zz( '#t19-5-1' ).val(), t19_5_modified );
    assert.deepEqual( zz( '#t19-5-2' ).val(), t19_5_modified );
    
    assert.notOk( zz( '#t19-6-1' ).checked() );
    assert.ok( zz( '#t19-6-2' ).checked() );
    zz( '.t19-6' ).checked( true );
    assert.ok( zz( '#t19-6-1' ).checked() );
    assert.ok( zz( '#t19-6-2' ).checked() );
    
    assert.notOk( zz( '#t19-7-1' ).checked() );
    assert.ok( zz( '#t19-7-2' ).checked() );
    zz( '.t19-7' ).checked( false );
    assert.notOk( zz( '#t19-7-1' ).checked() );
    assert.notOk( zz( '#t19-7-2' ).checked() );
});

QUnit.test( 'disabled test', function( assert ) {
    var t26_1_1 = 'test value t26-1-1',
        t26_1_2 = 'test value t26-1-2';
    assert.equal( zz( '#t26-1-1' ).val(), t26_1_1 );
    assert.equal( zz( '#t26-1-2' ).val(), t26_1_2 );

    assert.notOk( zz( '#t26-1-1' ).disabled() );
    assert.notOk( zz( '#t26-1-2' ).disabled() );

    zz( '.t26-1' ).disabled( true );
    assert.ok( zz( '#t26-1-1' ).disabled() );
    assert.ok( zz( '#t26-1-2' ).disabled() );

    zz( '.t26-1' ).disabled( false );
    assert.notOk( zz( '#t26-1-1' ).disabled() );
    assert.notOk( zz( '#t26-1-2' ).disabled() );

    zz( '.t26-1' ).disabled( true );
    assert.ok( zz( '#t26-1-1' ).disabled() );
    assert.ok( zz( '#t26-1-2' ).disabled() );
});

/*
(From https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate)
Elements targeted by this selector are:

<input type="checkbox"> elements whose indeterminate property is set to true
<input type="radio"> elements, when all radio buttons with the same name value in the form are unchecked
<progress> elements in an indeterminate state
*/
QUnit.test( 'indeterminate checkbox test', function( assert ) {

    assert.notOk( zz( '#t27-1-1' ).indeterminate() );
    assert.notOk( zz( '#t27-1-2' ).indeterminate() );

    zz( '.t27-1' ).indeterminate( true );
    assert.ok( zz( '#t27-1-1' ).indeterminate() );
    assert.ok( zz( '#t27-1-2' ).indeterminate() );

    zz( '.t27-1' ).indeterminate( false );
    assert.notOk( zz( '#t27-1-1' ).indeterminate() );
    assert.notOk( zz( '#t27-1-2' ).indeterminate() );

    zz( '.t27-1' ).indeterminate( true );
    assert.ok( zz( '#t27-1-1' ).indeterminate() );
    assert.ok( zz( '#t27-1-2' ).indeterminate() );
});

QUnit.test( 'prop test', function( assert ) {

    // checked
    assert.notOk( zz( '#t28-1-1' ).prop( 'checked' ) );
    assert.notOk( zz( '#t28-1-2' ).prop( 'checked' ) );

    zz( '.t28-1' ).prop( 'checked', true );
    assert.ok( zz( '#t28-1-1' ).prop( 'checked' ) );
    assert.ok( zz( '#t28-1-2' ).prop( 'checked' ) );

    zz( '.t28-1' ).prop( 'checked', false );
    assert.notOk( zz( '#t28-1-1' ).prop( 'checked' ) );
    assert.notOk( zz( '#t28-1-2' ).prop( 'checked' ) );

    zz( '.t28-1' ).prop( 'checked', true );
    assert.ok( zz( '#t28-1-1' ).prop( 'checked' ) );
    assert.ok( zz( '#t28-1-2' ).prop( 'checked' ) );
    
    // disabled
    assert.notOk( zz( '#t28-2-1' ).prop( 'disabled' ) );
    assert.notOk( zz( '#t28-2-2' ).prop( 'disabled' ) );

    zz( '.t28-2' ).prop( 'disabled', true );
    assert.ok( zz( '#t28-2-1' ).prop( 'disabled' ) );
    assert.ok( zz( '#t28-2-2' ).prop( 'disabled' ) );

    zz( '.t28-2' ).prop( 'disabled', false );
    assert.notOk( zz( '#t28-2-1' ).prop( 'disabled' ) );
    assert.notOk( zz( '#t28-2-2' ).prop( 'disabled' ) );

    zz( '.t28-2' ).prop( 'disabled', true );
    assert.ok( zz( '#t28-2-1' ).prop( 'disabled' ) );
    assert.ok( zz( '#t28-2-2' ).prop( 'disabled' ) );
    
    // indeterminate
    assert.notOk( zz( '#t28-3-1' ).prop( 'indeterminate' ) );
    assert.notOk( zz( '#t28-3-2' ).prop( 'indeterminate' ) );

    zz( '.t28-3' ).prop( 'indeterminate', true );
    assert.ok( zz( '#t28-3-1' ).prop( 'indeterminate' ) );
    assert.ok( zz( '#t28-3-2' ).prop( 'indeterminate' ) );

    zz( '.t28-3' ).prop( 'indeterminate', false );
    assert.notOk( zz( '#t28-3-1' ).prop( 'indeterminate' ) );
    assert.notOk( zz( '#t28-3-2' ).prop( 'indeterminate' ) );
    
    zz( '.t28-3' ).prop( 'indeterminate', true );
    assert.ok( zz( '#t28-3-1' ).prop( 'indeterminate' ) );
    assert.ok( zz( '#t28-3-2' ).prop( 'indeterminate' ) );
});

