/*! zzDOM - v0.0.2 - 2020-09-19 07:12:4 */
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

var SimpleZZDom = function ( _el ) {    
    this.el = _el;
    this.nodes = [ _el ];
};

/* Methods NOT included in jquery */
SimpleZZDom.prototype.styleProperty = function ( property, value ) {
    // get
    if ( value === undefined ){
        return parseFloat(
            getComputedStyle( this.el, null )[ property ].replace( 'px', '' )
        );
    }

    // set
    if ( typeof value === 'function' ) {
        value = value();
    }
    if ( typeof value === 'string' ){
        this.el.style[ property ] = value;
    } else {
        this.el.style[ property ] = value + 'px';
    }
    return this;
};

SimpleZZDom.prototype.setCssUsingKeyValue = function ( key, value ) {
    this.el.style[ key ] = value;
};

SimpleZZDom.prototype.setCssUsingObject = function ( object ) {
    for ( var key in object ) {
        this.setCssUsingKeyValue( key, object[ key ] );
    }
};

SimpleZZDom.prototype.insertHelper = function ( position, x ) {
    if ( x instanceof Element ){
        this.el.insertAdjacent( position, x );
    } else if ( x instanceof SimpleZZDom ){
        this.el.insertAdjacent( position, x.el );
    } else if ( typeof x === 'string' ) {
        this.el.insertAdjacentHTML( position, x );
    } else {
        throw 'Insert operation not ready for that type!';
    }
    return this;
};

SimpleZZDom.prototype.buildError = function ( method ) {
    return 'Method "' + method + '" not ready for that type!';
};

/* Methods included in jquery */
SimpleZZDom.prototype.addClass = function ( name ) {
    this.el.classList.add( name );
    return this;
};

SimpleZZDom.prototype.after = function ( x ) {
    return this.insertHelper( 'afterend', x );
};

SimpleZZDom.prototype.append = function ( x ) {
    if ( x instanceof Element ){
        this.el.appendChild( x );
    } else if ( x instanceof SimpleZZDom ){
        this.el.appendChild( x.el );
    } else if ( typeof x === 'string' ) {
        this.el.insertAdjacentHTML( 'beforeend', x );
    } else {
        throw this.buildError( 'append' );
    }
    return this;
};

SimpleZZDom.prototype.before = function ( x ) {
    return this.insertHelper( 'beforebegin', x );
};

SimpleZZDom.prototype.children = function ( selector ) {
    return zzDOM.buildInstance( 
        selector?
        Array.prototype.filter.call(
            this.el.children, 
            function( child ){
                return child.matches( selector );
            }
        ):
        this.el.children 
    );
};

SimpleZZDom.prototype.siblings = function ( selector ) {
    var self = this;
    var nodes = Array.prototype.filter.call( 
        this.el.parentNode.children, 
        selector?
            function( child ){
                return child !== self.el && child.matches( selector );
            }:
            function( child ){
                return child !== self.el;
            }
    );
    return zzDOM.buildInstance( nodes );
};

SimpleZZDom.prototype.clone = function (  ) {
    return new SimpleZZDom( this.el.cloneNode( true ) );
};

SimpleZZDom.prototype.empty = function (  ) {
    while( this.el.firstChild ){
        this.el.removeChild( this.el.firstChild );
    }
    return this;
};

SimpleZZDom.prototype.filter = function ( x ) {
    if ( typeof x === 'string' ){ // Is a string selector
        return zzDOM.buildInstance( 
            this.el.matches( x )? [ this.el ]: []
        );
    }
    
    if ( typeof x === 'function' ){ // Is a function
        return zzDOM.buildInstance(
            x( this )? [ this.el ]: []
        );
    }  
    
    throw this.buildError( 'filter' );
};

SimpleZZDom.prototype.find = function ( selector ) {
    return zzDOM.buildInstance( 
        this.el.querySelectorAll( selector )
    );
};

SimpleZZDom.prototype.attr = function ( name, value ) {
    // get
    if ( value === undefined ){
        return this.el.getAttribute( name );
    }
    
    // set
    this.el.setAttribute( name, value );
    return this;
};

SimpleZZDom.prototype.height = function ( value ) {
    return this.styleProperty( 'height', value );
};

SimpleZZDom.prototype.html = function ( value ) {
    // get
    if ( value === undefined ){
        return this.el.innerHTML;
    }

    // set
    this.el.innerHTML = value;
    return this;
};

SimpleZZDom.prototype.css = function () {
    var number = arguments.length;
    
    if ( number === 1 ){
        var arg1 = arguments[ 0 ];
        
        if ( ! arg1 ){
            throw 'Null value not allowed in css method!';
        }
        
        // get
        if ( typeof arg1 === 'string' ) {
            return getComputedStyle( this.el )[ arguments[0] ];
        }
        
        // set using object
        if ( typeof arg1 === 'object' ){
            this.setCssUsingObject( arg1 );
            return this;
        }
        
        throw 'Wrong type or argument in css method!';
    }
    
    // set using key value pair
    if ( number === 2 ){
        this.setCssUsingKeyValue( arguments[ 0 ], arguments[ 1 ] );
        return this;
    }
    
    throw 'Wrong number of arguments in css method!';
};

SimpleZZDom.prototype.text = function ( value ) {
    // get
    if ( value === undefined ){
        return this.el.textContent;
    }

    // set
    this.el.textContent = value;
    return this;
};

SimpleZZDom.prototype.width = function ( value ) {
    return this.styleProperty( 'width', value );
};

/* TODO: MultipleZZDOM version must implement any */
SimpleZZDom.prototype.hasClass = function ( name ) {
    return this.el.classList.contains( name );
};

SimpleZZDom.prototype.index = function () {
    if ( ! this.el ){
        return -1;
    }
    
    var i = 0;
    var currentEl = this.el;
    do {
        i++;
    } while ( currentEl = currentEl.previousElementSibling );
    
    return i;
};

SimpleZZDom.prototype.is = function ( x ) {
    if ( x == null ){
        return false;    
    }
    
    if ( x instanceof Element ){
        return this.el === x;
    }
    
    if ( x instanceof SimpleZZDom ) {
        return this.el === x.el;
    } 

    if ( x instanceof MultipleZZDom ) {
        for ( var i = 0; i < x.nodes.length; ++i ){
            if ( this.el === x.nodes[ i ] ){
                return true;
            }
        }
        return false;
    } 

    if ( typeof x === 'string' ){
        return this.el.matches( x );
    }
    
    return false;
};

SimpleZZDom.prototype.next = function () {
    return new SimpleZZDom( this.el.nextElementSibling );
};

SimpleZZDom.prototype.offset = function ( c ) {
    
    // set top and left using css
    if ( c ){
        this.styleProperty( 'top', c.top );
        this.styleProperty( 'left', c.left );
        return this;
    }
    
    // get
    var rect = this.el.getBoundingClientRect();
    return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
    };
};

SimpleZZDom.prototype.offsetParent = function () {
    var offsetParent = this.el.offsetParent;
    return offsetParent? new SimpleZZDom( offsetParent ): this;
};

SimpleZZDom.prototype.outerHeight = function ( withMargin ) {
    var height = this.el.offsetHeight;
    
    // No margin
    if ( ! withMargin ){
        return height;
    }
    
    // With margin
    var style = getComputedStyle( this.el );
    return height + parseInt( style.marginTop ) + parseInt( style.marginBottom );
};

SimpleZZDom.prototype.outerWidth = function ( withMargin ) {
    var width = this.el.offsetWidth;

    // No margin
    if ( ! withMargin ){
        return width;
    }
    
    // With margin
    var style = getComputedStyle( this.el );
    return width + parseInt( style.marginLeft ) + parseInt( style.marginRight );
};

SimpleZZDom.prototype.parent = function () {
    return new SimpleZZDom( this.el.parentNode );
};

SimpleZZDom.prototype.position = function ( relativeToViewport ) {
    return relativeToViewport?
        this.el.getBoundingClientRect():
        { 
            left: this.el.offsetLeft, 
            top: this.el.offsetTop
        };
};

SimpleZZDom.prototype.prepend = function ( x ) {
    if ( x instanceof Element ){
        this.el.insertBefore( x, this.el.firstChild );
    } else if ( x instanceof SimpleZZDom ){
        this.el.insertBefore( x.el, this.el.firstChild );
    } else if ( typeof x === 'string' ){
        this.el.insertAdjacentHTML( 'afterbegin', x );
    } else {
        throw this.buildError( 'prepend' );
    }
    return this;
};

SimpleZZDom.prototype.prev = function () {
    return new SimpleZZDom( this.el.previousElementSibling );
};

SimpleZZDom.prototype.remove = function () {
    this.el.parentNode.removeChild( this.el );
    return this;
};

SimpleZZDom.prototype.removeAttr = function ( name ) {
    this.el.removeAttribute( name );
    return this;
};

SimpleZZDom.prototype.removeClass = function ( name ) {
    this.el.classList.remove( name );
    return this;
};

SimpleZZDom.prototype.replaceWith = function ( value ) {
    this.el.outerHTML = value;
    return this;
};

SimpleZZDom.prototype.toggleClass = function ( name ) {
    this.el.classList.toggle( name );
    return this;
};

SimpleZZDom.prototype.hide = function () {
    if ( this.el.style.display ){
        this.attr( 'data-display', this.el.style.display );
    }
    this.el.style.display = 'none';
    return this;
};

SimpleZZDom.prototype.show = function () {
    var display = this.attr( 'data-display' );
    this.el.style.display = display? display: 'block';
    return this;
};

SimpleZZDom.prototype.toggle = function () {
    return this.isVisible()? this.hide(): this.show();
};

SimpleZZDom.prototype.isVisible = function () {
    return !! this.el.offsetParent;
    //return getComputedStyle( this.el, null ).getPropertyValue( 'display' ) !== 'none';
};

SimpleZZDom.prototype.each = function ( eachFn ) {
    eachFn( this );
    return this;
};

SimpleZZDom.prototype.appendTo = function ( x ) {
    // Do nothing and return this if it is null
    if ( x == null ){
        return this;    
    }
    
    // Is it a Element?
    if ( x instanceof Element ){
        x.appendChild( this.el );
        return this;
    }
    
    // Is it a string?
    if ( typeof x === 'string' ){
        x = zzDOM.buildInstance(
            document.querySelectorAll( x )
        );
    }
    
    // Is it a SimpleZZDom?
    if ( x instanceof SimpleZZDom ) {
        //x.append( this.el );
        x.el.appendChild( this.el );
        return this;
    }
    
    // Is it a MultipleZZDom?
    if ( x instanceof MultipleZZDom ) {
        /*
        for ( var i = 0; i < x.list.length; ++i ){
            x.list[ i ].append( this.el.cloneNode( true ) );
        }
        */
        for ( var i = 0; i < x.nodes.length; ++i ){
            x.nodes[ i ].appendChild( this.el.cloneNode( true ) );
        }
        return this;
    } 
    
    throw this.buildError( 'is' );
};

SimpleZZDom.prototype.trigger = function ( eventName ) {
    var event = document.createEvent( 'HTMLEvents' );
    event.initEvent( eventName, true, false );
    this.el.dispatchEvent( event );
    return this;
};

SimpleZZDom.prototype.getElId = function(){
    var elId = this.el.getAttribute( 'data-elId' );
    if ( ! elId ){
        // Generate a random string with 4 chars
        elId = Math.floor( ( 1 + Math.random() ) * 0x10000 )
            .toString( 16 )
            .substring( 1 );
        this.el.setAttribute( 'data-elId', elId );
    }
    return elId;
};


SimpleZZDom.prototype.on = function ( eventName, listener, useCapture ) {
    zzDOM.addEventListener( this, eventName, listener, useCapture );
    return this;
};

SimpleZZDom.prototype.off = function ( eventName, listener, useCapture ) {
    zzDOM.removeEventListener( this, eventName, listener, useCapture );
    return this;
};

var MultipleZZDom = function ( _nodes ) {    
    
    // Init list and nodes 
    this.list = [];
    this.nodes = _nodes;
    for ( var i = 0; i < this.nodes.length; i++ ) {
        this.list.push( 
            new SimpleZZDom( this.nodes[ i ] )
        );
    }
};

MultipleZZDom.prototype._constructors = {};
MultipleZZDom.prototype._constructors.concat = function( functionId ){
    return function(){
        var newNodes = [];
        for ( var i = 0; i < this.list.length; i++ ) {
            var simpleZZDom = this.list[ i ];
            var x = simpleZZDom[ functionId ].apply( simpleZZDom, arguments );
            newNodes = newNodes.concat( x.nodes );
        }
        return zzDOM.buildInstance( newNodes );
    };
};
MultipleZZDom.prototype._constructors.booleanOr = function( functionId ){
    return function(){
        for ( var i = 0; i < this.list.length; i++ ) {
            var simpleZZDom = this.list[ i ];
            var x = simpleZZDom[ functionId ].apply( simpleZZDom, arguments );
            if ( x ){
                return true;
            }
        }
        return false;
    };
};
MultipleZZDom.prototype._constructors.default = function( functionId ){
    return function(){
        for ( var i = 0; i < this.list.length; i++ ) {
            var simpleZZDom = this.list[ i ];
            var r = simpleZZDom[ functionId ].apply( simpleZZDom, arguments );
            if ( i === 0 && ! ( r instanceof SimpleZZDom ) ){
                return r;
            }
        }
        return this;
    };
};

// Init prototype functions from SimpleZZDom
MultipleZZDom.mInit = function(){
    for ( var id in SimpleZZDom.prototype ){
        var closure = function(){
            var functionId = id;
            
            switch ( SimpleZZDom.prototype[ functionId ] ){
            // Concat functions
            case SimpleZZDom.prototype.siblings:
            case SimpleZZDom.prototype.prev:
            case SimpleZZDom.prototype.next:
            case SimpleZZDom.prototype.children:
            case SimpleZZDom.prototype.parent:
            case SimpleZZDom.prototype.find:
            case SimpleZZDom.prototype.filter:
            case SimpleZZDom.prototype.offsetParent:
            case SimpleZZDom.prototype.clone:
                return MultipleZZDom.prototype._constructors.concat( functionId );
            // Boolean functions
            case SimpleZZDom.prototype.is:
                return MultipleZZDom.prototype._constructors.booleanOr( functionId );
            // Default function
            default:
                return MultipleZZDom.prototype._constructors.default( functionId );
            }
        };
        MultipleZZDom.prototype[ id ] = closure();
    }
}();

/* Methods included in jquery */
MultipleZZDom.prototype.each = function ( eachFn ) {
    Array.prototype.forEach.call( this.list, eachFn );
    return this;
};
