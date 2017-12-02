const data = {
    entry: 'src/index.js',
    module: {
        use: [{
            loader: 'style-loader',
            test: /\.css/
        }]
    }
}


function printFile(fileName, value) {
    var path = require('path')
    var fs = require('fs');
    //Yes, because there's no canonical representation for a RegExp object in JSON. Thus, it's just an empty object.
    RegExp.prototype.toJSON = RegExp.prototype.toString;
    fs.writeFile(path.join(__dirname, fileName), JSON.stringify(value), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file " + fileName + "  has been saved!");
    });
}

printFile('webpack.config.json', data)