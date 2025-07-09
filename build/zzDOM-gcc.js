/*! zzdom - v0.5.1 - 2025-07-09 11:19:46 */
/** @constructor */
export const SS = function ( _el ) {
    this.list = [ this ];
    this.el = _el;
    this.nodes = [ _el ];
    
    // Array like
    this.length = 1;
    this[ 0 ] = _el;
};

/* Methods NOT included in jquery */
SS.prototype._gcs = function ( self, property ) {
    var x = getComputedStyle( self.el, null )[ property ].replace( 'px', '' );
    return isNaN( x )? x: parseFloat( x );
};

SS.prototype._getElId = function(){
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

SS.prototype._insertHelper = function ( position, x ) {
    if ( x instanceof Element ){
        this.el.insertAdjacentElement( position, x );
    } else if ( x instanceof SS ){
        this.el.insertAdjacentElement( position, x.el );
    } else if ( typeof x === 'string' ) {
        this.el.insertAdjacentHTML( position, x );
    } else {
        throw 'Insert operation not ready for that type!';
    }
    return this;
};

SS.prototype._iterate = function( value, fn ){
    if ( Array.isArray( value ) ){
        for ( var i = 0; i < value.length; ++i ){
            fn( this, value[ i ] );
        }
    } else {
        fn( this, value );   
    }
    return this;
};

SS.prototype._outer = function ( property, linked1, linked2, withMargin ) {
    if ( this.el[ 'offset' + property ] ) {
        return SS._outerCalc( this, property, linked1, linked2, withMargin );
    }
    
    var self = this;
    return this._swap( 
        this.el, 
        function(){
            return SS._outerCalc( self, property, linked1, linked2, withMargin );
        } 
    );
};

SS._outerCalc = function ( ss, property, linked1, linked2, withMargin ) {
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

SS.prototype._setCssUsingKeyValue = function ( key, value ) {
    if ( typeof value === 'function' ) {
        value = value.call( this.el, this._i === undefined? 0: this._i, this );
    }
    this.el.style[ key ] = 
        typeof value === 'string' && ! /^-?\d+\.?\d*$/.test( value )? // if it is a string and is not a float number
            value: 
            value + 'px';
};

SS.prototype._setCssUsingObject = function ( object ) {
    for ( var key in object ) {
        this._setCssUsingKeyValue( key, object[ key ] );
    }
};

/**
 * @param {string} property
 * @param {string|Function=} value
 */
SS.prototype._styleProperty = function ( property, value ) {
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

SS.prototype._swap = function( _el, callback ) {
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
SS.prototype.addClass = function ( name ) {
    return this._iterate(
        name,
        function( self, v ){
            self.el.classList.add( v ); 
        }
    );
};

SS.prototype.after = function ( x ) {
    return this._insertHelper( 'afterend', x );
};

SS.prototype.append = function ( x ) {
    if ( x instanceof Element ){
        this.el.appendChild( x );
    } else if ( x instanceof SS ){
        this.el.appendChild( x.el );
    } else if ( typeof x === 'string' ) {
        this.el.insertAdjacentHTML( 'beforeend', x );
    } else {
        throw zzDOM._getError( 'append' );
    }
    return this;
};

SS.prototype.appendTo = function ( x ) {
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
    
    // Is it a SS?
    if ( x instanceof SS ) {
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
SS.prototype.attr = function ( x, value ) {
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

SS.prototype.before = function ( x ) {
    return this._insertHelper( 'beforebegin', x );
};

SS.prototype.children = function ( selector ) {
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

SS.prototype.clone = function (  ) {
    return new SS( this.el.cloneNode( true ) );
};

SS.prototype.closest = function ( selector ) {
    return zzDOM._build(
        this.el.closest( selector )
    );
};

//TODO add support of function type in value
/**
 * @param {string|Object} x1
 * @param {string|number=} x2
 */
SS.prototype.css = function ( x1, x2 ) {
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

SS.prototype.each = function ( eachFn ) {
    eachFn.call( this.el, 0, this, this.nodes );
    return this;
};

SS.prototype.empty = function (  ) {
    while( this.el.firstChild ){
        this.el.removeChild( this.el.firstChild );
    }
    return this;
};

SS.prototype.filter = function ( x ) {
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

SS.prototype.find = function ( selector ) {
    return zzDOM._build( 
        this.el.querySelectorAll( selector )
    );
};

SS.prototype.first = function () {
    return this;
};

SS.prototype.get = function ( i ) {
    return zzDOM._get( this.nodes, i );
};

SS.prototype.hasClass = function ( name ) {
    return this.el.classList.contains( name );
};

SS.prototype.height = function ( value ) {
    return this._styleProperty( 'height', value );
};

//TODO add support of function type in value
SS.prototype.html = function ( value ) {
    // get
    if ( value === undefined ){
        return this.el.innerHTML;
    }

    // set
    this.el.innerHTML = value;
    return this;
};

SS.prototype.index = function () {
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

SS.prototype.is = function ( x ) {
    if ( x == null ){
        return false;    
    }
    
    if ( x instanceof Element ){
        return this.el === x;
    }
    
    if ( x instanceof SS ) {
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

SS.prototype.map = function ( mapFn ) {
    return zzDOM._build(
        mapFn.call( this.el, 0, this.el )
    );
};

SS.prototype.next = function () {
    return new SS( this.el.nextElementSibling );
};

SS.prototype.offset = function ( c ) {
    
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

SS.prototype.offsetParent = function () {
    var offsetParent = this.el.offsetParent;
    return offsetParent? new SS( offsetParent ): this;
};

/**
 * @param {boolean=} withMargin
 */
SS.prototype.outerHeight = function ( withMargin ) {
    return this._outer( 'Height', 'Top', 'Bottom', withMargin );
};

/**
 * @param {boolean=} withMargin
 */
SS.prototype.outerWidth = function ( withMargin ) {
    return this._outer( 'Width', 'Left', 'Right', withMargin );
};

SS.prototype.parent = function () {
    return new SS( this.el.parentNode );
};

SS.prototype.parents = function ( selector ) {
    var nodes = [];
    var node = this.el;
    while ( ( node = node.parentNode ) && node !== document ) {
        if ( ! selector || node.matches( selector ) ){
            nodes.push( node );
        }
    }
    return zzDOM._build( nodes );
};

SS.prototype.position = function ( relativeToViewport ) {
    return relativeToViewport?
        this.el.getBoundingClientRect():
        { 
            left: this.el.offsetLeft, 
            top: this.el.offsetTop
        };
};

SS.prototype.prepend = function ( x ) {
    if ( x instanceof Element ){
        this.el.insertBefore( x, this.el.firstChild );
    } else if ( x instanceof SS ){
        this.el.insertBefore( x.el, this.el.firstChild );
    } else if ( typeof x === 'string' ){
        this.el.insertAdjacentHTML( 'afterbegin', x );
    } else {
        throw zzDOM._getError( 'prepend' );
    }
    return this;
};

SS.prototype.prev = function () {
    return new SS( this.el.previousElementSibling );
};

SS.prototype.remove = function () {
    this.el.parentNode.removeChild( this.el );
    return this;
};

SS.prototype.removeAttr = function ( name ) {
    this.el.removeAttribute( name );
    return this;
};

SS.prototype.removeClass = function ( name ) {
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

SS.prototype.replaceWith = function ( value ) {
    this.el.outerHTML = value;
    return this;
};

SS.prototype.siblings = function ( selector ) {
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
SS.prototype.text = function ( value ) {
    // get
    if ( value === undefined ){
        return this.el.textContent;
    }

    // set
    this.el.textContent = value;
    return this;
};

SS.prototype.toggleClass = function ( name, state ) {
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

SS.prototype.width = function ( value ) {
    return this._styleProperty( 'width', value );
};


// Import modules
import { SS } from './ss.js';

/** @constructor */
export const MM = function ( _nodes ) {
    this.list = [];
    this.nodes = _nodes.filter( n => n ); // Remove null elements
    this.length = this.nodes.length;
    
    // Init  nodes 
    for ( var i = 0; i < this.length; i++ ) {
        var el = this.nodes[ i ];
        this[ i ] = el; // for array like
        var ss = new SS( el );
        this.list.push( ss );
        ss._i = i; // for index in functions
    }
};

MM._registerAdd = function( zzDOM ){

    /*
    Unify the definition of a function of SS.prototype and a definition of MM.prototype. Example:

        zzDOM.add( 
            SS.prototype.myCustomFunction = function(){
                ...
                return this;
            },
            MM.constructors.concat
        );
    );
    */
    /**
     * @param {Function} ssPrototype
     * @param {Function=} constructor
     */
    zzDOM.add = function( ssPrototype, constructor ){
        for ( var id in SS.prototype ){
            var current = SS.prototype[ id ];
            if ( ssPrototype === current ){
                var c = constructor || MM.constructors.default;
                MM.prototype[ id ] = function(){
                    return c( this, ssPrototype, arguments );
                };
                return;
            }
        }
        
        throw 'Error registering MM: SS not found.';
    };

};

MM.constructors = {};
MM.constructors.concat = function( mm, fn, args ){
    var newNodes = [];
    for ( var i = 0; i < mm.list.length; i++ ) {
        var ss = mm.list[ i ];
        var x = fn.apply( ss, args );
        newNodes = [...new Set([...newNodes, ...x.nodes])]; // Concat not adding duplicates
        //newNodes = newNodes.concat( x.nodes );
    }
    return zzDOM._build( newNodes );
};
MM.constructors.booleanOr = function( mm, fn, args ){
    for ( var i = 0; i < mm.list.length; i++ ) {
        var ss = mm.list[ i ];
        var x = fn.apply( ss, args );
        if ( x ){
            return true;
        }
    }
    return false;
};
MM.constructors.default = function( mm, fn, args ){
    for ( var i = 0; i < mm.list.length; i++ ) {
        var ss = mm.list[ i ];
        var r = fn.apply( ss, args );
        if ( i === 0 && ! ( r instanceof SS ) ){
            return r;
        }
    }
    return mm;
};
MM.constructors.first = function( mm, fn, args ){
    for ( var i = 0; i < mm.list.length; i++ ) {
        var ss = mm.list[ i ];
        var r = fn.apply( ss, args );
        if ( r instanceof SS ){
            return r;
        }
    }
    return mm;
};
MM.constructors.callback = function( mm, fn, args = {} ){
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
MM.constructors.appendText = function( mm, fn, args ){
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
MM.constructors.val = function( mm, fn, args, len ){
    for ( var i = 0; i < mm.list.length; i++ ) {
        var ss = mm.list[ i ];
        var r = fn.apply( ss, args );
        if ( i === 0 && ! ( r instanceof SS ) ){
            return r;
        }
    }
    return ! mm.list.length && args.length === len? null: mm;
};
MM.constructors.val0 = function( mm, fn, args ){
    return MM.constructors.val( mm, fn, args, 0 );
};
MM.constructors.val1 = function( mm, fn, args ){
    return MM.constructors.val( mm, fn, args, 1 );
};
MM.constructors.getVal = function( mm, fn, args ){
    for ( var i = 0; i < mm.list.length; i++ ) {
        var ss = mm.list[ i ];
        var r = fn.apply( ss, args );
        if ( i === 0 && ! ( r instanceof SS ) ){
            return r;
        }
    }
    return ! mm.list.length? null: mm;
};
/* Reimplemented methods for Google closure compiler */
MM.prototype.addClass = function () {
    return MM.constructors.default( this, SS.prototype.addClass, arguments );
};

MM.prototype.after = function () {
    return MM.constructors.default( this, SS.prototype.after, arguments );
};

MM.prototype.append = function () {
    return MM.constructors.default( this, SS.prototype.append, arguments );
};

MM.prototype.appendTo = function () {
    return MM.constructors.default( this, SS.prototype.appendTo, arguments );
};

MM.prototype.attr = function () {
    return MM.constructors.val1( this, SS.prototype.attr, arguments );
};

MM.prototype.before = function () {
    return MM.constructors.default( this, SS.prototype.before, arguments );
};

MM.prototype.children = function () {
    return MM.constructors.concat( this, SS.prototype.children, arguments );
};

MM.prototype.clone = function () {
    return MM.constructors.concat( this, SS.prototype.clone, arguments );
};

MM.prototype.closest = function () {
    return MM.constructors.first( this, SS.prototype.closest, arguments );
};

MM.prototype.css = function () {
    return MM.constructors.default( this, SS.prototype.css, arguments );
};

MM.prototype.empty = function () {
    return MM.constructors.default( this, SS.prototype.empty, arguments );
};

MM.prototype.filter = function () {
    return MM.constructors.concat( this, SS.prototype.filter, arguments );
};

MM.prototype.find = function () {
    return MM.constructors.concat( this, SS.prototype.find, arguments );
};

MM.prototype.hasClass = function () {
    return MM.constructors.booleanOr( this, SS.prototype.hasClass, arguments );
};

MM.prototype.height = function () {
    return MM.constructors.val0( this, SS.prototype.height, arguments );
};

MM.prototype.html = function () {
    return MM.constructors.val0( this, SS.prototype.html, arguments );
};

MM.prototype.index = function () {
    return MM.constructors.getVal( this, SS.prototype.index, arguments );
};

MM.prototype.is = function () {
    return MM.constructors.booleanOr( this, SS.prototype.is, arguments );
};

MM.prototype.next = function () {
    return MM.constructors.concat( this, SS.prototype.next, arguments );
};

MM.prototype.offset = function () {
    return MM.constructors.val0( this, SS.prototype.offset, arguments );
};

MM.prototype.offsetParent = function () {
    return MM.constructors.concat( this, SS.prototype.offsetParent, arguments );
};

MM.prototype.outerHeight = function () {
    return MM.constructors.getVal( this, SS.prototype.outerHeight, arguments );
};

MM.prototype.outerWidth = function () {
    return MM.constructors.getVal( this, SS.prototype.outerWidth, arguments );
};

MM.prototype.parent = function () {
    return MM.constructors.concat( this, SS.prototype.parent, arguments );
};

MM.prototype.parents = function () {
    return MM.constructors.concat( this, SS.prototype.parents, arguments );
};

MM.prototype.position = function () {
    return MM.constructors.getVal( this, SS.prototype.position, arguments );
};

MM.prototype.prepend = function () {
    return MM.constructors.default( this, SS.prototype.prepend, arguments );
};

MM.prototype.prev = function () {
    return MM.constructors.concat( this, SS.prototype.prev, arguments );
};

MM.prototype.remove = function () {
    return MM.constructors.default( this, SS.prototype.remove, arguments );
};

MM.prototype.removeAttr = function () {
    return MM.constructors.default( this, SS.prototype.removeAttr, arguments );
};

MM.prototype.removeClass = function () {
    return MM.constructors.default( this, SS.prototype.removeClass, arguments );
};

MM.prototype.replaceWith = function () {
    return MM.constructors.default( this, SS.prototype.replaceWith, arguments );
};

MM.prototype.siblings = function () {
    return MM.constructors.concat( this, SS.prototype.siblings, arguments );
};

MM.prototype.text = function () {
    return MM.constructors.appendText( this, SS.prototype.text, arguments );
};

MM.prototype.toggleClass = function () {
    return MM.constructors.default( this, SS.prototype.toggleClass, arguments );
};

MM.prototype.width = function () {
    return MM.constructors.val0( this, SS.prototype.width, arguments );
};

/* Methods implemented not using constructors in MM.constructors */
MM.prototype.each = function ( eachFn ) {
    var self = this;
    Array.prototype.forEach.call(
        this.list,
        function( currentValue, index ){
            eachFn.call( currentValue.el, index, currentValue, self.nodes );
        }
    );
    return this;
};

MM.prototype.first = function () {
    return this.length == 0? this: this.list[ 0 ];
};

MM.prototype.get = function ( i ) {
    return zzDOM._get( this.nodes, i );
};

MM.prototype.map = function ( mapFn ) {
    var newNodes = this.nodes.map( ( node, i ) => {
        return mapFn.call( node, i, node );
    });
    return zzDOM._build( newNodes );
};

export const plugin = {};

plugin.register = function( zzDOM ){
    this._registerSS( zzDOM );
    this._registerMM( zzDOM );
};

plugin._registerSS = function( zzDOM ){
    /* Center */
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
};

plugin._registerMM = function( zzDOM ){
    zzDOM.add( zzDOM.SS.prototype.getXCenter );
    zzDOM.add( zzDOM.SS.prototype.getYCenter );
    zzDOM.add( zzDOM.SS.prototype.getCenter );
    zzDOM.add( zzDOM.SS.prototype.center );
    zzDOM.add( zzDOM.SS.prototype.centerX );
    zzDOM.add( zzDOM.SS.prototype.centerY );
};

export const plugin = {};

plugin.register = function( zzDOM ){
    this._registerUtils( zzDOM );
    this._registerSS( zzDOM );
    this._registerMM( zzDOM );
};

plugin._registerUtils = function( zzDOM ){
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
};

plugin._registerSS = function( zzDOM ){
    /* Events */
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
};

plugin._registerMM = function( zzDOM ){
    zzDOM.add( zzDOM.SS.prototype.off );
    zzDOM.add( zzDOM.SS.prototype.on );
    zzDOM.add( zzDOM.SS.prototype.trigger );
};


export const plugin = {};

plugin.register = function( zzDOM ){
    this._registerSS( zzDOM );
    this._registerMM( zzDOM );
};

plugin._registerSS = function( zzDOM ){
    /* Forms */

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
};

plugin._registerMM = function( zzDOM ){
    zzDOM.add( zzDOM.SS.prototype.checked, zzDOM.MM.constructors.val0 );
    zzDOM.add( zzDOM.SS.prototype.disabled, zzDOM.MM.constructors.val0 );
    zzDOM.add( zzDOM.SS.prototype.indeterminate, zzDOM.MM.constructors.val0 );
    zzDOM.add( zzDOM.SS.prototype.prop, zzDOM.MM.constructors.val1 );
    zzDOM.add( zzDOM.SS.prototype.val, zzDOM.MM.constructors.val0 );
};


export const plugin = {};

plugin.register = function( zzDOM ){
    this._registerUtils( zzDOM );
    this._registerSS( zzDOM );
    this._registerMM( zzDOM );
};

plugin._registerUtils = function( zzDOM ){
    /* Visible */
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
};

plugin._registerSS = function( zzDOM ){
    /* Visible */
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
};

plugin._registerMM = function( zzDOM ){
    zzDOM.add( zzDOM.SS.prototype.fadeIn, zzDOM.MM.constructors.callback );
    zzDOM.add( zzDOM.SS.prototype.fadeOut, zzDOM.MM.constructors.callback );
    zzDOM.add( zzDOM.SS.prototype.hide );
    zzDOM.add( zzDOM.SS.prototype.isVisible, zzDOM.MM.constructors.getVal );
    zzDOM.add( zzDOM.SS.prototype.show );
    zzDOM.add( zzDOM.SS.prototype.toggle );
};


