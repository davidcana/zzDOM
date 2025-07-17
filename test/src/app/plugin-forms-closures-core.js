// Import zzDOM closure core and forms plugin
import { zzDOM } from '/src/zzDOM-core.js';
import { runCoreTests as runTests } from '../components/plugin.forms.js';

// Import plugin
import { plugin } from '/src/plugin-forms.js';

runTests( zzDOM, plugin );
