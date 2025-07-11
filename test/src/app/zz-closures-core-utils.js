// Import
import { zzDOM } from '/src/zzDOM-closures-core.js';
import { runTests } from '../components/zz.utils.js';

// Import plugins
import { plugin as plugin } from '/src/plugin-forms.js';
plugin.register( zzDOM );

runTests( zzDOM );
