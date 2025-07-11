
const pluginName = 'Center';

export const runCoreTests = function( zzDOM, plugin ){

    QUnit.test( pluginName + ' plugin core disabled/enabled test', function( assert ) {
        assertPluginNotOk( assert, zzDOM );
        plugin.register( zzDOM );
        assertPluginOk( assert, zzDOM );
    });
};

export const runFullTests = function( zzDOM ){

    QUnit.test( pluginName + ' plugin full enabled test', function( assert ) {
        assertPluginOk( assert , zzDOM );
    });
};

const assertPluginNotOk = function( assert, zzDOM ){
    assertPlugin( assert, zzDOM, false );
};

const assertPluginOk = function( assert, zzDOM ){
    assertPlugin( assert, zzDOM, true );
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

