// Import
import { zzDOM } from '/src/zzDOM-core.js';
import { runTests } from '../components/multiple.events.js';

// Import plugins
import { plugin as plugin } from '/src/plugin-events.js';
plugin.register( zzDOM );

runTests( zzDOM );
