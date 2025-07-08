/*
 * MM class
 * Google closure compiler version
 */

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
