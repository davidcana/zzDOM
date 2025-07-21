// Import
import { zzDOM } from '../../../dist/zzDOM-full-esm.js';
import { runTests as runSimpleTests } from '../components/multiple.js';
import { runTests as runEventsTests } from '../components/multiple.events.js';
import { runTests as runFormsTests } from '../components/multiple.forms.js';
import { runTests as runVisibleTests } from '../components/multiple.visible.js';

runSimpleTests( zzDOM );
runEventsTests( zzDOM );
runFormsTests( zzDOM );
runVisibleTests( zzDOM );
