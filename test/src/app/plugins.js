"use strict";

// Unit tests
QUnit.test( 'Hello world test', function( assert ) {
    
    zzDOM.add( 
        zzDOM.SS.prototype.hello = function(){
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
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.equal( zz( '#t1-2-1' ).text(), t2_1_modified );
    assert.equal( zz( '#t1-2-2' ).text(), t2_1_original[ 1 ] );
    assert.equal( zz( '#t1-2-3' ).text(), t2_1_modified );
    assert.deepEqual( ids, [ 't1-2-1', 't1-2-3' ] );
});

QUnit.test( 'is numeric test', function( assert ) {
    
    zzDOM.add( 
        zzDOM.SS.prototype.isNumeric = function(){
            return ! isNaN( this.el.textContent );
        },
        zzDOM.MM.constructors.booleanOr
    );
    
    var t2_1_original = 'white',
        t2_2_original = '7';
    assert.equal( zz( '#t2-1-1' ).text(), t2_1_original );
    assert.equal( zz( '#t2-1-2' ).text(), t2_2_original );
    assert.notOk( zz( '#t2-1-1' ).isNumeric() );
    assert.ok( zz( '#t2-1-2' ).isNumeric() );
    assert.equal( zz( '#t2-1-1' ).text(), t2_1_original );
    assert.equal( zz( '#t2-1-2' ).text(), t2_2_original );
    
    t2_2_original = [ 'white', '7' ];
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

QUnit.test( 'velocity with 1 element test', function( assert ) {
    
    zzDOM.add( 
        zzDOM.SS.prototype.velocity = function(){
             
            //    Conventional Velocity call:
            //    Velocity( this.el, options1, options2 );
            
            // Build args array with this.el as first position and then the arguments of this function
            var args = Array.prototype.slice.call( arguments );
            args.unshift( this.el );
            
            // Call Velocity using the new array
            Velocity.apply( Velocity, args );
            
            return this;
        }
    );
    
    var offset_original = {
        left: 700,
        top: 400
    }, offset_modified1 = {
        left: 1300,
        top: 400
    }, offset_modified2 = {
        left: 1300,
        top: 600
    };
    
    var offset = zz( '#t3-1' ).offset();
    assert.equal( offset.left, offset_original.left );
    assert.equal( offset.top, offset_original.top );
    
    var done = assert.async();
    
    zz( '#t3-1' )
        .velocity(
            {
                'left': offset_modified1.left,
                'top': offset_modified1.top
            }
        ).velocity(
            {
                'left': offset_modified2.left,
                'top': offset_modified2.top
            },
            {
                'complete': function(){
                    offset = zz( '#t3-1' ).offset();
                    assert.equal( offset.left, offset_modified2.left );
                    assert.equal( offset.top, offset_modified2.top );
                    done();
                }
            }
        );
});

QUnit.test( 'velocity with several elements test', function( assert ) {

    zzDOM.add( 
        zzDOM.SS.prototype.velocity = function(){
             
            //    Conventional Velocity call:
            //    Velocity( this.el, options1, options2 );
            
            // Build args array with this.el as first position and then the arguments of this function
            var args = Array.prototype.slice.call( arguments );
            args.unshift( this.el );
            
            // Call Velocity using the new array
            Velocity.apply( Velocity, args );
            
            return this;
        }
    );

    /*
    zzDOM.SS.prototype.velocity = function(){
         
        //    Conventional Velocity call:
        //    Velocity( this.el, options1, options2 );
        

        // Build args array with this.el as first position and then the arguments of this function
        var args = Array.prototype.slice.call( arguments );
        args.unshift( this.el );

        // Call Velocity using the new array
        Velocity.apply( Velocity, args );

        return this;
    };
    zzDOM.MM.prototype.velocity = function () {
        return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.velocity, arguments );
    };
    */
    
    var offset_original1 = {
        left: 500,
        top: 300
    }, offset_original2 = {
        left: 700,
        top: 300
    }, translate = 200;
        
    
    var offset1 = zz( '#t4-1-1' ).offset();
    assert.equal( offset1.left, offset_original1.left );
    assert.equal( offset1.top, offset_original1.top );
    
    var offset2 = zz( '#t4-1-2' ).offset();
    assert.equal( offset2.left, offset_original2.left );
    assert.equal( offset2.top, offset_original2.top );
    
    var done = assert.async();
    var c = 0;
    zz( '.t4-1' )
        .velocity(
            {
                'translateX': translate + "px"
            }
        ).velocity(
            {
                'translateY': translate + "px"
            },
            {
                'complete': function(){
                    if ( c++ === 1 ){
                    
                        offset1 = zz( '#t4-1-1' ).offset();
                        assert.equal( offset1.left, offset_original1.left + translate );
                        assert.equal( offset1.top, offset_original1.top + translate );
                    
                        offset2 = zz( '#t4-1-2' ).offset();
                        assert.equal( offset2.left, offset_original2.left + translate );
                        assert.equal( offset2.top, offset_original2.top + translate );
                        
                        done();
                    }
                }
            }
        );
});
