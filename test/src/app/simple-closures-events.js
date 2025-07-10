// Import
import { zzDOM } from '/src/zzDOM-closures-core.js';
import { runTests } from '../components/simple.events.js';

// Import plugins
import { plugin as plugin } from '/src/plugin-events.js';
plugin.register( zzDOM );

runTests( zzDOM );
