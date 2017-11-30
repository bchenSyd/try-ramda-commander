this is what `npm install` will do;
create a `ln -s ` in `node_modules/.bin` folder, linking to `your-pakcage/bin` folder, which in turn will call `your-pakcage/lib` folder
this the *exact* structure that npm is expecting from package developers