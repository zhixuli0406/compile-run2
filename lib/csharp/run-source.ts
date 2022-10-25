import { Result, Options, errorResultCallback } from "../types";
import { multipleArgsCallbackifier } from "../helper";
import { compileCsharpSource } from "./compile-source";
import { runExecutable } from "../executable/execute-executable";

/**
 * Runs a Csharp source code provided as string
 * @param sourceCode source string to be executed
 * @param options
 * @param callback
 */
export function runCsharpSource(sourceCode: string, options: Options, callback: errorResultCallback): Promise<Result>;

/**
 * Runs a C source code provided as string
 * @param sourceCode source string to be executed
 * @param callback
 */
export function runCsharpSource(sourceCode: string, callback: errorResultCallback): Promise<Result>;

/**
 * Runs a C source code provided as string
 * @param sourceCode source string to be executed
 * @param options
 */
export function runCsharpSource(sourceCode: string, options?: Options): Promise<Result>;

export async function runCsharpSource(sourceCode: string, ...args: any[]): Promise<Result> {
    return multipleArgsCallbackifier<Result>(sourceCode, runCsharpSourceAndReturnPromise, ...args);
}

export async function runCsharpSourceAndReturnPromise(sourceCode: string, options?: Options): Promise<Result> {
    try {
        let executablePath = await compileCsharpSource(sourceCode, options);
        return runExecutable(executablePath, options);
    }
    catch (err) {
        return err;
    }
}