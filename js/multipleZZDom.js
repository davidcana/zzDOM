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
        MultipleZZDom.prototype[ id ] = function(){
            for ( var i = 0; i < this.list.length; i++ ) {
                var simpleZZDom = this.list[ i ];
                simpleZZDom[ id ].apply( simpleZZDom, arguments );
            }
            return this;
        };
    }
}();
/*
var MultipleZZDom_init = function(){
    for ( var id in SimpleZZDom.prototype ){
        MultipleZZDom.prototype[ id ] = function(){
            this.iterate(
                function( simpleZZDom ){
                    simpleZZDom[ id ].apply( simpleZZDom, arguments );
                }
            );
            return this;
        };
    }
}();
*/
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

/*
MultipleZZDom.prototype.addClass = function ( name ) {
    this.iterate(
        function( simpleZZDom ){
            simpleZZDom.addClass( name );
        }
    );
    return this;
};

MultipleZZDom.prototype.empty = function () {
    this.iterate(
        function( simpleZZDom ){
            simpleZZDom.empty();
        }
    );
    return this;
};

MultipleZZDom.prototype.attr = function ( name, value ) {
    this.iterate(
        function( simpleZZDom ){
            simpleZZDom.attr( name, value );
        }
    );
    return this;
};

MultipleZZDom.prototype.html = function ( value ) {
    this.iterate(
        function( simpleZZDom ){
            simpleZZDom.html( value );
        }
    );
    return this;
};

MultipleZZDom.prototype.css = function () {
    this.iterate(
        function( simpleZZDom ){
            simpleZZDom.css.apply( simpleZZDom, arguments );
        }
    );
    return this;
};

MultipleZZDom.prototype.text = function ( value ) {
    this.iterate(
        function( simpleZZDom ){
            simpleZZDom.text( value );
        }
    );
    return this;
};

MultipleZZDom.prototype.remove = function () {
    this.iterate(
        function( simpleZZDom ){
            simpleZZDom.remove();
        }
    );
    return this;
};

MultipleZZDom.prototype.removeAttr = function ( name ) {
    this.iterate(
        function( simpleZZDom ){
            simpleZZDom.removeAttr( name );
        }
    );
    return this;
};

MultipleZZDom.prototype.removeClass = function ( name ) {
    this.iterate(
        function( simpleZZDom ){
            simpleZZDom.removeClass( name );
        }
    );
    return this;
};

MultipleZZDom.prototype.toggleClass = function ( name ) {
    this.iterate(
        function( simpleZZDom ){
            simpleZZDom.toggleClass( name );
        }
    );
    return this;
};

MultipleZZDom.prototype.trigger = function ( name ) {
    this.iterate(
        function( simpleZZDom ){
            simpleZZDom.trigger( name );
        }
    );
    return this;
};

MultipleZZDom.prototype.hide = function () {
    this.iterate(
        function( simpleZZDom ){
            simpleZZDom.hide();
        }
    );
    return this;
};

MultipleZZDom.prototype.show = function () {
    this.iterate(
        function( simpleZZDom ){
            simpleZZDom.show();
        }
    );
    return this;
};
*/
