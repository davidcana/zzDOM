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
zzDOM.MM = MM;
MM._registerAdd( zzDOM );

// Import plugins
import { plugin as centerPlugin } from './plugin-center.js';
centerPlugin.register( zzDOM );
import { plugin as eventsPlugin } from './plugin-events.js';
eventsPlugin.register( zzDOM );
import { plugin as formsPlugin } from './plugin-forms.js';
formsPlugin.register( zzDOM );
import { plugin as visiblePlugin } from './plugin-visible.js';
visiblePlugin.register( zzDOM );

// Register zz function
/*
var zz;
(function() { 
    zz = zzDOM.zz; 
})();
*/


