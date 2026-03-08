# NotSoBot-TagScript-Include

Add the {include} command in TagScript to handle big projects, and have the project through multiple files.
{include} works as #include in C, but with single files instead of header files, replacing the content of a file, this compiler will scan the code for {include}
commands, and clone the code into a big file.

## Syntaxes

### {include:FILE}
FILE: A file.

## Install the CLI

You may install it by NPM
```
npm install notsobot-tagscript-include
```

## Use the CLI
```
npx nsb-i <file> [option]
```

To keep it simple, you can only use one option at a time.
Not adding an option will show a preview of the transpiled code But it will not write it in any file.

    -o <outputFile>
        Writes the transpiled code in the file specified in <outputFile>
    -O
        Overwrite the original file, use this option with caution, is recommended to use -o <outputFile> to prevent this.
    -p <directory>
        Writes the transpiled code with the same name as the main file, but in a different directory, if there isn't, a new directory will be created.
    -P
        Writes the transpiled code with the same name but inside an out/ directory, if there isn't, a new directory will be created.
    --help
        Shows the help list.
### Writing in a file

```
npx nsb-i <file> -o <outputFile>
```
<file>: The file to transpile
<outputFile>: The output file
If the output file is inside a directory, make sure the directory exists.

### Overwritting a file

```
npx nsb-i <file> -O
```
<file>: The file to transpile
**Warning**: This overwrites the current file, use -o <outputFile> if you don't want to overwrite the file.
If the output file is inside a directory, make sure the directory exists.

### Writing in a directory

```
npx nsb-i <file> -p <directory>
```
<file>: The file to transpile
<directory>: The target directory
This will keep the name of the original file, very recommended.
If the directory doesn't exist, a new directory will be created.

```
npx nsb-i <file> -P
```
<file>: The file to transpile
Does the same as -p but in an `out` directory.
If the directory doesn't exist, a new directory will be created.

### Preview

```
npx nsb-i <file>
```
<file>: The file to transpile
Not adding any option will show a preview of the file transpiled, if you don't want to write a new file,

## Examples

There is an example of a program with dependences in the directory example/

```
npx nsb-i main.nsb
```
```
npx nsb-i main.nsb -o out.nsb
```
```
npx nsb-i lib.nsb -p dist
```
```
npx nsb-i lib.nsb -P
```