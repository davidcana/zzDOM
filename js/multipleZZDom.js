/*
    MultipleZZDom class
*/
var MultipleZZDom = function ( _nodes ) {    
    
    // Init list and nodes 
    this.list = [];
    this.nodes = _nodes;
    for ( var i = 0; i < this.nodes.length; i++ ) {
        this.list.push( 
            new SimpleZZDom( this.nodes[ i ] )
        );
    }
};

MultipleZZDom.prototype._constructors = {};
MultipleZZDom.prototype._constructors.concat = function( functionId ){
    return function(){
        var newNodes = [];
        for ( var i = 0; i < this.list.length; i++ ) {
            var simpleZZDom = this.list[ i ];
            var x = simpleZZDom[ functionId ].apply( simpleZZDom, arguments );
            newNodes = newNodes.concat( x.nodes );
        }
        return zzDOM.buildInstance( newNodes );
    };
};
MultipleZZDom.prototype._constructors.booleanOr = function( functionId ){
    return function(){
        for ( var i = 0; i < this.list.length; i++ ) {
            var simpleZZDom = this.list[ i ];
            var x = simpleZZDom[ functionId ].apply( simpleZZDom, arguments );
            if ( x ){
                return true;
            }
        }
        return false;
    };
};
MultipleZZDom.prototype._constructors.default = function( functionId ){
    return function(){
        for ( var i = 0; i < this.list.length; i++ ) {
            var simpleZZDom = this.list[ i ];
            var r = simpleZZDom[ functionId ].apply( simpleZZDom, arguments );
            if ( i === 0 && ! ( r instanceof SimpleZZDom ) ){
                return r;
            }
        }
        return this;
    };
};

// Init prototype functions from SimpleZZDom
MultipleZZDom.mInit = function(){
    for ( var id in SimpleZZDom.prototype ){
        var closure = function(){
            var functionId = id;
            
            switch ( SimpleZZDom.prototype[ functionId ] ){
            // Concat functions
            case SimpleZZDom.prototype.siblings:
            case SimpleZZDom.prototype.prev:
            case SimpleZZDom.prototype.next:
            case SimpleZZDom.prototype.children:
            case SimpleZZDom.prototype.parent:
            case SimpleZZDom.prototype.find:
            case SimpleZZDom.prototype.filter:
            case SimpleZZDom.prototype.offsetParent:
            case SimpleZZDom.prototype.clone:
                return MultipleZZDom.prototype._constructors.concat( functionId );
            // Boolean functions
            case SimpleZZDom.prototype.is:
                return MultipleZZDom.prototype._constructors.booleanOr( functionId );
            // Default function
            default:
                return MultipleZZDom.prototype._constructors.default( functionId );
            }
        };
        MultipleZZDom.prototype[ id ] = closure();
    }
}();

/* Methods included in jquery */
MultipleZZDom.prototype.each = function ( eachFn ) {
    Array.prototype.forEach.call( this.list, eachFn );
    return this;
};
