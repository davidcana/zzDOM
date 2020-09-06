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

/*
    zz selector object
*/
var zzs = {
    id: function( id ){
        return document.getElementById( id );
    },
    class: function( className ){
        return document.getElementsByClassName( className );
    },
    tag: function( tagName ){
        return document.getElementsByTagName( tagName );
    },
    tagNS: function( namespace, tagName ){
        return document.getElementsByTagNameNS( namespace, tagName );
    },
    name: function( name ){
        return document.getElementsByName( name );
    },
    first: function( string ){
        return document.querySelector( string );
    }
};
