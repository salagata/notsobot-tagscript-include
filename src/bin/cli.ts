#!/usr/bin/env node

import { parse } from "../parse";
import { writeFile, mkdir } from "fs/promises";
import { resolve, basename } from "path";
import process from "process";

async function main() {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        console.log("Usage: npx nsb-i <file> [option]");
        console.log("Not adding an option will show a preview of the transpiled code But it will not write it in any file.");
        console.log("use -O to overwrite the current file (Hard)");
        console.log("use -o <outputFile> to write into a different file (Soft)");
        console.log("use --help to see the avaiable options");
        return;
    }

    if (args[0] === "--help") {
        console.log("Avaiable options:");
        console.log("You can apply only one option at a time");
        console.log("\t-o <outputFile>");
        console.log("\t\tWrites the transpiled code in the file specified in <outputFile>");
        console.log("\t-O");
        console.log("\t\tOverwrite the original file, use this option with caution, is recommended to use -o <outputFile> to prevent this.");
        console.log("\t-p <directory>");
        console.log("\t\tWrites the transpiled code with the same name as the main file, but in a different directory, if there isn't, a new directory will be created.");
        console.log("\t-P");
        console.log("\t\tWrites the transpiled code with the same name but inside an out/ directory, if there isn't, a new directory will be created.");
        console.log("\t--help");
        console.log("\t\tShows this list.");
        return;
    }

    const thisFile = args[0];
    const thisFileName = basename(thisFile);

    try {
        const { text } = await parse(`{include:${thisFile}}`);

        const opt = args[1];
        if (opt === "-o") {
            if (args.length < 3) throw new Error("One file must be specified.");
            const outputFile = args[2];
            await writeFile(outputFile, text);
        } else if (opt === "-O") {
            await writeFile(thisFile, text);
        } else if (opt === "-p") {
            if (args.length < 3) throw new Error("One directory must be specified.");
            const directory = args[2];
            await mkdir(directory, { recursive: true });          // ← crea el directorio
            const outputFile = resolve(directory, thisFileName);
            await writeFile(outputFile, text);
        } else if (opt === "-P") {
            const directory = "out";
            await mkdir(directory, { recursive: true });          // ← idem
            const outputFile = resolve(directory, thisFileName);
            await writeFile(outputFile, text);
        } else {
            if (opt) {
                console.warn(`${opt} is not a valid option, use --help to see the list of valid options`);
            }
            console.log(text);
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();