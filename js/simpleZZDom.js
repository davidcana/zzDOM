/*
    SimpleZZDom class
*/
var SimpleZZDom = function ( _el ) {    
    this.el = _el;
    this.nodes = [ _el ];
};

/* Methods NOT included in jquery */
SimpleZZDom.prototype._styleProperty = function ( property, value ) {
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

/* TODO: replace key using regular expression */
SimpleZZDom.prototype._setCssUsingKeyValue = function ( key, value ) {
    this.el.style[ key ] = value;
};

SimpleZZDom.prototype._setCssUsingObject = function ( object ) {
    for ( var key in object ) {
        this._setCssUsingKeyValue( key, object[ key ] );
    }
};

SimpleZZDom.prototype._insertHelper = function ( position, x ) {
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

SimpleZZDom.prototype._buildError = function ( method ) {
    return 'Method "' + method + '" not ready for that type!';
};

SimpleZZDom.prototype._getElId = function(){
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

/* Methods included in jquery */
SimpleZZDom.prototype.addClass = function ( name ) {
    this.el.classList.add( name );
    return this;
};

SimpleZZDom.prototype.after = function ( x ) {
    return this._insertHelper( 'afterend', x );
};

SimpleZZDom.prototype.append = function ( x ) {
    if ( x instanceof Element ){
        this.el.appendChild( x );
    } else if ( x instanceof SimpleZZDom ){
        this.el.appendChild( x.el );
    } else if ( typeof x === 'string' ) {
        this.el.insertAdjacentHTML( 'beforeend', x );
    } else {
        throw this._buildError( 'append' );
    }
    return this;
};

SimpleZZDom.prototype.before = function ( x ) {
    return this._insertHelper( 'beforebegin', x );
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
    
    throw this._buildError( 'filter' );
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
    return this._styleProperty( 'height', value );
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
    return this._styleProperty( 'width', value );
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
        throw this._buildError( 'prepend' );
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
        for ( var i = 0; i < x.nodes.length; ++i ){
            x.nodes[ i ].appendChild( this.el.cloneNode( true ) );
        }
        return this;
    } 
    
    throw this._buildError( 'is' );
};

SimpleZZDom.prototype.trigger = function ( eventName ) {
    var event = document.createEvent( 'HTMLEvents' );
    event.initEvent( eventName, true, false );
    this.el.dispatchEvent( event );
    return this;
};

SimpleZZDom.prototype.on = function ( eventName, listener, useCapture ) {
    zzDOM.addEventListener( this, eventName, listener, useCapture );
    return this;
};

SimpleZZDom.prototype.off = function ( eventName, listener, useCapture ) {
    zzDOM.removeEventListener( this, eventName, listener, useCapture );
    return this;
};
