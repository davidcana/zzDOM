// Import plugin
//import { plugin } from '/src/plugin-center.js';

export const runCoreTests = function( zzDOM, plugin ){

    QUnit.test( 'Center plugin core disabled/enabled test', function( assert ) {
        assertPluginNotOk( assert, zzDOM );
        plugin.register( zzDOM );
        assertPluginOk( assert, zzDOM );
    });
};

export const runFullTests = function( zzDOM ){

    QUnit.test( 'Center plugin full enabled test', function( assert ) {
        assertPluginOk( assert , zzDOM );
    });
};

const assertPluginNotOk = function( assert, zzDOM ){
    assertPlugin( assert, zzDOM, false );
    /*
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
    */
};

const assertPluginOk = function( assert, zzDOM ){
    assertPlugin( assert, zzDOM, true );
    /*
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
    */
};

const assertPlugin = function( assert, zzDOM, isOk ){

    const method = isOk? 'ok': 'notOk';

    assert[ method ]( zzDOM.SS.prototype.getXCenter instanceof Function );
    assert[ method ]( zzDOM.SS.prototype.getYCenter instanceof Function );
    assert[ method ]( zzDOM.SS.prototype.getCenter instanceof Function );
    assert[ method ]( zzDOM.SS.prototype.center instanceof Function );
    assert[ method ]( zzDOM.SS.prototype.centerX instanceof Function );
    assert[ method ]( zzDOM.SS.prototype.centerY instanceof Function );

    assert[ method ]( zzDOM.MM.prototype.getXCenter instanceof Function );
    assert[ method ]( zzDOM.MM.prototype.getYCenter instanceof Function );
    assert[ method ]( zzDOM.MM.prototype.getCenter instanceof Function );
    assert[ method ]( zzDOM.MM.prototype.center instanceof Function );
    assert[ method ]( zzDOM.MM.prototype.centerX instanceof Function );
    assert[ method ]( zzDOM.MM.prototype.centerY instanceof Function );
};
/*
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
*/

