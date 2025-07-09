"use strict";

var Qunit = require( 'qunit' );

//var zzDOM = require( '../index.js' );
var zzDOM = require('../build/zzDOM-closures-core.js');
var zz = zzDOM.zz;

QUnit.test( 'plugin disabled/enabled test', function( assert ) {

    assert.notOk( zzDOM.SS.prototype.getXCenter instanceof Function );
    assert.notOk( zzDOM.SS.prototype.getYCenter instanceof Function );
    assert.notOk( zzDOM.SS.prototype.getCenter instanceof Function );
    assert.notOk( zzDOM.SS.prototype.center instanceof Function );
    assert.notOk( zzDOM.SS.prototype.centerX instanceof Function );
    assert.notOk( zzDOM.SS.prototype.centerY instanceof Function );

    assert.notOk( zzDOM.MM.prototype.getXCenter instanceof Function );
    assert.notOk( zzDOM.MM.prototype.getYCenter instanceof Function );
    assert.notOk( zzDOM.MM.prototype.getCenter instanceof Function );
    assert.notOk( zzDOM.MM.prototype.center instanceof Function );
    assert.notOk( zzDOM.MM.prototype.centerX instanceof Function );
    assert.notOk( zzDOM.MM.prototype.centerY instanceof Function );

    require( '../plugin-center.js' );

    assert.ok( zzDOM.SS.prototype.getXCenter instanceof Function );
    assert.ok( zzDOM.SS.prototype.getYCenter instanceof Function );
    assert.ok( zzDOM.SS.prototype.getCenter instanceof Function );
    assert.ok( zzDOM.SS.prototype.center instanceof Function );
    assert.ok( zzDOM.SS.prototype.centerX instanceof Function );
    assert.ok( zzDOM.SS.prototype.centerY instanceof Function );

    assert.ok( zzDOM.MM.prototype.getXCenter instanceof Function );
    assert.ok( zzDOM.MM.prototype.getYCenter instanceof Function );
    assert.ok( zzDOM.MM.prototype.getCenter instanceof Function );
    assert.ok( zzDOM.MM.prototype.center instanceof Function );
    assert.ok( zzDOM.MM.prototype.centerX instanceof Function );
    assert.ok( zzDOM.MM.prototype.centerY instanceof Function );
});
