"use strict";

var Qunit = require( 'qunit' );
//var utils = require( '../test/src/app/utils-node.js' );

var zzDOM = require( '../closures-core.js' );
var zz = zzDOM.zz;

require( '../plugin-forms.js' ); // Utils plugin depends of forms plugin
require( '../plugin-utils.js' );
