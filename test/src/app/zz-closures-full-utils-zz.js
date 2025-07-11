// Import
import { zzDOM } from '/src/zzDOM-closures-full.js';
import { runTests as runZZTests } from '../components/zz.js';
import { runTests as runUtilsTests } from '../components/zz.utils.js';

runZZTests( zzDOM );
runUtilsTests( zzDOM );
