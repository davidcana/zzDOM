/*
    zzDOM.MM class
*/
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

zzDOM.MM.constructors = {};
zzDOM.MM.constructors.concat = function( functionId ){
    return function(){
        var newNodes = [];
        for ( var i = 0; i < this.list.length; i++ ) {
            var ss = this.list[ i ];
            var x = ss[ functionId ].apply( ss, arguments );
            newNodes = newNodes.concat( x.nodes );
        }
        return zzDOM._build( newNodes );
    };
};
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

// Init prototype functions from zzDOM.SS
zzDOM.MM.init = function(){
    for ( var id in zzDOM.SS.prototype ){
        var closure = function(){
            var functionId = id;
            
            switch ( zzDOM.SS.prototype[ functionId ] ){
            // Concat functions
            case zzDOM.SS.prototype.siblings:
            case zzDOM.SS.prototype.prev:
            case zzDOM.SS.prototype.next:
            case zzDOM.SS.prototype.children:
            case zzDOM.SS.prototype.parent:
            case zzDOM.SS.prototype.find:
            case zzDOM.SS.prototype.filter:
            case zzDOM.SS.prototype.offsetParent:
            case zzDOM.SS.prototype.clone:
                return zzDOM.MM.constructors.concat( functionId );
            // Boolean functions
            case zzDOM.SS.prototype.is:
                return zzDOM.MM.constructors.booleanOr( functionId );
            // Default function
            default:
                return zzDOM.MM.constructors.default( functionId );
            }
        };
        zzDOM.MM.prototype[ id ] = closure();
    }
}();

/*
Add a new function to prototype of zzDOM.MM. Example:

zzDOM.MM.add( 
    zzDOM.SS.prototype.myCustomFunction, 
    zzDOM.MM.constructors.concat
);
*/
zzDOM.MM.add = function( sPrototype, constructor ){
    for ( var id in zzDOM.SS.prototype ){
        var current = zzDOM.SS.prototype[ id ];
        if ( sPrototype === current ){
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

/* Methods included in jquery */
zzDOM.MM.prototype.each = function ( eachFn ) {
    Array.prototype.forEach.call( this.list, eachFn );
    return this;
};
