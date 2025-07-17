// Import
import { zzDOM } from '/src/zzDOM-core.js';
import { runTests } from '../components/multiple.visible.js';

// Import plugins
import { plugin as plugin } from '/src/plugin-visible.js';
plugin.register( zzDOM );

runTests( zzDOM );
