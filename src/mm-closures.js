/*
 * zzDOM.MM class
 */
/** @constructor */
zzDOM.MM = function ( _nodes ) {    
    this.list = [];
    this.nodes = _nodes.filter( n => n ); // Remove null elements
    this.length = this.nodes.length;
    
    // Init nodes
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
            var closure = function(){
                var functionId = id;
                return constructor? constructor( functionId ): zzDOM.MM.constructors.default( functionId );
            };
            zzDOM.MM.prototype[ id ] = closure();
            return;
        }
    }
    
    throw 'Error registering zzDOM.MM: zzDOM.SS not found.';
};

zzDOM.MM.constructors = {};
zzDOM.MM.constructors.booleanOr = function( functionId ){
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
zzDOM.MM.constructors.concat = function( functionId ){
    return function(){
        var newNodes = [];
        for ( var i = 0; i < this.list.length; i++ ) {
            var ss = this.list[ i ];
            var x = ss[ functionId ].apply( ss, arguments );
            newNodes = [...new Set([...newNodes, ...x.nodes])]; // Concat not adding duplicates
            //newNodes = newNodes.concat( x.nodes );
        }
        return zzDOM._build( newNodes );
    };
};
zzDOM.MM.constructors.default = function( functionId ){
    return function(){
        for ( var i = 0; i < this.list.length; i++ ) {
            var ss = this.list[ i ];
            var r = ss[ functionId ].apply( ss, arguments );
            if ( i === 0 && ! ( r instanceof zzDOM.SS ) ){
                return r;
            }
        }
        return this;
    };
};
zzDOM.MM.constructors.first = function( functionId ){
    return function(){
        for ( var i = 0; i < this.list.length; i++ ) {
            var ss = this.list[ i ];
            var r = ss[ functionId ].apply( ss, arguments );
            if ( r instanceof zzDOM.SS ){
                return r;
            }
        }
        return this;
    };
};
zzDOM.MM.constructors.callback = function( functionId ){
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
zzDOM.MM.constructors.appendText = function( functionId ){
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
        //return textMode? text: this;
        return ! this.list.length && ! arguments.length?
            null:
            textMode? text: this;
    };
};
/*
zzDOM.MM.constructors.val = function( functionId ){
    return function(){
        for ( var i = 0; i < this.list.length; i++ ) {
            var ss = this.list[ i ];
            var r = ss[ functionId ].apply( ss, arguments );
            if ( i === 0 && ! ( r instanceof zzDOM.SS ) ){
                return r;
            }
        }
        return ! this.list.length && ! arguments.length? null: this;
    };
};
*/
zzDOM.MM.constructors.val = function( functionId, len ){
    return function(){
        for ( var i = 0; i < this.list.length; i++ ) {
            var ss = this.list[ i ];
            var r = ss[ functionId ].apply( ss, arguments );
            if ( i === 0 && ! ( r instanceof zzDOM.SS ) ){
                return r;
            }
        }
        return ! this.list.length && arguments.length === len? null: this;
    };
};
zzDOM.MM.constructors.val0 = function( functionId ){
    return zzDOM.MM.constructors.val( functionId, 0 );
};
zzDOM.MM.constructors.val1 = function( functionId ){
    return zzDOM.MM.constructors.val( functionId, 1 );
};

// Init prototype functions from zzDOM.SS
zzDOM.MM.init = function(){
    // Concat functions
    var concatF = [
        'children',
        'clone',
        'filter',
        'find',
        'next',
        'offsetParent',
        'parent',
        'parents',
        'prev',
        'siblings'
    ];
    // Boolean functions
    var booleanOrF = [
        'hasClass',
        'is'
    ];
    // Callback functions
    var callbackF = [
        'fadeIn',
        'fadeOut'
    ];
    // Append text functions
    var appendF = [
        'text'
    ];
    // Val functions
    var val0F = [
        'checked',
        'disabled',
        'html',
        'indeterminate',
        'val'
    ];
    var val1F = [
        'prop'
    ];
    // First functions
    var firstF = [
        'closest'
    ];
    for ( var id in zzDOM.SS.prototype ){
        var closure = function(){
            var functionId = id;
            
            if ( concatF.indexOf( functionId ) !== -1 ){
                return zzDOM.MM.constructors.concat( functionId );
            }
            if ( booleanOrF.indexOf( functionId ) !== -1 ){
                return zzDOM.MM.constructors.booleanOr( functionId );
            }
            if ( callbackF.indexOf( functionId ) !== -1 ){
                return zzDOM.MM.constructors.callback( functionId );
            }
            if ( appendF.indexOf( functionId ) !== -1 ){
                return zzDOM.MM.constructors.appendText( functionId );
            }
            if ( val0F.indexOf( functionId ) !== -1 ){
                return zzDOM.MM.constructors.val0( functionId );
            }
            if ( val1F.indexOf( functionId ) !== -1 ){
                return zzDOM.MM.constructors.val1( functionId );
            }
            if ( firstF.indexOf( functionId ) !== -1 ){
                return zzDOM.MM.constructors.first( functionId );
            }
            return zzDOM.MM.constructors.default( functionId );
        };
        zzDOM.MM.prototype[ id ] = closure();
    }
}();

/* Methods included in jquery */
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

zzDOM.MM.prototype.map = function ( mapFn ) {
    var newNodes = this.nodes.map( ( node, i ) => {
        return mapFn.call( node, i, node );
    });
    return zzDOM._build( newNodes );
};

zzDOM.MM.prototype.get = function ( i ) {
    return zzDOM._get( this.nodes, i );
};
