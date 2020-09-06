/*
    MultipleZZDom class
*/
var MultipleZZDom = function ( nodeList ) {    
    this.list = [];
    for ( var i = 0; i < this.nodeList.length; i++ ) {
        this.list.push( 
            new SimpleZZDom( this.nodeList[ i ] )
        );
    }
};

/* Methods NOT included in jquery */
MultipleZZDom.prototype.get = function () {
    return this.list;
};

MultipleZZDom.prototype.iterate = function ( iterateFn ) {
    for ( var i = 0; i < this.list.length; i++ ) {
        iterateFn( this.list[ i ] );
    }
};

/* Methods included in jquery */
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
