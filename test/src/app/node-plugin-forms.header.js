"use strict";

var Qunit = require( 'qunit' );

//var zzDOM = require('../build/zzDOM-closures-full.js');
//var zz = require( '../index.js' );

//var zzDOM = require( '../index.js' );
var zzDOM = require('../build/zzDOM-closures-core.js');
var zz = zzDOM.zz;


QUnit.test( 'plugin disabled/enabled test', function( assert ) {

    assert.notOk( zzDOM.SS.prototype.checked instanceof Function );
    assert.notOk( zzDOM.SS.prototype.disabled instanceof Function );
    assert.notOk( zzDOM.SS.prototype.indeterminate instanceof Function );
    assert.notOk( zzDOM.SS.prototype.prop instanceof Function );
    assert.notOk( zzDOM.SS.prototype.val instanceof Function );

    assert.notOk( zzDOM.MM.prototype.checked instanceof Function );
    assert.notOk( zzDOM.MM.prototype.disabled instanceof Function );
    assert.notOk( zzDOM.MM.prototype.indeterminate instanceof Function );
    assert.notOk( zzDOM.MM.prototype.prop instanceof Function );
    assert.notOk( zzDOM.MM.prototype.val instanceof Function );

    require( '../plugin-forms.js' );

    assert.ok( zzDOM.SS.prototype.checked instanceof Function );
    assert.ok( zzDOM.SS.prototype.disabled instanceof Function );
    assert.ok( zzDOM.SS.prototype.indeterminate instanceof Function );
    assert.ok( zzDOM.SS.prototype.prop instanceof Function );
    assert.ok( zzDOM.SS.prototype.val instanceof Function );

    assert.ok( zzDOM.MM.prototype.checked instanceof Function );
    assert.ok( zzDOM.MM.prototype.disabled instanceof Function );
    assert.ok( zzDOM.MM.prototype.indeterminate instanceof Function );
    assert.ok( zzDOM.MM.prototype.prop instanceof Function );
    assert.ok( zzDOM.MM.prototype.val instanceof Function );
});

