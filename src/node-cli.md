
## first create a module
`touch /tmp/test.js`

```js
// test.js
console.log('hello,world!');
```

## fork and run previously created module
> child_process.fork(module[,args][,options]) 
> if you don't want to pass args, use an empty array or skip it; you can't use null;  if you pass `null` as args, then it's treated as `option` by child_process and your real options are ignored;

`/home/bochen2014 > node -r 'child_process' -e "child_process.fork('./test.js',{cwd: '/some/path' })"`
Error: Cannot find module '/some/path/test.js'
Takeway is that, the moudle passed to `fork` is relative to `cwd` pass in options;

`/home/bochen2014 > node -r 'child_process' -e "child_process.fork('./test.js',{cwd: '/tmp' })"`
hello,world

`/tmp > node -r 'child_process' -e "child_process.fork('./test.js',[0,1,2,'ipc'])"`
hello,world

## spawn
`/home/bochen2014 > node -r 'child_process' -e "child_process.spawn('node',['./test.js'],{ stdio:[0,1,2] , cwd: '/some/path' })"`
Error: Cannot find module '/some/path/test.js'
Takeway is that, the moudle passed to `fork` is relative to `cwd` pass in options;

`/home/bochen2014 > node -r 'child_process' -e "child_process.spawn('node',['./test.js'],{ stdio:[0,1,2], cwd: '/tmp'})"`
hello,world


# node print
`node -p '31/2'` , do math
`node -r 'path'  -p 'path.resolve()'`  : path.resolve === `realpath para`

# remove all files
`ls -A1 | xargs rm -rf`
-A : --almost-all , except '.' and '..'
-1 : single column, not joined by `$IFS`