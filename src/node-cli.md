
`touch ./test.js`

```js
// test.js
console.log('hello,world!');
```

## fork
`node -r 'child_process' -e "child_process.fork('./test.js')"`

`node -r 'child_process' -e "child_process.fork('./test.js',[0,1,2,'ipc'])"`
hello,world

## spawn
`node -r 'child_process' -e "child_process.spawn('node',['./test.js'],{ stdio:[0,1,2]})"`
hello,world


# node print
`node -p '31/2'` , do math
`node -r 'path'  -p 'path.resolve()'`  : path.resolve === `realpath para`

# remove all files
`ls -A1 | xargs rm -rf`
-A : --almost-all , except '.' and '..'
-1 : single column, not joined by `$IFS`