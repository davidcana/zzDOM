/*
 * zzDOM.SS class
 */
/** @constructor */
zzDOM.SS = function ( _el ) {
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

/* Show/hide */
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

//TODO create visible plugin
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
/* End of show/hide */

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

zzDOM.SS.prototype.trigger = function ( eventName ) {
    var event = document.createEvent( 'HTMLEvents' );
    event.initEvent( eventName, true, false );
    this.el.dispatchEvent( event );
    return this;
};
/* End of events */

//TODO create forms plugin
/* Forms */
zzDOM.SS.prototype.checked = function ( check ) {
    if ( this.el.nodeName !== 'INPUT' || ( this.el.type !== 'checkbox' && this.el.type !== 'radio') ) {
        throw zzDOM._getError( 'checked' );
    }
    
    // get
    if ( check === undefined ){
        return !! this.el.checked;
    }
    
    // set
    this.el.checked = check;
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
        this.el.value = value;
        break;
    case 'SELECT':
        if ( typeof value === 'string' || typeof value === 'number' ) {
            value = [ value ];
        }
        for ( i = 0; i < this.el.length; ++i ) {
            for ( var j = 0; j < value.length; ++j ) {
                this.el[ i ].selected = '';
                if ( this.el[ i ].value === value[ j ] ) {
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

//TODO create center plugin
/* Center */
zzDOM.SS.prototype.getXCenteredPosition = function() {
    return ( document.documentElement.clientWidth - this.outerWidth() ) / 2;
};

zzDOM.SS.prototype.getYCenteredPosition = function() {
    return ( document.documentElement.clientHeight - this.outerHeight() ) / 2;
};

zzDOM.SS.prototype.getCenteredPosition = function() {
    return {
        top: this.getXCenteredPosition(),
        left: this.getYCenteredPosition()
    };
};

zzDOM.SS.prototype.center = function() {
    this.css( 'left', this.getXCenteredPosition() );
    this.css( 'top', this.getYCenteredPosition() );
    return this;
};

zzDOM.SS.prototype.centerX = function() {
    this.css( 'left', this.getXCenteredPosition() );
    return this;
};

zzDOM.SS.prototype.centerY = function() {
    this.css( 'top', this.getYCenteredPosition() );
    return this;
};
/* End of center */
