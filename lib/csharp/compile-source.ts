import { writeSourceFile } from "../source-writer";
import { compileCsharp } from "./compile-file";
import { Options } from "../types";

/**
 * Compiles a Cpp source String And resolves with the path of the executable
 * @param sourceCode 
 * @param options 
 */
export async function compileCsharpSource(sourceCode: string, options?: Options): Promise<string> {
    let filePath = await writeSourceFile('cs', sourceCode);
    let executablePath = await compileCsharp(filePath, options);
    return executablePath;
}
