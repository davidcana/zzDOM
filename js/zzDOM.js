/* zzDOM object */
var zzDOM = {};

zzDOM.htmlToElement = function ( html ) {
    var template = document.createElement( 'template' );
    template.innerHTML = html.trim();
    return template.content.childElementCount === 1?
        template.content.firstChild:
        template.content.childNodes;
};

zzDOM.buildInstance = function ( x ) {
    if ( x instanceof Element ){
        return new SimpleZZDom( x );
    }
    if ( x instanceof HTMLCollection || x instanceof NodeList ){
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
    zz( document.getElementsByClassName( 'className' ) ); // HTMLCollection
    zz( document.getElementsByName( 'name' ) ); // NodeList
    zz( 'table.className tr td' ); // String selector
    zz( '<div>New div</div>' ); // HTML code in string
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
    
    // Is it an Element?
    if ( x instanceof Element ){
        return new SimpleZZDom( x );
    }
    
    // Is it an HTMLCollection or a NodeList?
    if ( x instanceof HTMLCollection || x instanceof NodeList ){
        return zzDOM.buildInstance( x );
    }
    
    if ( typeof x === 'string' ){
        x = x.trim();
        return zzDOM.buildInstance(
            x.charAt( 0 ) === '<'? // Is it HTML code?
            zzDOM.htmlToElement( x ):
            document.querySelectorAll( x ) // Must be a standard selector
        );
    }
    
    throw 'Unsupported selector type found running zz function.';
};

zzDOM.events = {};

zzDOM.addEventListener = function( simpleZZDom, eventName, listener, useCapture ){
    var el = simpleZZDom.el;
    var elId = simpleZZDom.getElId();
    var thisEvents = zzDOM.events[ elId ];
    if ( ! thisEvents ){
        thisEvents = {};
        zzDOM.events[ elId ] = thisEvents;
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

zzDOM.removeEventListener = function( simpleZZDom, eventName, listener, useCapture ){
    var el = simpleZZDom.el;
    var elId = simpleZZDom.getElId();
    var thisEvents = zzDOM.events[ elId ];
    if ( ! thisEvents ){
        return;
    }
    
    if ( ! eventName ){ 
        // Must remove all events
        for ( var currentEventName in thisEvents ){
            var currentListeners = thisEvents[ currentEventName ];
            zzDOM.removeListeners( el, currentListeners, null, useCapture, currentEventName );
        }
        return;
    }
    
    // Must remove listeners of only one event
    var thisListeners = thisEvents[ eventName ];
    zzDOM.removeListeners( el, thisListeners, listener, useCapture, eventName );
};

zzDOM.removeListeners = function( el, thisListeners, listener, useCapture, eventName ){
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

// Register zz function
window.zz = zzDOM.zz;
