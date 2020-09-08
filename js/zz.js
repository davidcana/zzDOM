/*
    zz function
    
    zz( '#', 'id' );
    zz( '.', 'className' );
    zz( 't', 'tagName' );
    zz( 'tn', 'namespace', 'tagName' );
    zz( 'n', 'name' );
    zz( 's', 'string selector' );
    zz( 'string selector' );
*/
var zz = function( x, s1, s2 ){
    
    // Redefine x if a selector id is found
    if ( s1 ){
        switch ( x ){
            case '#':
                x = document.getElementById( s1 );
            case '.':
                x = document.getElementsByClassName( s1 );
            case 't':
                x = document.getElementsByTagName( s1 );
            case 'tn':
                x = document.getElementsByTagNameNS( s1, s2 );
            case 'n':
                x = document.getElementsByName( s1 );
            case 's':
                x = document.querySelector( s1 );
            default:
                throw 'Unsupported selector id found running zz function: ' + x;
        }
    }
    
    // x must be an Element, a NodeList or a standard string selector
    if ( x instanceof Element ){
        return new SimpleZZDom( x );
    }
    
    var inner;
    if ( x instanceof NodeList ){
        inner = x;
        
    } else if ( typeof x === 'string' ){
        inner = document.querySelectorAll( x );
    }

    if ( inner ){
        return inner.length === 1? new SimpleZZDom( inner[ 0 ] ): new MultipleZZDom( inner );
    }
    
    throw 'Unsupported selector type found running zz function.';
};
