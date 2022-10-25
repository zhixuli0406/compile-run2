import './lib/init';
import c from './lib/c';
import cpp from './lib/cpp';
import csharp from './lib/csharp';
import python from './lib/python';
import node from './lib/node';
import java from './lib/java';
import { errorResultCallback, Options, LanguageExtMap, LanguageNames, Result } from './lib/types';

const compileRun = { c, cpp, csharp, python, node, java };
export { c, cpp, csharp, python, node, java, errorResultCallback, Options, LanguageExtMap, LanguageNames, Result };
export default compileRun;