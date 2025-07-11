QUnit.test( 'hide, show, toggle and isVisible test', function( assert ) {
    // .t15-1 is visible
    assert.notEqual( zz( '#t15-1-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-1-2' ).el.offsetParent, null );
    var ids = [];
    zz( '.t15-1' )
        .hide()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-1-1', 't15-1-2' ] );
    assert.equal( zz( '#t15-1-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-1-2' ).el.offsetParent, null );
    ids = [];
    zz( '.t15-1' )
        .show()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-1-1', 't15-1-2' ] );
    assert.notEqual( zz( '#t15-1-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-1-2' ).el.offsetParent, null );
    ids = [];
    zz( '.t15-1' )
        .hide()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-1-1', 't15-1-2' ] );
    assert.equal( zz( '#t15-1-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-1-2' ).el.offsetParent, null );
    
    // .t15-2 is NOT visible
    assert.equal( zz( '#t15-2-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-2-2' ).el.offsetParent, null );
    zz( '.t15-2' ).show();
    assert.notEqual( zz( '#t15-2-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-2-2' ).el.offsetParent, null );
    zz( '.t15-2' ).hide();
    assert.equal( zz( '#t15-2-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-2-2' ).el.offsetParent, null );
    zz( '.t15-2' ).show();
    assert.notEqual( zz( '#t15-2-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-2-2' ).el.offsetParent, null );
    
    // .t15-3 is visible
    assert.notEqual( zz( '#t15-3-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-3-2' ).el.offsetParent, null );
    ids = [];
    zz( '.t15-3' )
        .toggle()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-3-1', 't15-3-2' ] );
    assert.equal( zz( '#t15-3-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-3-2' ).el.offsetParent, null );
    ids = [];
    zz( '.t15-3' )
        .toggle()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-3-1', 't15-3-2' ] );
    assert.notEqual( zz( '#t15-3-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-3-2' ).el.offsetParent, null );
    ids = [];
    zz( '.t15-3' )
        .toggle()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-3-1', 't15-3-2' ] );
    assert.equal( zz( '#t15-3-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-3-2' ).el.offsetParent, null );
    
    // .t15-4 is NOT visible
    assert.equal( zz( '#t15-4-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-4-2' ).el.offsetParent, null );
    zz( '.t15-4' ).toggle();
    assert.notEqual( zz( '#t15-4-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-4-2' ).el.offsetParent, null );
    zz( '.t15-4' ).toggle();
    assert.equal( zz( '#t15-4-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-4-2' ).el.offsetParent, null );
    zz( '.t15-4' ).toggle();
    assert.notEqual( zz( '#t15-4-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-4-2' ).el.offsetParent, null );
    
    // .t15-5 is visible
    assert.notEqual( zz( '#t15-5-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-5-2' ).el.offsetParent, null );
    assert.ok( zz( '#t15-5-1' ).isVisible() );
    assert.ok( zz( '#t15-5-2' ).isVisible() );
    zz( '.t15-5' ).hide();
    assert.notOk( zz( '#t15-5-1' ).isVisible() );
    assert.notOk( zz( '#t15-5-2' ).isVisible() );
    zz( '.t15-5' ).show();
    assert.ok( zz( '#t15-5-1' ).isVisible() );
    assert.ok( zz( '#t15-5-2' ).isVisible() );
    
    // .t15-6 is NOT visible
    assert.equal( zz( '#t15-6-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-6-2' ).el.offsetParent, null );
    assert.notOk( zz( '#t15-6-1' ).isVisible() );
    assert.notOk( zz( '#t15-6-2' ).isVisible() );
    zz( '.t15-6' ).show();
    assert.ok(  zz( '#t15-6-1' ).isVisible() );
    assert.ok(  zz( '#t15-6-2' ).isVisible() );
    zz( '.t15-6' ).hide();
    assert.notOk(  zz( '#t15-6-1' ).isVisible() );
    assert.notOk(  zz( '#t15-6-2' ).isVisible() );
    
    // #t15-7-1 is visible and #t15-7-2 is NOT visible
    assert.ok( zz( '#t15-7-1' ).isVisible() );
    assert.notOk( zz( '#t15-7-2' ).isVisible() );
    zz( '.t15-7' ).toggle();
    assert.notOk( zz( '#t15-7-1' ).isVisible() );
    assert.ok( zz( '#t15-7-2' ).isVisible() );
    zz( '.t15-7' ).toggle();
    assert.ok( zz( '#t15-7-1' ).isVisible() );
    assert.notOk( zz( '#t15-7-2' ).isVisible() );
});

QUnit.test( 'fadeIn and fadeOut test', function( assert ) {
    
    // fadeOut
    assert.ok( zz( '#t29-1-1' ).isVisible() );
    assert.ok( zz( '#t29-1-2' ).isVisible() );
    const done1 = assert.async();
    zz( '.t29-1' ).fadeOut(
        {
            callback: function(){
                assert.notOk( zz( '#t29-1-1' ).isVisible() );
                assert.notOk( zz( '#t29-1-2' ).isVisible() );
                done1();
            }
        }
    );
    assert.ok( zz( '#t29-1-1' ).isVisible() ); // Still visible
    assert.ok( zz( '#t29-1-2' ).isVisible() ); // Still visible
    
    // fadeIn
    assert.notOk( zz( '#t29-2-1' ).isVisible() );
    assert.notOk( zz( '#t29-2-2' ).isVisible() );
    const done2 = assert.async();
    zz( '.t29-2' ).fadeIn(
        {
            callback: function(){
                assert.ok( zz( '#t29-2-1' ).isVisible() );
                assert.ok( zz( '#t29-2-2' ).isVisible() );
                done2();
            }
        }
    );

    // fadeOut nor arguments
    assert.ok( zz( '#t29-3-1' ).isVisible() );
    assert.ok( zz( '#t29-3-2' ).isVisible() );
    zz( '.t29-3' ).fadeOut();
    assert.ok( zz( '#t29-3-1' ).isVisible() ); // Still visible
    assert.ok( zz( '#t29-3-2' ).isVisible() ); // Still visible
    const done3 = assert.async();
    setTimeout(
        function () {
            assert.notOk( zz( '#t29-3-1' ).isVisible() ); // Must not be visible yet
            assert.notOk( zz( '#t29-3-2' ).isVisible() ); // Must not be visible yet
            done3();
        },
        500
    );
});

QUnit.test( 'no nodes visible test', function( assert ) {

    var $notFound = zz( '#notFound' );

    // Some elements must return an empty zzDOM object
    utils.check0Length(
        assert,
        [
            $notFound.fadeIn(),
            $notFound.fadeOut(),
            $notFound.hide(),
            $notFound.show(),
            $notFound.toggle()
        ]
    );
    
    // Some elements must return null
    utils.checkNull(
        assert,
        [
            $notFound.isVisible()
        ]
    );

    // Some elements must return false
    utils.checkFalse(
        assert,
        [

        ]
    );
});
