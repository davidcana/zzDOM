/* Utils */
/* It depends on forms plugin! */
// Serialize a ss instance, a mm instance or an object into a query string
zzDOM._paramItem = function( r, key, value ) {
    r.push( 
        encodeURIComponent( key ) + '=' + encodeURIComponent( value == null? '': value )
    );
};
/** @nocollapse */
zzDOM.param = function( x ) {
	
    if ( x == null ) {
        return '';
    }

    var r = [];
    
    if ( x instanceof zzDOM.SS ){
        zzDOM._paramItem( r, x.attr( 'name' ), x.val() );
    } else if ( x instanceof zzDOM.MM ){
        for ( var c = 0; c < x.list.length; ++c ){
            var ss = x.list[ c ];
            zzDOM._paramItem( r, ss.attr( 'name' ), ss.val() );
        }
    } else if ( typeof x === 'object' ){  
        for ( var i in x ) {
            zzDOM._paramItem( r, i, x[ i ] );
        }
    } else {
        throw zzDOM._getError( 'param' );
    }

    return r.join( '&' );
};
/* end of utils */
