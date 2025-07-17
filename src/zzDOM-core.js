/* zzDOM object */
/**
 * A namespace.
 * @const
 */
export const zzDOM = {};

// Import modules

// Import core
import { core } from './core.js';
core.register( zzDOM );

// Import MM, gcc version
import { MM } from './mm-gcc.js';
MM.register( zzDOM );

// Register zz function
/*
var zz;
(function() { 
    zz = zzDOM.zz; 
})();
*/


