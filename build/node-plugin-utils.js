"use strict";

var Qunit = require( 'qunit' );

var zzDOM = require( '../closures-core.js' );
var zz = zzDOM.zz;

require( '../plugin-forms.js' ); // Utils plugin depends of forms plugin
require( '../plugin-utils.js' );

QUnit.test( 'param test', function( assert ) {
    var object = {
        'a': 1,
        'b': 'a string'
    };
    assert.equal( zzDOM.param( object ), 'a=1&b=a%20string' );
    
    var ss = zz( '#t10-1' );
    assert.equal( zzDOM.param( ss ), 't10-1=hello' );
    
    var mm = zz( '.t10' );
    assert.equal( zzDOM.param( mm ), 't10-1=hello&t10-2=23' );
});
