In short, they are different things. 
* commander is for design new command from scrach, like `try-ramda` or `bisheng`
* yargs  is for existing command extract args. used with `gulp` for example



## how is try-ramda look like after being installed?

```bash
/media/bochen2014/Work/__work/client-app/node_modules/.bin (master *)$ ls -l
total 7
# points to node_moduels/babel-cli/bin/babel.js
lrwxrwxrwx 1 bochen2014 bochen2014 58 Nov 30 23:30 babel-node -> ../babel-cli/bin/babel.js
# points t node_modules/try-ramda/bin/try-ramda
lrwxrwxrwx 1 bochen2014 bochen2014 60 Dec  1 00:04 try-ramda -> ../try-ramda/bin/try-ramda
```



#  how does `yarn try-ramda(.js)  start ` trigger `try-ramda-start(.js)`?

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