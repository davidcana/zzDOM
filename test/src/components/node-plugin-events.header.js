"use strict";

var Qunit = require( 'qunit' );

//var zzDOM = require('../build/zzDOM-closures-full.js');
//var zz = require( '../index.js' );

//var zzDOM = require( '../index.js' );
var zzDOM = require('../build/zzDOM-closures-core.js');
var zz = zzDOM.zz;

QUnit.test( 'plugin disabled/enabled test', function( assert ) {

    assert.notOk( zzDOM.SS.prototype.off instanceof Function );
    assert.notOk( zzDOM.SS.prototype.on instanceof Function );
    assert.notOk( zzDOM.SS.prototype.trigger instanceof Function );

    assert.notOk( zzDOM.MM.prototype.off instanceof Function );
    assert.notOk( zzDOM.MM.prototype.on instanceof Function );
    assert.notOk( zzDOM.MM.prototype.trigger instanceof Function );

    require( '../plugin-events.js' );

    assert.ok( zzDOM.SS.prototype.off instanceof Function );
    assert.ok( zzDOM.SS.prototype.on instanceof Function );
    assert.ok( zzDOM.SS.prototype.trigger instanceof Function );

    assert.ok( zzDOM.MM.prototype.off instanceof Function );
    assert.ok( zzDOM.MM.prototype.on instanceof Function );
    assert.ok( zzDOM.MM.prototype.trigger instanceof Function );
});
