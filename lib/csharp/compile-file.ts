import { Options } from "../types";
import { getFileName } from "../source-writer";
import { getExecutableExt } from "../executable/executable-ext";
import { tmpPath, checkExistsAndMakeDir } from "../init";
import path from 'path';
import { execute } from "../execute-command";

/**
 * Compiles a Cpp source file and returns a promise that resolves with the path of the executable
 * @param filePath A path like string
 * @param options Optional options
 */
export async function compileCsharp(filePath: string, options?: Options): Promise<string> {
    let compileTimeout = options && options.compileTimeout || 3000;
    let executableExt = getExecutableExt();
    const compilationPath: string = options && options.compilationPath || 'csc';
    let csharpPath = path.join(tmpPath, 'cs');
    checkExistsAndMakeDir(csharpPath);
    let executableName = getFileName(executableExt);
    let executablePath = path.join(csharpPath, executableName);
    let res = await execute(compilationPath, ['/out:' + executablePath, filePath], { timeout: compileTimeout });
    if (res.exitCode !== 0) {
        res.errorType = 'compile-time';
        throw res;
    }
    return executablePath;
}