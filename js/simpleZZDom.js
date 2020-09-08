/*
    SimpleZZDom class
*/
var SimpleZZDom = function ( _el ) {    
    this.el = _el;
    this.nodes = [ _el ];
};

/* Methods NOT included in jquery */
SimpleZZDom.prototype.get = function () {
    return this.el;
};

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

SimpleZZDom.prototype.setCssUsingKeyValue = function ( _key, value ) {
    var key = _key.replace(/-\w/g, function ( s ) { return s.charAt( 1 ).toUpperCase(); } );
    this.el.style[ key ] = value;
};

SimpleZZDom.prototype.setCssUsingObject = function ( object ) {
    for ( var key in object ) {
        this.setCssUsingKeyValue( key, object[ key ] );
    }
};

SimpleZZDom.prototype.insertHelper = function ( position, x ) {
    if ( x instanceof Element ){  // x is Element
        this.el.insertAdjacent( position, x );
    } else if ( x instanceof SimpleZZDom ){
        this.el.insertAdjacent( position, x.el );
    } else {
        this.el.insertAdjacentHTML( position, x );
    }
    return this;
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
    } else {
        this.el.insertAdjacentHTML( 'beforeend', x );
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

SimpleZZDom.prototype.filter = function ( filterFn ) {
    return zzDOM.buildInstance(
        Array.prototype.filter.call( this.el, filterFn )
    );
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

SimpleZZDom.prototype.is = function ( other ) {
    // other is a SimpleZZDom
    if ( other instanceof SimpleZZDom ) {
        return this.el === other.el;
    } 
    
    // other is string
    if ( typeof other === 'string' ){
        var selector = other;
        return ( this.el.matches || this.el.matchesSelector || this.el.msMatchesSelector || this.el.mozMatchesSelector || this.el.webkitMatchesSelector || this.el.oMatchesSelector ).call( this.el, selector );
    }
    
    throw 'Method "is" not ready for that type!';
};

SimpleZZDom.prototype.next = function () {
    return new SimpleZZDom( this.el.nextElementSibling );
};

SimpleZZDom.prototype.offset = function () {
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
        this.el.insertBefore( otherEl, this.el.firstChild );
    } else {
        this.el.insertAdjacentHTML( 'afterbegin', x );
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

SimpleZZDom.prototype.trigger = function ( eventName ) {
    var event = document.createEvent( 'HTMLEvents' );
    event.initEvent( eventName, true, false );
    this.el.dispatchEvent( event );
    return this;
};

SimpleZZDom.prototype.hide = function () {
    this.el.style.display = 'none';
    return this;
};

SimpleZZDom.prototype.show = function () {
    this.el.style.display = '';
    return this;
};
