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
        t19_5_modified = [ 'fsf', 'linux' ],
        t19_8_1_original = 'fsf',
        t19_8_1_modified = 'linux',
        t19_9_original = 'test value t19-9',
        t19_9_modified = t19_9_original + ' modified',
        t19_10_original = 'test value t19-10',
        t19_10_modified = t19_10_original + ' modified';
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

    assert.equal( zz( '#t19-8-1' ).val(), t19_8_1_original );
    zz( '#t19-8-1' ).val( t19_8_1_modified );
    assert.equal( zz( '#t19-8-1' ).val(), t19_8_1_modified );

    assert.equal( zz( '#t19-9' ).val(), t19_9_original );
    zz( '#t19-9' ).val( t19_9_modified );
    assert.equal( zz( '#t19-9' ).val(), t19_9_modified );

    assert.equal( zz( '#t19-10' ).val(), t19_10_original );
    zz( '#t19-10' ).val( t19_10_modified );
    assert.equal( zz( '#t19-10' ).val(), t19_10_modified );
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
