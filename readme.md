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

```javascript
    Command.prototype.command = function(name, desc, opts) {
    if(typeof desc === 'object' && desc !== null){
        opts = desc;
        desc = null;
    }
    opts = opts || {};
    var args = name.split(/ +/);
    var cmd = new Command(args.shift());
    //***************************************************************
    debugger;
    if (desc) {
        cmd.description(desc);

        this.executables = true;

        this._execs[cmd._name] = true;
        if (opts.isDefault) this.defaultExecutable = cmd._name;
    }
    //***************************************************************
    cmd._noHelp = !!opts.noHelp;
    this.commands.push(cmd);
    cmd.parseExpectedArgs(args);
    cmd.parent = this;

    if (desc) return this;
    return cmd;
    };



Command.prototype.parse = function(argv) {
  debugger;
  // try-ramda ARG ==> try-ramda-ARG 
  if (this.executables && argv.length < 3 && !this.defaultExecutable) {
    // default to --help (i.e. when no args provided, defualt to --help)
    argv.push('--help');
  }

    // executable sub-commands
  var name = result.args[0];
  if (this._execs[name] && typeof this._execs[name] != "function") {
    return this.executeSubCommand(argv, args, parsed.unknown);
  }
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