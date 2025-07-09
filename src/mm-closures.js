/*
 * MM class
 */

// Import modules
import { SS } from './ss.js';

/** @constructor */
export const MM = function ( _nodes ) {
    this.list = [];
    this.nodes = _nodes.filter( n => n ); // Remove null elements
    this.length = this.nodes.length;
    
    // Init nodes
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
    Unify the definition of a function of SS.prototype and a definition of zzDOM.MM.prototype. Example:

        zzDOM.add( 
            SS.prototype.myCustomFunction = function(){
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
        for ( var id in SS.prototype ){
            var current = SS.prototype[ id ];
            if ( ssPrototype === current ){
                var closure = function(){
                    var functionId = id;
                    return constructor? constructor( functionId ): zzDOM.MM.constructors.default( functionId );
                };
                zzDOM.MM.prototype[ id ] = closure();
                return;
            }
        }
        
        throw 'Error registering zzDOM.MM: SS not found.';
    };

};

MM.constructors = {};
MM.constructors.booleanOr = function( functionId ){
    return function(){
        for ( var i = 0; i < this.list.length; i++ ) {
            var ss = this.list[ i ];
            var x = ss[ functionId ].apply( ss, arguments );
            if ( x ){
                return true;
            }
        }
        return false;
    };
};
MM.constructors.concat = function( functionId ){
    return function(){
        var newNodes = [];
        for ( var i = 0; i < this.list.length; i++ ) {
            var ss = this.list[ i ];
            var x = ss[ functionId ].apply( ss, arguments );
            newNodes = [...new Set([...newNodes, ...x.nodes])]; // Concat not adding duplicates
            //newNodes = newNodes.concat( x.nodes );
        }
        return MM.zzDOM._build( newNodes );
    };
};
MM.constructors.default = function( functionId ){
    return function(){
        for ( var i = 0; i < this.list.length; i++ ) {
            var ss = this.list[ i ];
            var r = ss[ functionId ].apply( ss, arguments );
            if ( i === 0 && ! ( r instanceof SS ) ){
                return r;
            }
        }
        return this;
    };
};
MM.constructors.first = function( functionId ){
    return function(){
        for ( var i = 0; i < this.list.length; i++ ) {
            var ss = this.list[ i ];
            var r = ss[ functionId ].apply( ss, arguments );
            if ( r instanceof SS ){
                return r;
            }
        }
        return this;
    };
};
MM.constructors.callback = function( functionId ){
    return function(){
        if ( ! arguments[ 0 ] ){
            arguments[ 0 ] = {};
        }
        var callback = arguments[ 0 ].callback;
        for ( var i = 0; i < this.list.length; i++ ) {
            var ss = this.list[ i ];
            arguments[ 0 ].callback = i !== this.list.length - 1? undefined: callback; // Run callback just once (the last one)
            ss[ functionId ].apply( ss, arguments );
        }
        return this;
    };
};
MM.constructors.appendText = function( functionId ){
    return function(){
        var text = '';
        var textMode = false;
        for ( var i = 0; i < this.list.length; i++ ) {
            var ss = this.list[ i ];
            var x = ss[ functionId ].apply( ss, arguments );
            if ( typeof x === 'string' ){
                text += ( text == ''? '': ' ' ) + x;
                textMode = true;
            }
        }
        return ! this.list.length && ! arguments.length?
            null:
            textMode? text: this;
    };
};

MM.constructors.val = function( functionId, len ){
    return function(){
        for ( var i = 0; i < this.list.length; i++ ) {
            var ss = this.list[ i ];
            var r = ss[ functionId ].apply( ss, arguments );
            if ( i === 0 && ! ( r instanceof SS ) ){
                return r;
            }
        }
        return ! this.list.length && arguments.length === len? null: this;
    };
};
MM.constructors.val0 = function( functionId ){
    return MM.constructors.val( functionId, 0 );
};
MM.constructors.val1 = function( functionId ){
    return MM.constructors.val( functionId, 1 );
};
MM.constructors.getVal = function( functionId ){
    return function(){
        for ( var i = 0; i < this.list.length; i++ ) {
            var ss = this.list[ i ];
            var r = ss[ functionId ].apply( ss, arguments );
            if ( i === 0 && ! ( r instanceof SS ) ){
                return r;
            }
        }
        return ! this.list.length? null: this;
    };
};
MM.fConstructors = {
    'attr': 'val1',
    //'checked': 'val0',
    'children': 'concat',
    'closest': 'first',
    'clone': 'concat',
    //'disabled': 'val0',
    //'fadeIn': 'callback',
    //'fadeOut': 'callback',
    'filter': 'concat',
    'find': 'concat',
    'hasClass': 'booleanOr',
    'height': 'val0',
    'html': 'val0',
    //'indeterminate': 'val0',
    'index': 'getVal',
    'is': 'booleanOr',
    //'isVisible': 'getVal',
    'next': 'concat',
    'offset': 'val0',
    'offsetParent': 'concat',
    'outerHeight': 'getVal',
    'outerWidth': 'getVal',
    'parent': 'concat',
    'parents': 'concat',
    'position': 'getVal',
    'prev': 'concat',
    //'prop': 'val1',
    'siblings': 'concat',
    'text': 'appendText',
    //'val': 'val0',
    'width': 'val0'
};

// Init prototype functions from SS
MM.init = function(){
    for ( var id in SS.prototype ){
        var closure = function(){
            const fConstructor = MM.fConstructors[ id ] || 'default';
            return MM.constructors[ fConstructor ]( id );
        };
        MM.prototype[ id ] = closure();
    }
}();

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
    return MM.zzDOM._get( this.nodes, i );
};

MM.prototype.map = function ( mapFn ) {
    var newNodes = this.nodes.map( ( node, i ) => {
        return mapFn.call( node, i, node );
    });
    return MM.zzDOM._build( newNodes );
};

