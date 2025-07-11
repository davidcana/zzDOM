
const pluginName = 'Events';

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

    assert[ method ]( zzDOM.SS.prototype.off instanceof Function );
    assert[ method ]( zzDOM.SS.prototype.on instanceof Function );
    assert[ method ]( zzDOM.SS.prototype.trigger instanceof Function );

    assert[ method ]( zzDOM.MM.prototype.off instanceof Function );
    assert[ method ]( zzDOM.MM.prototype.on instanceof Function );
    assert[ method ]( zzDOM.MM.prototype.trigger instanceof Function );
};

