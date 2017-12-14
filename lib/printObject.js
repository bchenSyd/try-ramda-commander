'use strict';

function ProgressPlugin() {}
function HtmlWebpackPlugin(options) {
    this.options = options;
}
function DefinePlugin(definitions) {
    this.definitions = definitions;
}
var config = {
    entry: 'src/index.js',
    module: {
        rules: [{
            test: /\.css/,
            use: ['style-loader', 'css-loader']
        }, {
            "test": "/\\.(png|jpe?g|svg|woff2?|ttf|eot)$/",
            "loader": "url-loader?limit=8000"
        }]
    },
    plugins: [new ProgressPlugin(), new HtmlWebpackPlugin({
        "template": "/media/bochen2014/Work/__work/arc/public/index.html",
        "filename": "index.html",
        "hash": false,
        "inject": true
    }), new DefinePlugin({
        "process.env.NODE_ENV": "\"development\"",
        "process.env.PUBLIC_PATH": "\"\""
    })],
    resolve: {
        exensions: ['.js', 'jsx', 'json']
    }

    /* eslint-disable */
};function printFile(fileName, value) {
    var path = require('path');
    var fs = require('fs');
    var util = require('util');
    // issue: JSON.stringify(/\.css/) print an empty object
    // https://stackoverflow.com/a/12075970
    // because there's no canonical representation for a RegExp object in JSON. Thus, it's just an empty object.


    // solution 1: use util.inspect
    //const result=util.inspect(config, { showHidden: false, depth: null });

    // solution 2: 
    RegExp.prototype.toJSON = RegExp.prototype.toString;
    value.plugins.forEach(function (p) {
        p.__type = p.constructor.name;
    });
    fs.writeFile(path.join(__dirname, fileName), JSON.stringify(value), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file " + fileName + "  has been saved!");
    });
}

printFile('webpack.config.json', config);
/* eslint-enable */