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

MM.register = function( zzDOM ){

    // Register MM
    zzDOM.MM = MM;
    MM.zzDOM = zzDOM;
    
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

    MM.prototype._registerMM( zzDOM );
};

/* MM contructors */
MM.constructors = {};
MM.constructors.concat = function( mm, fn, args ){
    var newNodes = [];
    for ( var i = 0; i < mm.list.length; i++ ) {
        var ss = mm.list[ i ];
        var x = fn.apply( ss, args );
        newNodes = [...new Set([...newNodes, ...x.nodes])]; // Concat not adding duplicates
        //newNodes = newNodes.concat( x.nodes );
    }
    return MM.zzDOM._build( newNodes );
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

/* MM methods implemented using constructors in MM.constructors */
MM.prototype._registerMM = function( zzDOM ){
    const sp = zzDOM.SS.prototype;
    const mc = zzDOM.MM.constructors;

    zzDOM.add( sp.addClass );
    zzDOM.add( sp.after );
    zzDOM.add( sp.append );
    zzDOM.add( sp.appendTo );
    zzDOM.add( sp.attr, mc.val1 );
    zzDOM.add( sp.before );
    zzDOM.add( sp.children, mc.concat );
    zzDOM.add( sp.clone, mc.concat );
    zzDOM.add( sp.closest, mc.first );
    zzDOM.add( sp.css );
    zzDOM.add( sp.empty );
    zzDOM.add( sp.filter, mc.concat );
    zzDOM.add( sp.find, mc.concat );
    zzDOM.add( sp.hasClass, mc.booleanOr );
    zzDOM.add( sp.height, mc.val0 );
    zzDOM.add( sp.html, mc.val0 );
    zzDOM.add( sp.index, mc.getVal );
    zzDOM.add( sp.is, mc.booleanOr );
    zzDOM.add( sp.next, mc.concat );
    zzDOM.add( sp.offset, mc.val0 );
    zzDOM.add( sp.offsetParent, mc.concat );
    zzDOM.add( sp.outerHeight, mc.getVal );
    zzDOM.add( sp.outerWidth, mc.getVal );
    zzDOM.add( sp.parent, mc.concat );
    zzDOM.add( sp.parents, mc.concat );
    zzDOM.add( sp.position, mc.getVal );
    zzDOM.add( sp.prepend );
    zzDOM.add( sp.prev, mc.concat );
    zzDOM.add( sp.remove );
    zzDOM.add( sp.removeAttr );
    zzDOM.add( sp.removeClass );
    zzDOM.add( sp.replaceWith );
    zzDOM.add( sp.siblings, mc.concat );
    zzDOM.add( sp.text, mc.appendText );
    zzDOM.add( sp.toggleClass );
    zzDOM.add( sp.width, mc.val0 );
};

/* MM methods implemented not using constructors in MM.constructors */
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
    return MM.zzDOM._get( this.nodes, i );
};

MM.prototype.map = function ( mapFn ) {
    var newNodes = this.nodes.map( ( node, i ) => {
        return mapFn.call( node, i, node );
    });
    return MM.zzDOM._build( newNodes );
};
