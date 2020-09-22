/* zzDOM object */
/**
 * A namespace.
 * @const
 */
var zzDOM = {};

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
    
    // Is it an HTMLCollection or a NodeList?
    if ( x instanceof HTMLCollection || x instanceof NodeList ){
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

/*
Unify the definition of a function of zzDOM.SS.prototype and a definition of zzDOM.MM.prototype. Example:

    zzDOM.add( 
        zzDOM.SS.prototype.myCustomFunction = function(){
            ...
            return this;
        },
        zzDOM.MM.constructors.concat
    );
);
*/
zzDOM.add = function( ssPrototype, constructor ){
    for ( var id in zzDOM.SS.prototype ){
        var current = zzDOM.SS.prototype[ id ];
        if ( ssPrototype === current ){
            var closure = function(){
                var functionId = id;
                return constructor? constructor( functionId ): zzDOM.MM.constructors.default( functionId );
            };
            zzDOM.MM.prototype[ id ] = closure();
            return;
        }
    }
    
    throw 'Error registering zzDOM.MM: zzDOM.SS not found.';
};

zzDOM._htmlToElement = function ( html ) {
    var template = document.createElement( 'template' );
    template.innerHTML = html.trim();
    return template.content.childElementCount === 1?
        template.content.firstChild:
        template.content.childNodes;
};

zzDOM._build = function ( x ) {
    if ( x instanceof Element ){
        return new zzDOM.SS( x );
    }
    if ( x instanceof HTMLCollection || x instanceof NodeList ){
        x = Array.prototype.slice.call( x );
    }
    return x.length === 1? new zzDOM.SS( x[ 0 ] ): new zzDOM.MM( x );
};

/* Events */
zzDOM._events = {};

zzDOM._addEventListener = function( ss, eventName, listener, useCapture ){
    var el = ss.el;
    var elId = ss._getElId();
    var thisEvents = zzDOM._events[ elId ];
    if ( ! thisEvents ){
        thisEvents = {};
        zzDOM._events[ elId ] = thisEvents;
    }
    var thisListeners = thisEvents[ eventName ];
    if ( ! thisListeners ){
        thisListeners = [];
        thisEvents[ eventName ] = thisListeners;
    }
    thisListeners.push( listener );
    
    // addEventListener
    el.addEventListener( eventName, listener, useCapture );
};

zzDOM._removeEventListener = function( ss, eventName, listener, useCapture ){
    var el = ss.el;
    var elId = ss._getElId();
    var thisEvents = zzDOM._events[ elId ];
    if ( ! thisEvents ){
        return;
    }
    
    if ( ! eventName ){ 
        // Must remove all events
        for ( var currentEventName in thisEvents ){
            var currentListeners = thisEvents[ currentEventName ];
            zzDOM._removeListeners( el, currentListeners, null, useCapture, currentEventName );
        }
        return;
    }
    
    // Must remove listeners of only one event
    var thisListeners = thisEvents[ eventName ];
    zzDOM._removeListeners( el, thisListeners, listener, useCapture, eventName );
};

zzDOM._removeListeners = function( el, thisListeners, listener, useCapture, eventName ){
    if ( ! thisListeners ){
        return;
    }
    for ( var i = 0; i < thisListeners.length; ++i ){
        var currentListener = thisListeners[ i ];
        if ( ! listener || currentListener === listener ){
            delete thisListeners[ i ];
            el.removeEventListener( eventName, currentListener, useCapture );
            return;
        }
    } 
};
/* End of events */

// Register zz function
window.zz = zzDOM.zz;
