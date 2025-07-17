// Import zzDOM closure core and events plugin
import { zzDOM } from '/src/zzDOM-core.js';
import { runCoreTests as runTests } from '../components/plugin.events.js';

// Import plugin
import { plugin } from '/src/plugin-events.js';

runTests( zzDOM, plugin );
