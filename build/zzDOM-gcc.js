/*! zzdom - v0.5.0 - 2025-05-12 11:38:25 */
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

// Register zz function
var zz;
(function() { 
    zz = zzDOM.zz; 
})();

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

//TODO must remove all listeners when an element is removed
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

//TODO test all the listeners are removed
zzDOM._removeListeners = function( el, thisListeners, listener, useCapture, eventName ){
    if ( ! thisListeners ){
        return;
    }
    for ( var i = 0; i < thisListeners.length; ++i ){
        var currentListener = thisListeners[ i ];
        if ( ! listener || currentListener === listener ){
            thisListeners.splice( i, 1 ); // Delete listener at i position
            el.removeEventListener( eventName, currentListener, useCapture );
            if ( listener ){
                return;
            }
        }
    } 
};
/* End of events */

zzDOM._dd = {};

zzDOM._getDefaultDisplay = function( el ) {
    var nodeName = el.nodeName;
    var display = zzDOM._dd[ nodeName ];

    if ( display ) {
        return display;
    }

    var doc = el.ownerDocument;
    var temp = doc.body.appendChild( doc.createElement( nodeName ) );
    display = getComputedStyle( temp )[ 'display' ];

    temp.parentNode.removeChild( temp );

    if ( display === 'none' ) {
        display = 'block';
    }
    zzDOM._dd[ nodeName ] = display;

    return display;
};
/* End of visible */

/* It depends on forms plugin! */
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

/** @constructor */
zzDOM.SS = function ( _el ) {
    this.list = [ this ];
    this.el = _el;
    this.nodes = [ _el ];
    
    // Array like
    this.length = 1;
    this[ 0 ] = _el;
};

/* Methods NOT included in jquery */
zzDOM.SS.prototype._gcs = function ( self, property ) {
    var x = getComputedStyle( self.el, null )[ property ].replace( 'px', '' );
    return isNaN( x )? x: parseFloat( x );
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

zzDOM.SS.prototype._outer = function ( property, linked1, linked2, withMargin ) {
    if ( this.el[ 'offset' + property ] ) {
        return zzDOM.SS._outerCalc( this, property, linked1, linked2, withMargin );
    }
    
    var self = this;
    return this._swap( 
        this.el, 
        function(){
            return zzDOM.SS._outerCalc( self, property, linked1, linked2, withMargin );
        } 
    );
};

zzDOM.SS._outerCalc = function ( ss, property, linked1, linked2, withMargin ) {
    var value = ss._gcs( ss, property.toLowerCase() );
    var padding = ss._gcs( ss, 'padding' + linked1 ) + ss._gcs( ss, 'padding' + linked2 );
    var border = ss._gcs( ss, 'border' + linked1 + 'Width' ) + ss._gcs( ss, 'border' + linked2 + 'Width' );
    
    var total = value + padding + border;
    
    // No margin
    if ( ! withMargin ){
        return total;
    }
    
    var margin = ss._gcs( ss, 'margin' + linked1 ) + ss._gcs( ss, 'margin' + linked2 );
    return total + margin;
};

zzDOM.SS.prototype._setCssUsingKeyValue = function ( key, value ) {
    if ( typeof value === 'function' ) {
        value = value.call( this.el, this._i === undefined? 0: this._i, this );
    }
    this.el.style[ key ] = 
        typeof value === 'string' && ! /^-?\d+\.?\d*$/.test( value )? // if it is a string and is not a float number
            value: 
            value + 'px';
};

zzDOM.SS.prototype._setCssUsingObject = function ( object ) {
    for ( var key in object ) {
        this._setCssUsingKeyValue( key, object[ key ] );
    }
};

/**
 * @param {string} property
 * @param {string|Function=} value
 */
zzDOM.SS.prototype._styleProperty = function ( property, value ) {
    // get
    if ( value === undefined ){
        var self = this;
        value = this._gcs( this, property );
        return parseFloat( 
            value !== 'auto'? 
                value: 
                this._swap( 
                    this.el, 
                    function(){
                        return self._gcs( self, property );
                    } 
                )
        );
    }

    // set
    this._setCssUsingKeyValue( property, value );
    return this;
};

zzDOM.SS.prototype._swap = function( _el, callback ) {
    var old = {};
    var options = {
        display: 'block',
        position: 'absolute',
        visibility: 'hidden'
    };

    // Remember the old values and insert the new ones
    for ( var name in options ) {
        old[ name ] = _el.style[ name ];
        _el.style[ name ] = options[ name ];
    }

    var val = callback.call( _el );

    // Revert the old values
    for ( name in options ) {
        _el.style[ name ] = old[ name ];
    }

    return val;
};

/* Methods included in jquery */
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
        throw zzDOM._getError( 'append' );
    }
    return this;
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
    
    throw zzDOM._getError( 'is' );
};

//TODO add support of function type in value
/**
 * @param {string|Object} x
 * @param {string=} value
 */
zzDOM.SS.prototype.attr = function ( x, value ) {
    // set using object
    if ( typeof x === 'object' ){
        for ( var key in x ) {
            this.attr( key, x[ key ] );
        }
        return this;
    }
    
    // get
    if ( value === undefined ){
        return this.el.getAttribute( x );
    }
    
    // remove attr
    if ( value === null ){
        return this.removeAttr( x );    
    }
    
    // set
    this.el.setAttribute( x, value );
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

zzDOM.SS.prototype.clone = function (  ) {
    return new zzDOM.SS( this.el.cloneNode( true ) );
};

zzDOM.SS.prototype.closest = function ( selector ) {
    return zzDOM._build(
        this.el.closest( selector )
    );
};

//TODO add support of function type in value
/**
 * @param {string|Object} x1
 * @param {string|number=} x2
 */
zzDOM.SS.prototype.css = function ( x1, x2 ) {
    var number = arguments.length;
    
    if ( number === 1 ){
        if ( ! x1 ){
            throw 'Null value not allowed in css method!';
        }
        
        // get
        if ( typeof x1 === 'string' ) {
            return getComputedStyle( this.el )[ x1 ];
        }
        
        // set using object
        if ( typeof x1 === 'object' ){
            this._setCssUsingObject( x1 );
            return this;
        }
        
        throw 'Wrong type or argument in css method!';
    }
    
    // set using key value pair
    if ( number === 2 ){
        this._setCssUsingKeyValue( x1, x2 );
        return this;
    }
    
    throw 'Wrong number of arguments in css method!';
};

zzDOM.SS.prototype.each = function ( eachFn ) {
    eachFn.call( this.el, 0, this, this.nodes );
    return this;
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
            x.call( this.el, this._i === undefined? 0: this._i, this )? [ this.el ]: []
        );
    }  
    
    throw zzDOM._getError( 'filter' );
};

zzDOM.SS.prototype.find = function ( selector ) {
    return zzDOM._build( 
        this.el.querySelectorAll( selector )
    );
};

zzDOM.SS.prototype.first = function () {
    return this;
};

zzDOM.SS.prototype.get = function ( i ) {
    return zzDOM._get( this.nodes, i );
};

zzDOM.SS.prototype.hasClass = function ( name ) {
    return this.el.classList.contains( name );
};

zzDOM.SS.prototype.height = function ( value ) {
    return this._styleProperty( 'height', value );
};

//TODO add support of function type in value
zzDOM.SS.prototype.html = function ( value ) {
    // get
    if ( value === undefined ){
        return this.el.innerHTML;
    }

    // set
    this.el.innerHTML = value;
    return this;
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

zzDOM.SS.prototype.map = function ( mapFn ) {
    return zzDOM._build(
        mapFn.call( this.el, 0, this.el )
    );
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

/**
 * @param {boolean=} withMargin
 */
zzDOM.SS.prototype.outerHeight = function ( withMargin ) {
    return this._outer( 'Height', 'Top', 'Bottom', withMargin );
};

/**
 * @param {boolean=} withMargin
 */
zzDOM.SS.prototype.outerWidth = function ( withMargin ) {
    return this._outer( 'Width', 'Left', 'Right', withMargin );
};

zzDOM.SS.prototype.parent = function () {
    return new zzDOM.SS( this.el.parentNode );
};

zzDOM.SS.prototype.parents = function ( selector ) {
    var nodes = [];
    var node = this.el;
    while ( ( node = node.parentNode ) && node !== document ) {
        if ( ! selector || node.matches( selector ) ){
            nodes.push( node );
        }
    }
    return zzDOM._build( nodes );
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
        throw zzDOM._getError( 'prepend' );
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

//TODO add support of function type in value
zzDOM.SS.prototype.text = function ( value ) {
    // get
    if ( value === undefined ){
        return this.el.textContent;
    }

    // set
    this.el.textContent = value;
    return this;
};

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

zzDOM.SS.prototype.width = function ( value ) {
    return this._styleProperty( 'width', value );
};


zzDOM.SS.prototype.off = function ( eventName, listener, useCapture ) {
    zzDOM._removeEventListener( this, eventName, listener, useCapture );
    return this;
};

zzDOM.SS.prototype.on = function ( eventName, listener, data, useCapture ) {
    zzDOM._addEventListener( 
        this, 
        eventName, 
        data? 
            function( e ){
                e.data = data;
                return listener.call( e.currentTarget, e );
            }:
            listener, 
        useCapture 
    );
    return this;
};

zzDOM.SS.prototype.trigger = function ( eventName, params ) {
    var event = new Event( eventName, { bubbles: true, cancelable: false } );
    if ( params ){
        event.params = params;
    }
    this.el.dispatchEvent( event );
    return this;
};
/* End of events */

zzDOM.SS.prototype.hide = function () {
    if ( this.isVisible() ){
        this.attr( 
            'data-display', 
            getComputedStyle( this.el, null )[ 'display' ]
        );
        this.el.style.display = 'none';
    }
    return this;
};

zzDOM.SS.prototype.isVisible = function () {
    return !! this.el.offsetParent;
    //return getComputedStyle( this.el, null ).getPropertyValue( 'display' ) !== 'none';
};

zzDOM.SS.prototype.show = function () {
    if ( ! this.isVisible() ){
        var display = this.attr( 'data-display' );
        this.el.style.display = display? display: zzDOM._getDefaultDisplay( this.el );
    }
    return this;
};

zzDOM.SS.prototype.toggle = function ( state ) {
    var value = state !== undefined? ! state: this.isVisible();
    return value? this.hide(): this.show();
};

/** @suppress {missingProperties} */
zzDOM.SS.prototype.fadeIn = function ( params = {} ) {
    var { ms, callback } = params;
    ms = ms || 400;
    var finishFadeIn = () => {
        this.el.removeEventListener( 'transitionend', finishFadeIn );
        callback && callback();
    };
    this.el.style.transition = 'opacity 0s';
    this.el.style.display = '';
    this.el.style.opacity = 0;
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            this.el.addEventListener( 'transitionend', finishFadeIn );
            this.el.style.transition = `opacity ${ms/1000}s`;
            this.el.style.opacity = 1;
        });
    });
    return this;
};

/** @suppress {missingProperties} */
zzDOM.SS.prototype.fadeOut = function ( params = {} ) {
    var { ms, callback } = params;
    ms = ms || 400;
    var finishFadeOut = () => {
        this.el.style.display = 'none';
        this.el.removeEventListener( 'transitionend', finishFadeOut );
        callback && callback();
    };
    this.el.style.transition = 'opacity 0s';
    this.el.style.opacity = 1;
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            this.el.style.transition = `opacity ${ms/1000}s`;
            this.el.addEventListener( 'transitionend', finishFadeOut );
            this.el.style.opacity = 0;
        });
    });
    return this;
};
/* End of visible */

// checked only works on radio, checkbox and option
zzDOM.SS.prototype.checked = function ( value ) {
    return this.prop( 'checked', value );
};

// disabled only works on button, fieldset, optgroup, option, select, textarea and input
zzDOM.SS.prototype.disabled = function ( value ) {
    return this.prop( 'disabled', value );
};

// indeterminate only works on checkbox, radio and progress
zzDOM.SS.prototype.indeterminate = function ( value ) {
    return this.prop( 'indeterminate', value );
};

//TODO add support of object and function types in value
zzDOM.SS.prototype.prop = function ( key, value ) {
    
    // get
    if ( value === undefined ){
        return !! this.el[ key ];
    }
    
    // set
    this.el[ key ] = value;
    return this;
};

/**
 * @param {Array<?>|String=} value
 */
zzDOM.SS.prototype.val = function ( value ) {
    // get
    if ( value === undefined ){
        switch ( this.el.nodeName ) {
        case 'INPUT':
        case 'TEXTAREA':
        case 'BUTTON':
        case 'OPTION':
        case 'CHECKBOX':
            return this.el.value;
        case 'SELECT':
            var values = [];
            for ( var i = 0; i < this.el.length; ++i ) {
                if ( this.el[ i ].selected ) {
                    values.push( this.el[ i ].value );
                }
            }
            return values.length > 1? values: values[ 0 ];
        default:
            throw zzDOM._getError( 'val' );
        }
    }
    
    // set
    switch ( this.el.nodeName ) {
    case 'INPUT':
    case 'TEXTAREA':
    case 'BUTTON':
    case 'OPTION':
    case 'CHECKBOX':
        this.el.value = value;
        break;
    case 'SELECT':
        if ( typeof value === 'string' || typeof value === 'number' || value == null ) {
            value = [ value ];
        }
        for ( i = 0; i < this.el.length; ++i ) {
            for ( var j = 0; j < value.length; ++j ) {
                this.el[ i ].selected = '';
                if ( this.el[ i ].value == value[ j ] ) {
                    this.el[ i ].selected = 'selected';
                    break;
                }
            }
        }
        break;
    default:
        throw zzDOM._getError( 'val' );
    }
    
    return this;
};
/* End of forms */

zzDOM.SS.prototype.getXCenter = function() {
    return ( document.documentElement.clientWidth - this.outerWidth() ) / 2;
};

zzDOM.SS.prototype.getYCenter = function() {
    return ( document.documentElement.clientHeight - this.outerHeight() ) / 2;
};

zzDOM.SS.prototype.getCenter = function() {
    return {
        left: this.getXCenter(),
        top: this.getYCenter()
    };
};

zzDOM.SS.prototype.center = function() {
    this.offset( 
        this.getCenter() 
    );
    return this;
};

zzDOM.SS.prototype.centerX = function() {
    this.css( 'left', this.getXCenter() );
    return this;
};

zzDOM.SS.prototype.centerY = function() {
    this.css( 'top', this.getYCenter() );
    return this;
};
/* End of center */

/** @constructor */
zzDOM.MM = function ( _nodes ) {    
    this.list = [];
    this.nodes = _nodes.filter( n => n ); // Remove null elements
    this.length = this.nodes.length;
    
    // Init  nodes 
    for ( var i = 0; i < this.length; i++ ) {
        var el = this.nodes[ i ];
        this[ i ] = el; // for array like
        var ss = new zzDOM.SS( el );
        this.list.push( ss );
        ss._i = i; // for index in functions
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
        newNodes = [...new Set([...newNodes, ...x.nodes])]; // Concat not adding duplicates
        //newNodes = newNodes.concat( x.nodes );
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
zzDOM.MM.constructors.first = function( mm, fn, args ){
    for ( var i = 0; i < mm.list.length; i++ ) {
        var ss = mm.list[ i ];
        var r = fn.apply( ss, args );
        if ( r instanceof zzDOM.SS ){
            return r;
        }
    }
    return mm;
};
zzDOM.MM.constructors.callback = function( mm, fn, args = {} ){
    if ( ! args[ 0 ] ){
        args[ 0 ] = {};
    }
    var callback = args[ 0 ].callback;
    for ( var i = 0; i < mm.list.length; i++ ) {
        var ss = mm.list[ i ];
        args[ 0 ].callback = i !== mm.list.length - 1? undefined: callback;
        fn.apply( ss, args );
    }
    return mm;
};
zzDOM.MM.constructors.appendText = function( mm, fn, args ){
    var text = '';
    var textMode = false;
    for ( var i = 0; i < mm.length; i++ ) {
        var ss = mm.list[ i ];
        var x = fn.apply( ss, args );
        if ( typeof x === 'string' ){
            text += ( text == ''? '': ' ' ) + x;
            textMode = true;
        }
    }
    return ! mm.list.length && ! args.length?
        null:
        textMode? text: mm;
};
zzDOM.MM.constructors.val = function( mm, fn, args, len ){
    for ( var i = 0; i < mm.list.length; i++ ) {
        var ss = mm.list[ i ];
        var r = fn.apply( ss, args );
        if ( i === 0 && ! ( r instanceof zzDOM.SS ) ){
            return r;
        }
    }
    return ! mm.list.length && args.length === len? null: mm;
};
zzDOM.MM.constructors.val0 = function( mm, fn, args ){
    return zzDOM.MM.constructors.val( mm, fn, args, 0 );
};
zzDOM.MM.constructors.val1 = function( mm, fn, args ){
    return zzDOM.MM.constructors.val( mm, fn, args, 1 );
};
zzDOM.MM.constructors.getVal = function( mm, fn, args ){
    for ( var i = 0; i < mm.list.length; i++ ) {
        var ss = mm.list[ i ];
        var r = fn.apply( ss, args );
        if ( i === 0 && ! ( r instanceof zzDOM.SS ) ){
            return r;
        }
    }
    return ! mm.list.length? null: mm;
};
/* Reimplemented methods for Google closure compiler */
zzDOM.MM.prototype.addClass = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.addClass, arguments );
};

zzDOM.MM.prototype.after = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.after, arguments );
};

zzDOM.MM.prototype.append = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.append, arguments );
};

zzDOM.MM.prototype.appendTo = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.appendTo, arguments );
};

zzDOM.MM.prototype.attr = function () {
    return zzDOM.MM.constructors.val1( this, zzDOM.SS.prototype.attr, arguments );
};

zzDOM.MM.prototype.before = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.before, arguments );
};

zzDOM.MM.prototype.children = function () {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.children, arguments );
};

zzDOM.MM.prototype.clone = function () {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.clone, arguments );
};

zzDOM.MM.prototype.closest = function () {
    return zzDOM.MM.constructors.first( this, zzDOM.SS.prototype.closest, arguments );
};

zzDOM.MM.prototype.css = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.css, arguments );
};

zzDOM.MM.prototype.empty = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.empty, arguments );
};

zzDOM.MM.prototype.filter = function () {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.filter, arguments );
};

zzDOM.MM.prototype.find = function () {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.find, arguments );
};

zzDOM.MM.prototype.hasClass = function () {
    return zzDOM.MM.constructors.booleanOr( this, zzDOM.SS.prototype.hasClass, arguments );
};

zzDOM.MM.prototype.height = function () {
    return zzDOM.MM.constructors.val0( this, zzDOM.SS.prototype.height, arguments );
};

zzDOM.MM.prototype.html = function () {
    return zzDOM.MM.constructors.val0( this, zzDOM.SS.prototype.html, arguments );
};

zzDOM.MM.prototype.index = function () {
    return zzDOM.MM.constructors.getVal( this, zzDOM.SS.prototype.index, arguments );
};

zzDOM.MM.prototype.is = function () {
    return zzDOM.MM.constructors.booleanOr( this, zzDOM.SS.prototype.is, arguments );
};

zzDOM.MM.prototype.next = function () {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.next, arguments );
};

zzDOM.MM.prototype.offset = function () {
    return zzDOM.MM.constructors.val0( this, zzDOM.SS.prototype.offset, arguments );
};

zzDOM.MM.prototype.offsetParent = function () {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.offsetParent, arguments );
};

zzDOM.MM.prototype.outerHeight = function () {
    return zzDOM.MM.constructors.getVal( this, zzDOM.SS.prototype.outerHeight, arguments );
};

zzDOM.MM.prototype.outerWidth = function () {
    return zzDOM.MM.constructors.getVal( this, zzDOM.SS.prototype.outerWidth, arguments );
};

zzDOM.MM.prototype.parent = function () {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.parent, arguments );
};

zzDOM.MM.prototype.parents = function () {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.parents, arguments );
};

zzDOM.MM.prototype.position = function () {
    return zzDOM.MM.constructors.getVal( this, zzDOM.SS.prototype.position, arguments );
};

zzDOM.MM.prototype.prepend = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.prepend, arguments );
};

zzDOM.MM.prototype.prev = function () {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.prev, arguments );
};

zzDOM.MM.prototype.remove = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.remove, arguments );
};

zzDOM.MM.prototype.removeAttr = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.removeAttr, arguments );
};

zzDOM.MM.prototype.removeClass = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.removeClass, arguments );
};

zzDOM.MM.prototype.replaceWith = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.replaceWith, arguments );
};

zzDOM.MM.prototype.siblings = function () {
    return zzDOM.MM.constructors.concat( this, zzDOM.SS.prototype.siblings, arguments );
};

zzDOM.MM.prototype.text = function () {
    return zzDOM.MM.constructors.appendText( this, zzDOM.SS.prototype.text, arguments );
};

zzDOM.MM.prototype.toggleClass = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.toggleClass, arguments );
};

zzDOM.MM.prototype.width = function () {
    return zzDOM.MM.constructors.val0( this, zzDOM.SS.prototype.width, arguments );
};

/* Show/hide */
/*
zzDOM.MM.prototype.fadeIn = function () {
    return zzDOM.MM.constructors.callback( this, zzDOM.SS.prototype.fadeIn, arguments );
};

zzDOM.MM.prototype.fadeOut = function () {
    return zzDOM.MM.constructors.callback( this, zzDOM.SS.prototype.fadeOut, arguments );
};

zzDOM.MM.prototype.hide = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.hide, arguments );
};

zzDOM.MM.prototype.isVisible = function () {
    return zzDOM.MM.constructors.getVal( this, zzDOM.SS.prototype.isVisible, arguments );
};

zzDOM.MM.prototype.show = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.show, arguments );
};

zzDOM.MM.prototype.toggle = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.toggle, arguments );
};
*/
/* End of show/hide */

/* Events */
/*
zzDOM.MM.prototype.off = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.off, arguments );
};

zzDOM.MM.prototype.on = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.on, arguments );
};

zzDOM.MM.prototype.trigger = function () {
    return zzDOM.MM.constructors.default( this, zzDOM.SS.prototype.trigger, arguments );
};
*/
/* End of events */

/* Forms */
/*
zzDOM.MM.prototype.checked = function () {
    return zzDOM.MM.constructors.val0( this, zzDOM.SS.prototype.checked, arguments );
};

zzDOM.MM.prototype.disabled = function () {
    return zzDOM.MM.constructors.val0( this, zzDOM.SS.prototype.disabled, arguments );
};

zzDOM.MM.prototype.indeterminate = function () {
    return zzDOM.MM.constructors.val0( this, zzDOM.SS.prototype.indeterminate, arguments );
};

zzDOM.MM.prototype.prop = function () {
    return zzDOM.MM.constructors.val1( this, zzDOM.SS.prototype.prop, arguments );
};

zzDOM.MM.prototype.val = function () {
    return zzDOM.MM.constructors.val0( this, zzDOM.SS.prototype.val, arguments );
};
*/
/* End of forms */

/* Methods implemented not using constructors in zzDOM.MM.constructors */
zzDOM.MM.prototype.each = function ( eachFn ) {
    var self = this;
    Array.prototype.forEach.call(
        this.list,
        function( currentValue, index ){
            eachFn.call( currentValue.el, index, currentValue, self.nodes );
        }
    );
    return this;
};

zzDOM.MM.prototype.first = function () {
    return this.length == 0? this: this.list[ 0 ];
};

zzDOM.MM.prototype.get = function ( i ) {
    return zzDOM._get( this.nodes, i );
};

zzDOM.MM.prototype.map = function ( mapFn ) {
    var newNodes = this.nodes.map( ( node, i ) => {
        return mapFn.call( node, i, node );
    });
    return zzDOM._build( newNodes );
};

zzDOM.add( zzDOM.SS.prototype.getXCenter );
zzDOM.add( zzDOM.SS.prototype.getYCenter );
zzDOM.add( zzDOM.SS.prototype.getCenter );
zzDOM.add( zzDOM.SS.prototype.center );
zzDOM.add( zzDOM.SS.prototype.centerX );
zzDOM.add( zzDOM.SS.prototype.centerY );

zzDOM.add( zzDOM.SS.prototype.off );
zzDOM.add( zzDOM.SS.prototype.on );
zzDOM.add( zzDOM.SS.prototype.trigger );

zzDOM.add( zzDOM.SS.prototype.checked, zzDOM.MM.constructors.val0 );
zzDOM.add( zzDOM.SS.prototype.disabled, zzDOM.MM.constructors.val0 );
zzDOM.add( zzDOM.SS.prototype.indeterminate, zzDOM.MM.constructors.val0 );
zzDOM.add( zzDOM.SS.prototype.prop, zzDOM.MM.constructors.val1 );
zzDOM.add( zzDOM.SS.prototype.val, zzDOM.MM.constructors.val0 );
zzDOM.add( zzDOM.SS.prototype.fadeIn, zzDOM.MM.constructors.callback );
zzDOM.add( zzDOM.SS.prototype.fadeOut, zzDOM.MM.constructors.callback );
zzDOM.add( zzDOM.SS.prototype.hide );
zzDOM.add( zzDOM.SS.prototype.isVisible, zzDOM.MM.constructors.getVal );
zzDOM.add( zzDOM.SS.prototype.show );
zzDOM.add( zzDOM.SS.prototype.toggle );

// Register zzDOM if we are using Node
if ( typeof module === 'object' && module.exports ) {
    module.exports = zzDOM;
}
