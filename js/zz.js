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
    
    throw 'Failed running zz function!';
};

/*
    zz selector object
*/
var zzs = {
    i: function( id ){
        return document.getElementById( id );
    },
    c: function( className ){
        return document.getElementsByClassName( className );
    },
    t: function( tagName ){
        return document.getElementsByTagName( tagName );
    },
    tn: function( namespace, tagName ){
        return document.getElementsByTagNameNS( namespace, tagName );
    },
    n: function( name ){
        return document.getElementsByName( name );
    },
    s: function( string ){
        return document.querySelector( string );
    }
};
