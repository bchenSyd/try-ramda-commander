## install via git repo
this won't give you what you want as it simply include the source code to consumer project;
`npm publish` won't be run

```bash
# this won't work. this will install source code; not published version of try-ramda
$ yarn add --dev git+https://github.com/bochen2014/try-ramda-commander.git
```

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

