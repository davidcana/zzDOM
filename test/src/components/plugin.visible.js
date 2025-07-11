const pluginName = 'Visible';

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

    assert[ method ]( zzDOM.SS.prototype.fadeIn instanceof Function );
    assert[ method ]( zzDOM.SS.prototype.fadeOut instanceof Function );
    assert[ method ]( zzDOM.SS.prototype.hide instanceof Function );
    assert[ method ]( zzDOM.SS.prototype.isVisible instanceof Function );
    assert[ method ]( zzDOM.SS.prototype.show instanceof Function );
    assert[ method ]( zzDOM.SS.prototype.toggle instanceof Function );

    assert[ method ]( zzDOM.MM.prototype.fadeIn instanceof Function );
    assert[ method ]( zzDOM.MM.prototype.fadeOut instanceof Function );
    assert[ method ]( zzDOM.MM.prototype.hide instanceof Function );
    assert[ method ]( zzDOM.MM.prototype.isVisible instanceof Function );
    assert[ method ]( zzDOM.MM.prototype.show instanceof Function );
    assert[ method ]( zzDOM.MM.prototype.toggle instanceof Function );
};


