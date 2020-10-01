/*! zzdom - v0.2.0 - 2020-10-01 08:28:53 */
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
var zz;
(function() { 
    zz = zzDOM.zz; 
})();

/** @constructor */
zzDOM.SS = function ( _el ) {
    this.el = _el;
    this.nodes = [ _el ];
};

/* Methods NOT included in jquery */
zzDOM.SS.prototype._styleProperty = function ( property, value ) {
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

zzDOM.SS.prototype._setCssUsingKeyValue = function ( key, value ) {
    this.el.style[ key ] = value;
};

zzDOM.SS.prototype._setCssUsingObject = function ( object ) {
    for ( var key in object ) {
        this._setCssUsingKeyValue( key, object[ key ] );
    }
};

zzDOM.SS.prototype._insertHelper = function ( position, x ) {
    if ( x instanceof Element ){
        this.el.insertAdjacentElement( position, x );
    } else if ( x instanceof zzDOM.SS ){
        this.el.insertAdjacentElement( position, x.el );
    } else if ( typeof x === 'string' ) {
        this.el.insertAdjacentHTML( position, x );
    } else {
        throw 'Insert operation not ready for that type!';
    }
    return this;
};

zzDOM.SS.prototype._buildError = function ( method ) {
    return 'Method "' + method + '" not ready for that type!';
};

zzDOM.SS.prototype._getElId = function(){
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

zzDOM.SS.prototype._iterate = function( value, fn ){
    if ( Array.isArray( value ) ){
        for ( var i = 0; i < value.length; ++i ){
            fn( this, value[ i ] );
        }
    } else {
        fn( this, value );   
    }
    return this;
};

/* Methods included in jquery */
zzDOM.SS.prototype.each = function ( eachFn ) {
    eachFn( this );
    return this;
};

//TODO test .addClass( array )
zzDOM.SS.prototype.addClass = function ( name ) {
    return this._iterate(
        name,
        function( self, v ){
            self.el.classList.add( v ); 
        }
    );
};

zzDOM.SS.prototype.after = function ( x ) {
    return this._insertHelper( 'afterend', x );
};

zzDOM.SS.prototype.append = function ( x ) {
    if ( x instanceof Element ){
        this.el.appendChild( x );
    } else if ( x instanceof zzDOM.SS ){
        this.el.appendChild( x.el );
    } else if ( typeof x === 'string' ) {
        this.el.insertAdjacentHTML( 'beforeend', x );
    } else {
        throw this._buildError( 'append' );
    }
    return this;
};

zzDOM.SS.prototype.before = function ( x ) {
    return this._insertHelper( 'beforebegin', x );
};

zzDOM.SS.prototype.children = function ( selector ) {
    return zzDOM._build( 
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

zzDOM.SS.prototype.siblings = function ( selector ) {
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
    return zzDOM._build( nodes );
};

zzDOM.SS.prototype.clone = function (  ) {
    return new zzDOM.SS( this.el.cloneNode( true ) );
};

zzDOM.SS.prototype.empty = function (  ) {
    while( this.el.firstChild ){
        this.el.removeChild( this.el.firstChild );
    }
    return this;
};

zzDOM.SS.prototype.filter = function ( x ) {
    if ( typeof x === 'string' ){ // Is a string selector
        return zzDOM._build( 
            this.el.matches( x )? [ this.el ]: []
        );
    }
    
    if ( typeof x === 'function' ){ // Is a function
        return zzDOM._build(
            x( this )? [ this.el ]: []
        );
    }  
    
    throw this._buildError( 'filter' );
};

zzDOM.SS.prototype.find = function ( selector ) {
    return zzDOM._build( 
        this.el.querySelectorAll( selector )
    );
};

//TODO test .attr( object )
/**
 * @param {string|Object} x
 * @param {string=} value
 */
zzDOM.SS.prototype.attr = function ( x, value ) {
    // set using object
    if ( typeof x === 'object' ){
        for ( var key in x ) {
            this.el.setAttribute( key, x[ key ] );
        }
    }
    
    // get
    if ( value === undefined ){
        return this.el.getAttribute( x );
    }
    
    // set
    this.el.setAttribute( x, value );
    return this;
};

zzDOM.SS.prototype.height = function ( value ) {
    return this._styleProperty( 'height', value );
};

zzDOM.SS.prototype.html = function ( value ) {
    // get
    if ( value === undefined ){
        return this.el.innerHTML;
    }

    // set
    this.el.innerHTML = value;
    return this;
};

zzDOM.SS.prototype.css = function () {
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
            this._setCssUsingObject( arg1 );
            return this;
        }
        
        throw 'Wrong type or argument in css method!';
    }
    
    // set using key value pair
    if ( number === 2 ){
        this._setCssUsingKeyValue( arguments[ 0 ], arguments[ 1 ] );
        return this;
    }
    
    throw 'Wrong number of arguments in css method!';
};

zzDOM.SS.prototype.text = function ( value ) {
    // get
    if ( value === undefined ){
        return this.el.textContent;
    }

    // set
    this.el.textContent = value;
    return this;
};

zzDOM.SS.prototype.width = function ( value ) {
    return this._styleProperty( 'width', value );
};

zzDOM.SS.prototype.hasClass = function ( name ) {
    return this.el.classList.contains( name );
};

zzDOM.SS.prototype.index = function () {
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

zzDOM.SS.prototype.is = function ( x ) {
    if ( x == null ){
        return false;    
    }
    
    if ( x instanceof Element ){
        return this.el === x;
    }
    
    if ( x instanceof zzDOM.SS ) {
        return this.el === x.el;
    } 

    if ( x instanceof zzDOM.MM ) {
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

zzDOM.SS.prototype.next = function () {
    return new zzDOM.SS( this.el.nextElementSibling );
};

zzDOM.SS.prototype.offset = function ( c ) {
    
    // set top and left using css
    if ( c ){
        this._styleProperty( 'top', c.top );
        this._styleProperty( 'left', c.left );
        return this;
    }
    
    // get
    var rect = this.el.getBoundingClientRect();
    return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
    };
};

zzDOM.SS.prototype.offsetParent = function () {
    var offsetParent = this.el.offsetParent;
    return offsetParent? new zzDOM.SS( offsetParent ): this;
};

zzDOM.SS.prototype.outerHeight = function ( withMargin ) {
    var height = this.el.offsetHeight;
    
    // No margin
    if ( ! withMargin ){
        return height;
    }
    
    // With margin
    var style = getComputedStyle( this.el );
    return height + parseInt( style.marginTop, 10 ) + parseInt( style.marginBottom, 10 );
};

zzDOM.SS.prototype.outerWidth = function ( withMargin ) {
    var width = this.el.offsetWidth;

    // No margin
    if ( ! withMargin ){
        return width;
    }
    
    // With margin
    var style = getComputedStyle( this.el );
    return width + parseInt( style.marginLeft, 10 ) + parseInt( style.marginRight, 10 );
};

zzDOM.SS.prototype.parent = function () {
    return new zzDOM.SS( this.el.parentNode );
};

zzDOM.SS.prototype.position = function ( relativeToViewport ) {
    return relativeToViewport?
        this.el.getBoundingClientRect():
        { 
            left: this.el.offsetLeft, 
            top: this.el.offsetTop
        };
};

zzDOM.SS.prototype.prepend = function ( x ) {
    if ( x instanceof Element ){
        this.el.insertBefore( x, this.el.firstChild );
    } else if ( x instanceof zzDOM.SS ){
        this.el.insertBefore( x.el, this.el.firstChild );
    } else if ( typeof x === 'string' ){
        this.el.insertAdjacentHTML( 'afterbegin', x );
    } else {
        throw this._buildError( 'prepend' );
    }
    return this;
};

zzDOM.SS.prototype.prev = function () {
    return new zzDOM.SS( this.el.previousElementSibling );
};

zzDOM.SS.prototype.remove = function () {
    this.el.parentNode.removeChild( this.el );
    return this;
};

zzDOM.SS.prototype.removeAttr = function ( name ) {
    this.el.removeAttribute( name );
    return this;
};

//TODO test .removeClass( array )
//TODO test .removeClass()
zzDOM.SS.prototype.removeClass = function ( name ) {
    if ( ! name ){
        this.el.className = '';
        return this;
    }
    
    return this._iterate(
        name,
        function( self, v ){
            self.el.classList.remove( v );
        }
    );
};

zzDOM.SS.prototype.replaceWith = function ( value ) {
    this.el.outerHTML = value;
    return this;
};

//TODO test .toggleClass( array )
//TODO test .toggleClass( name, state not null )
zzDOM.SS.prototype.toggleClass = function ( name, state ) {
    return this._iterate(
        name,
        state === undefined?
            function( self, v ){
                self.el.classList.toggle( v );
            }:
            function( self, v ){
                self.el.classList.toggle( v, state );
            }
    );
};

zzDOM.SS.prototype.hide = function () {
    if ( this.el.style.display ){
        this.attr( 'data-display', this.el.style.display );
    }
    this.el.style.display = 'none';
    return this;
};

zzDOM.SS.prototype.show = function () {
    var display = this.attr( 'data-display' );
    this.el.style.display = display? display: 'block';
    return this;
};

zzDOM.SS.prototype.toggle = function () {
    return this.isVisible()? this.hide(): this.show();
};

zzDOM.SS.prototype.isVisible = function () {
    return !! this.el.offsetParent;
    //return getComputedStyle( this.el, null ).getPropertyValue( 'display' ) !== 'none';
};

zzDOM.SS.prototype.appendTo = function ( x ) {
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
        x = zzDOM._build(
            document.querySelectorAll( x )
        );
    }
    
    // Is it a zzDOM.SS?
    if ( x instanceof zzDOM.SS ) {
        x.el.appendChild( this.el );
        return this;
    }
    
    // Is it a zzDOM.MM?
    if ( x instanceof zzDOM.MM ) {
        for ( var i = 0; i < x.nodes.length; ++i ){
            x.nodes[ i ].appendChild( this.el.cloneNode( true ) );
        }
        return this;
    } 
    
    throw this._buildError( 'is' );
};

zzDOM.SS.prototype.trigger = function ( eventName ) {
    var event = document.createEvent( 'HTMLEvents' );
    event.initEvent( eventName, true, false );
    this.el.dispatchEvent( event );
    return this;
};

//TODO test .on( eventName, listener, data not null )
zzDOM.SS.prototype.on = function ( eventName, listener, data, useCapture ) {
    zzDOM._addEventListener( 
        this, 
        eventName, 
        data? 
            function( e ){
                e.data = data;
                return listener();
            }:
            listener, 
        useCapture 
    );
    return this;
};

zzDOM.SS.prototype.off = function ( eventName, listener, useCapture ) {
    zzDOM._removeEventListener( this, eventName, listener, useCapture );
    return this;
};

/** @constructor */
zzDOM.MM = function ( _nodes ) {    
    
    // Init list and nodes 
    this.list = [];
    this.nodes = _nodes;
    for ( var i = 0; i < this.nodes.length; i++ ) {
        this.list.push( 
            new zzDOM.SS( this.nodes[ i ] )
        );
    }
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
/**
 * @param {Function} ssPrototype
 * @param {Function=} constructor
 */
zzDOM.add = function( ssPrototype, constructor ){
    for ( var id in zzDOM.SS.prototype ){
        var current = zzDOM.SS.prototype[ id ];
        if ( ssPrototype === current ){
            var c = constructor || zzDOM.MM.constructors.default;
            zzDOM.MM.prototype[ id ] = function(){
                return c( this, ssPrototype, arguments );
            };
            return;
        }
    }
    
    throw 'Error registering zzDOM.MM: zzDOM.SS not found.';
};

zzDOM.MM.constructors = {};
zzDOM.MM.constructors.concat = function( mm, fn, args ){
    var newNodes = [];
    for ( var i = 0; i < mm.list.length; i++ ) {
        var ss = mm.list[ i ];
        var x = fn.apply( ss, args );
        newNodes = newNodes.concat( x.nodes );
    }
    return zzDOM._build( newNodes );
};
zzDOM.MM.constructors.booleanOr = function( mm, fn, args ){
    for ( var i = 0; i < mm.list.length; i++ ) {
        var ss = mm.list[ i ];
        var x = fn.apply( ss, args );
        if ( x ){
            return true;
        }
    }
    return false;
};
zzDOM.MM.constructors.default = function( mm, fn, args ){
    for ( var i = 0; i < mm.list.length; i++ ) {
        var ss = mm.list[ i ];
        var r = fn.apply( ss, args );
        if ( i === 0 && ! ( r instanceof zzDOM.SS ) ){
            return r;
        }
    }
    return mm;
};

/* Methods included in jquery */
zzDOM.MM.prototype.each = function ( eachFn ) {
    Array.prototype.forEach.call( this.list, eachFn );
    return this;
};

/* Reimplemented methods for Google closure compiler */
zzDOM.MM.prototype.addClass = function ( name ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.addClass, arguments );
};

zzDOM.MM.prototype.after = function ( x ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.after, arguments );
};

zzDOM.MM.prototype.append = function ( x ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.append, arguments );
};

zzDOM.MM.prototype.before = function ( x ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.before, arguments );
};

zzDOM.MM.prototype.children = function ( selector ) {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.children, arguments );
};

zzDOM.MM.prototype.siblings = function ( selector ) {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.siblings, arguments );
};

zzDOM.MM.prototype.clone = function (  ) {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.clone, arguments );
};

zzDOM.MM.prototype.empty = function (  ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.empty, arguments );
};

zzDOM.MM.prototype.filter = function ( x ) {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.filter, arguments );
};

zzDOM.MM.prototype.find = function ( selector ) {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.find, arguments );
};

/**
 * @param {string} name
 * @param {string=} value
 */
zzDOM.MM.prototype.attr = function ( name, value ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.attr, arguments );
};

zzDOM.MM.prototype.height = function ( value ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.height, arguments );
};

zzDOM.MM.prototype.html = function ( name ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.html, arguments );
};

zzDOM.MM.prototype.css = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.css, arguments );
};

zzDOM.MM.prototype.text = function ( name ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.text, arguments );
};

zzDOM.MM.prototype.width = function ( value ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.width, arguments );
};

zzDOM.MM.prototype.hasClass = function ( name ) {
    return zzDOM.MM.constructors.booleanOr( this, zzDOM.SS.prototype.hasClass, arguments );
};

zzDOM.MM.prototype.index = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.index, arguments );
};

zzDOM.MM.prototype.is = function ( x ) {
    return zzDOM.MM.constructors.booleanOr( this, zzDOM.SS.prototype.is, arguments );
};

zzDOM.MM.prototype.next = function () {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.next, arguments );
};

zzDOM.MM.prototype.offset = function ( c ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.offset, arguments );
};

zzDOM.MM.prototype.offsetParent = function () {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.offsetParent, arguments );
};

zzDOM.MM.prototype.outerHeight = function ( withMargin ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.outerHeight, arguments );
};

zzDOM.MM.prototype.outerWidth = function ( withMargin ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.outerWidth, arguments );
};

zzDOM.MM.prototype.parent = function () {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.parent, arguments );
};

zzDOM.MM.prototype.position = function ( relativeToViewport ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.position, arguments );
};

zzDOM.MM.prototype.prepend = function ( x ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.prepend, arguments );
};

zzDOM.MM.prototype.prev = function () {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.prev, arguments );
};

zzDOM.MM.prototype.remove = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.remove, arguments );
};

zzDOM.MM.prototype.removeAttr = function ( name ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.removeAttr, arguments );
};

zzDOM.MM.prototype.removeClass = function ( name ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.removeClass, arguments );
};

zzDOM.MM.prototype.replaceWith = function ( value ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.replaceWith, arguments );
};

zzDOM.MM.prototype.toggleClass = function ( name, value ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.toggleClass, arguments );
};

zzDOM.MM.prototype.hide = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.hide, arguments );
};

zzDOM.MM.prototype.show = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.show, arguments );
};

zzDOM.MM.prototype.toggle = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.toggle, arguments );
};

zzDOM.MM.prototype.isVisible = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.isVisible, arguments );
};

zzDOM.MM.prototype.appendTo = function ( x ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.appendTo, arguments );
};

zzDOM.MM.prototype.trigger = function ( eventName ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.trigger, arguments );
};

zzDOM.MM.prototype.on = function ( eventName, listener, useCapture ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.on, arguments );
};

zzDOM.MM.prototype.off = function ( eventName, listener, useCapture ) {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.off, arguments );
};

// Register zzDOM if we are using Node
if ( typeof module === 'object' && module.exports ) {
    module.exports = zzDOM;
}
