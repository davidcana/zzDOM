// Import zzDOM closure core and plugin center
import { zzDOM } from '/src/zzDOM-core.js';
import { runCoreTests as runTests } from '../components/plugin.center.js';

// Import plugin
import { plugin } from '/src/plugin-center.js';

runTests( zzDOM, plugin );
