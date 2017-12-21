https://www.npmjs.com/package/try-ramda

## `npm publish -f` not allowed anymore
> https://github.com/npm/npm-registry-couchapp/issues/148#issue-27410798

"With this change, if you publish foo@1.2.3, you can still un-publish foo@1.2.3. But then, you will not be able to publish something else to that same package identifier. Not now, not never. Deleting documents entirely will be forbidden (though of course old revs still get compacted out) and we'll have a lot more visibility into what each change in the db does.

I wouldn't characterize it as a security fix, per se, but it does reduce a significant gotcha that users have run into over the years, which is especially annoying when deploying Node servers to production. If the bits are gone, ok, it's an error, you notice and deal with it. But if the bits are changed, then this can be really hazardous."

## peer dependencies
> https://github.com/npm/npm/releases/tag/v3.0.0
starting from `npm 3`, `peerDependencies` are not automaticlaly installed by `npm install`, but instead, `npm` generated warnings. Here is more details:

* #6930 (#6565) peerDependencies no longer cause anything to be implicitly installed. Instead, npm will now warn if a packages peerDependencies are missing, but it's up to the consumer of the module (i.e. you) to ensure the peers get installed / are included in package.json as direct dependencies or devDependencies of your package.
* #3803 npm also no longer checks peerDependencies until after it has fully resolved the tree.

Here is an example when installing `try-ramda`, which has declared `peerDependencies:{ "ramda": "^0.25.0"}`
```bash
/media/bochen2014/Work/tmp/try-ramda-consumer$ npm install try-ramda
npm WARN try-ramda@1.0.1 requires a peer of ramda@^0.25.0 but none is installed. You must install peer dependencies yourself.
npm WARN try-ramda-consumer@1.0.0 No description
npm WARN try-ramda-consumer@1.0.0 No repository field.

+ try-ramda@1.0.1
added 2 packages in 5.911s
```

## git+https://github.com/bochen2014/try-ramda-commander.git
this won't give you what you want as it simply include the source code to consumer project;
`npm publish` won't be run

```bash
# this won't work. this will install source code; not published version of try-ramda
$ yarn add --dev git+https://github.com/bochen2014/try-ramda-commander.git
```

-------------------------------
# archive (v1)
## how does `commander` workds

```bash
"build": "babel src --out-dir node_modules/try-ramda/lib   --source-maps",
"postbuild":"cd node_modules/.bin && ln -s ../try-ramda/bin/try-ramda try-ramda",
"remove": "rm node_modules/.bin/try-ramda",
"debug": "node --inspect-brk node_modules/try-ramda/bin/try-ramda  start"


/media/bochen2014/Work/__work/try-ramda/node_modules/.bin (master *)$ ls -l
total 7
lrwxrwxrwx 1 bochen2014 bochen2014 58 Nov 30 23:30 babel -> ../babel-cli/bin/babel.js
lrwxrwxrwx 1 bochen2014 bochen2014 60 Dec  1 00:04 try-ramda -> ../try-ramda/bin/try-ramda
```
## source code
* how does `yarn try-ramda start ` trigger `try-ramda-start`? where is the link established?

```javascript
Command.prototype.parse = function(argv) {
  debugger;
  // try-ramda start ==> try-ramda-start
  if (this.executables && argv.length < 3 && !this.defaultExecutable) {
    // default to --help (i.e. when no args provided, defualt to --help)
    argv.push('--help');
  }

    // executable sub-commands
  var name = result.args[0]; // this will return you 'start'
  if (this._execs[name] && typeof this._execs[name] != "function") {
    return this.executeSubCommand(argv, args, parsed.unknown);
  }
}

Command.prototype.command = function(name, desc, opts) {
    //***************************************************************
    debugger;
    if (desc) {
        cmd.description(desc);

        this.executables = true;

        this._execs[cmd._name] = true;
        if (opts.isDefault) this.defaultExecutable = cmd._name;
    }
    //***************************************************************
}

Command.prototype.executeSubCommand = function(argv, args, unknown) {
    if (process.platform !== 'win32') {
        if (isExplicitJS) {
        args.unshift(bin);
        // add executable arguments to spawn
        args = (process.execArgv || []).concat(args);

        proc = spawn(process.argv[0], args, { stdio: 'inherit', customFds: [0, 1, 2] });
        } else {
        proc = spawn(bin, args, { stdio: 'inherit', customFds: [0, 1, 2] });
        }
    } else {
        args.unshift(bin);
        proc = spawn(process.execPath, args, { stdio: 'inherit'});
    }
}
```