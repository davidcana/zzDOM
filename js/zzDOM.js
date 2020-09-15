/* zzDOM object */
var zzDOM = {};

zzDOM.htmlToElement = function ( html ) {
    var template = document.createElement( 'template' );
    template.innerHTML = html.trim();
    return template.content.firstChild;
};

zzDOM.buildInstance = function ( x ) {
    if ( x instanceof HTMLCollection ){
        x = Array.prototype.slice.call( x );
    }
    return x.length === 1? new SimpleZZDom( x[ 0 ] ): new MultipleZZDom( x );
};

/*
    zz function
    
    zz( '#', 'id' );
    zz( '.', 'className' );
    zz( 't', 'tagName' );
    zz( 'tn', 'namespace', 'tagName' );
    zz( 'n', 'name' );
    zz( 's', 'string selector' );
    zz( document.getElementById( 'id' ) ); // Element
    zz( document.getElementsByClassName( 'className' ) ); // NodeList
    zz( '<div>New div</div>' ); // HTML code in string
    zz( 'table.className tr td' ); // String selector
*/
zzDOM.zz = function( x, s1, s2 ){
    
    // Redefine x if a selector id is found
    if ( s1 ){
        switch ( x ){
            case '#':
                x = document.getElementById( s1 );
                break;
            case '.':
                x = document.getElementsByClassName( s1 );
                break;
            case 't':
                x = document.getElementsByTagName( s1 );
                break;
            case 'tn':
                x = document.getElementsByTagNameNS( s1, s2 );
                break;
            case 'n':
                x = document.getElementsByName( s1 );
                break;
            case 's':
                x = document.querySelector( s1 );
                break;
            default:
                throw 'Unsupported selector id found running zz function: ' + x;
        }
    }
    
    // x must be an Element, a NodeList or a standard string selector
    
    // Is it an Element?
    if ( x instanceof Element ){
        return new SimpleZZDom( x );
    }
    
    var nodes;
    // Is it a NodeList?
    if ( x instanceof NodeList ){
        nodes = x;
        
    } else if ( typeof x === 'string' ){
        // Is it HTML code?
        if ( x.charAt( 0 ) === '<' ){
            return new SimpleZZDom( zzDOM.htmlToElement( x ) );
            
        // Must be a standard selector
        } else {
            nodes = document.querySelectorAll( x );
        }
    }

    if ( nodes ){
        return zzDOM.buildInstance( nodes );
    }
    
    throw 'Unsupported selector type found running zz function.';
};

// Register zz function
window.zz = zzDOM.zz;
