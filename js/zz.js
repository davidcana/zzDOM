/*
    zz function
*/
var zz = function( x ){
    var inner;
    
    if ( x instanceof Element ){
        return new SimpleZZDom( x );
    }
        
    if ( x instanceof NodeList ){
        inner = x;
        
    } else if ( typeof x === 'string' ){
        inner = document.querySelectorAll( x );
    }

    if ( inner ){
        return inner.length === 1? new SimpleZZDom( inner[ 0 ] ): new MultipleZZDom( inner );
    }
    
    throw 'Failed runing zz function!';
};
