// Import
import { zzDOM } from '/src/zzDOM-closures-full.js';
import { runTests as runSimpleTests } from '../components/simple.js';
import { runTests as runCenterTests } from '../components/simple.center.js';
import { runTests as runEventsTests } from '../components/simple.events.js';
import { runTests as runFormsTests } from '../components/simple.forms.js';
import { runTests as runVisibleTests } from '../components/simple.visible.js';

runSimpleTests( zzDOM );
runCenterTests( zzDOM );
runEventsTests( zzDOM );
runFormsTests( zzDOM );
runVisibleTests( zzDOM );
