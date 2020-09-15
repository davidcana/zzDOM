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

// Init prototype functions from SimpleZZDom
var MultipleZZDom_init = function(){
    for ( var id in SimpleZZDom.prototype ){
        var closure = function(){
            var functionId = id;
            return function(){
                for ( var i = 0; i < this.list.length; i++ ) {
                    var simpleZZDom = this.list[ i ];
                    var r = simpleZZDom[ functionId ].apply( simpleZZDom, arguments );
                    if ( i == 0 && ! ( r instanceof SimpleZZDom ) ){
                        return r;
                    }
                }
                return this;
            };
        };
        MultipleZZDom.prototype[ id ] = closure();
    }
}();

/* Methods NOT included in jquery */
/*
MultipleZZDom.prototype.get = function () {
    return this.list;
};
*/
/*
MultipleZZDom.prototype.iterate = function ( iterateFn ) {
    for ( var i = 0; i < this.list.length; i++ ) {
        iterateFn( this.list[ i ] );
    }
};
*/
/* Methods included in jquery */
MultipleZZDom.prototype.each = function ( eachFn ) {
    Array.prototype.forEach.call( this.list, eachFn );
    return this;
};

MultipleZZDom.prototype.siblings = function () {
    var newNodes = [];
    
    for ( var i = 0; i < this.list.length; i++ ) {
        var simpleZZDom = this.list[ i ];
        var x = simpleZZDom.siblings.apply( simpleZZDom, arguments );
        newNodes = newNodes.concat( x.nodes );
    }
    
    return zzDOM.buildInstance( newNodes );
};

MultipleZZDom.prototype.prev = function () {
    var newNodes = [];
    
    for ( var i = 0; i < this.list.length; i++ ) {
        var simpleZZDom = this.list[ i ];
        var x = simpleZZDom.prev.apply( simpleZZDom, arguments );
        newNodes = newNodes.concat( x.nodes );
    }
    
    return zzDOM.buildInstance( newNodes );
};

MultipleZZDom.prototype.next = function () {
    var newNodes = [];
    
    for ( var i = 0; i < this.list.length; i++ ) {
        var simpleZZDom = this.list[ i ];
        var x = simpleZZDom.next.apply( simpleZZDom, arguments );
        newNodes = newNodes.concat( x.nodes );
    }
    
    return zzDOM.buildInstance( newNodes );
};

MultipleZZDom.prototype.find = function () {
    var nodes = [];
    for ( var i = 0; i < this.list.length; i++ ) {
        var simpleZZDOM = this.list[ i ];
        var thisNodes = simpleZZDOM.find.apply( simpleZZDOM, arguments ).nodes;
        nodes = nodes.concat( thisNodes );
    }
    
    return zzDOM.buildInstance( nodes );
};

MultipleZZDom.prototype.filter = function () {
    var nodes = [];
    for ( var i = 0; i < this.list.length; i++ ) {
        var simpleZZDOM = this.list[ i ];
        var thisNodes = simpleZZDOM.filter.apply( simpleZZDOM, arguments ).nodes;
        nodes = nodes.concat( thisNodes );
    }
    
    return zzDOM.buildInstance( nodes );
};
