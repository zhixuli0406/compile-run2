import { Result, Options, errorResultCallback } from "../types";
import { multipleArgsCallbackifier } from "../helper";
import { compileCsharp } from "./compile-file";
import { runExecutable } from "../executable/execute-executable";

/**
 * Runs a Csharp file on a given path and 
 * @param filePath A path like string
 * @param options
 * @param callback
 */
export function runCsharpFile(filePath: string, options: Options, callback: errorResultCallback): Promise<Result>;

/**
 * Runs a Csharp file on a given path and 
 * @param filePath A path like string
 * @param callback
 */
export function runCsharpFile(filePath: string, callback: errorResultCallback): Promise<Result>;

/**
 * Runs a Csharp file on a given path and 
 * @param filePath A path like string
 * @param options
 */
export function runCsharpFile(filePath: string, options?: Options): Promise<Result>;

export async function runCsharpFile(filePath: string, ...args: any[]): Promise<Result> {
    return multipleArgsCallbackifier<Result>(filePath, runCsharpFileAndReturnPromise, ...args);
}

export async function runCsharpFileAndReturnPromise(filePath: string, options?: Options): Promise<Result> {
    try {
        let executablePath = await compileCsharp(filePath, options);
        return runExecutable(executablePath, options);
    }
    catch (err) {
        return err;
    }
}