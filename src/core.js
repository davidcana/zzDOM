/* core object */
/**
 * A namespace.
 * @const
 */
export const core = {};

// Import modules
import { SS } from './ss.js';

core.register = function( zzDOM ){

    // Register SS; MM register pending
    zzDOM.SS = SS;

    /*
        zz function
        
        zz( '#', 'id' );
        zz( '.', 'className' );
        zz( 't', 'tagName' );
        zz( 'tn', 'namespace', 'tagName' );
        zz( 'n', 'name' );
        zz( 's', 'string selector' );
        zz( document.getElementById( 'id' ) ); // Element
        zz( document.getElementsByClassName( 'className' ) ); // HTMLCollection
        zz( document.getElementsByName( 'name' ) ); // NodeList
        zz( 'table.className tr td' ); // String selector
        zz( '<div>New div</div>' ); // HTML code in string
    */
    /**
     * @param {string|Element|HTMLCollection|NodeList} x
     * @param {string=} s1
     * @param {string=} s2 
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
                x = document.getElementsByTagNameNS( s1, s2 || '' );
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
        
        // Is it an Element?
        if ( x instanceof Element ){
            return new zzDOM.SS( x );
        }
        
        // Is it an HTMLCollection, a NodeList or an array?
        if ( x instanceof HTMLCollection || x instanceof NodeList || Array.isArray( x ) ){
            return zzDOM._build( x );
        }
        
        if ( typeof x === 'string' ){
            x = x.trim();
            return zzDOM._build(
                x.charAt( 0 ) === '<'? // Is it HTML code?
                    zzDOM._htmlToElement( x ):
                    document.querySelectorAll( x ) // Must be a standard selector
            );
        }
        
        throw 'Unsupported selector type found running zz function.';
    };

    // Build args array with toInsert as first position and then the arguments of this function
    zzDOM._args = function( previousArgs, toInsert ){
        var result = Array.prototype.slice.call( previousArgs );
        result.push( toInsert );
        return result;
    };

    zzDOM._build = function ( x ) {
        if ( x == null ){
            return null;
        }
        if ( x instanceof Element || typeof x === 'string' ){ // Allow string to support map method
            return new zzDOM.SS( x );
        }
        if ( x instanceof HTMLCollection || x instanceof NodeList || Array.isArray( x ) ){
            x = Array.prototype.slice.call( x );
        }
        return x.length === 1? new zzDOM.SS( x[ 0 ] ): new zzDOM.MM( x );
    };

    zzDOM._getError = function ( method ) {
        return 'Method "' + method + '" not ready for that type!';
    };

    zzDOM._htmlToElement = function ( html ) {
        var template = document.createElement( 'template' );
        template.innerHTML = html.trim();
        return template.content.childElementCount === 1?
            template.content.firstChild:
            template.content.childNodes;
    };

    zzDOM._get = function ( nodes, i ) {
        if ( i == null ){
            return nodes;
        }
        if ( Number.isInteger( i ) ){
            return nodes[ i ];
        }
        throw zzDOM._getError( 'get' );
    };

    /* Utils */
    /* It depends on forms plugin (using val method)! */
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
};
