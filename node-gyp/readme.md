`npm install firbers --verbose 2>&1 | tee log.txt`

key difference between first time and second time is `~/.node-gyp`
> https://github.com/nodejs/node-gyp/issues/809#issuecomment-155019383


npm verb lifecycle fibers@2.0.2~install: PATH:
/usr/local/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:
/opt/tmp/node_modules/fibers/node_modules/.bin:
/opt/tmp/node_modules/.bin:
/usr/local/sbin:
/usr/local/bin:
/usr/sbin:
/usr/bin:
/sbin:
/bin:
/usr/local/lib/node_modules/npm/bin


## about /usr/local/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin/node-gyp
```shell
#!/usr/bin/env sh
if [ "x$npm_config_node_gyp" = "x" ]; then
  node "`dirname "$0"`/../../node_modules/node-gyp/bin/node-gyp.js" "$@"
else
  "$npm_config_node_gyp" "$@"
fi
```

## about /usr/lib/node_modules/npm/node_modules/node-gyp

```js
// Entry: bin/node-gyp.js
var gyp = require('../')

```
there is no index.js in ../ (home folder)
so npm check `package.json`

```json
  "main": "./lib/node-gyp.js",
  "name": "node-gyp",
```
so `./lib/node-gyp.js` is the real definition file of `node-gyp`

## override node-headers download url
1. `docker run --rm -it -e "npm_config_disturl=http://a.com/b.tgz" node bash`
2. `npm config get disturl`
    http://a.com/b.tgz
3. `npm install --verbose fibers`
Error:
```
gyp http GET http://a.com/b.tgz/v9.8.0/node-v9.8.0-headers.tar.gz
gyp WARN install got an error, rolling back install
gyp ERR! configure error 
gyp ERR! stack Error: This is most likely not a problem with node-gyp or the package itself and
gyp ERR! stack is related to network connectivity. In most cases you are behind a proxy or have bad 
gyp ERR! stack network settings.
gyp ERR! stack     at Request.<anonymous> (/usr/local/lib/node_modules/npm/node_modules/node-gyp/lib/install.js:193:21)
```

