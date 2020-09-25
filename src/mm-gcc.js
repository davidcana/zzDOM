/*
 * zzDOM.MM class
 * Google closure compiler version
 */
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

zzDOM.MM.prototype.toggleClass = function ( name ) {
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