// Import zzDOM closure core and visible plugin
import { zzDOM } from '/src/zzDOM-core.js';
import { runCoreTests as runTests } from '../components/plugin.visible.js';

// Import plugin
import { plugin } from '/src/plugin-visible.js';

runTests( zzDOM, plugin );
