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

// Import MM, closures version
import { MM } from './mm-closures.js';
MM.register( zzDOM );

// Register zz function
/*
var zz;
(function() { 
    zz = zzDOM.zz; 
})();
*/


