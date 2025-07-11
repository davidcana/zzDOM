"use strict";

var Qunit = require( 'qunit' );

//var zzDOM = require('../build/zzDOM-closures-full.js');
//var zz = require( '../index.js' );

//var zzDOM = require( '../index.js' );
var zzDOM = require('../build/zzDOM-closures-core.js');
var zz = zzDOM.zz;

QUnit.test( 'plugin disabled/enabled test', function( assert ) {

    assert.notOk( zzDOM.SS.prototype.fadeIn instanceof Function );
    assert.notOk( zzDOM.SS.prototype.fadeOut instanceof Function );
    assert.notOk( zzDOM.SS.prototype.hide instanceof Function );
    assert.notOk( zzDOM.SS.prototype.isVisible instanceof Function );
    assert.notOk( zzDOM.SS.prototype.show instanceof Function );
    assert.notOk( zzDOM.SS.prototype.toggle instanceof Function );

    assert.notOk( zzDOM.MM.prototype.checked instanceof Function );
    assert.notOk( zzDOM.MM.prototype.fadeOut instanceof Function );
    assert.notOk( zzDOM.MM.prototype.hide instanceof Function );
    assert.notOk( zzDOM.MM.prototype.isVisible instanceof Function );
    assert.notOk( zzDOM.MM.prototype.show instanceof Function );
    assert.notOk( zzDOM.MM.prototype.toggle instanceof Function );

    require( '../plugin-visible.js' );

    assert.ok( zzDOM.SS.prototype.fadeIn instanceof Function );
    assert.ok( zzDOM.SS.prototype.fadeOut instanceof Function );
    assert.ok( zzDOM.SS.prototype.hide instanceof Function );
    assert.ok( zzDOM.SS.prototype.isVisible instanceof Function );
    assert.ok( zzDOM.SS.prototype.show instanceof Function );
    assert.ok( zzDOM.SS.prototype.toggle instanceof Function );

    assert.ok( zzDOM.MM.prototype.fadeIn instanceof Function );
    assert.ok( zzDOM.MM.prototype.fadeOut instanceof Function );
    assert.ok( zzDOM.MM.prototype.hide instanceof Function );
    assert.ok( zzDOM.MM.prototype.isVisible instanceof Function );
    assert.ok( zzDOM.MM.prototype.show instanceof Function );
    assert.ok( zzDOM.MM.prototype.toggle instanceof Function );
});

