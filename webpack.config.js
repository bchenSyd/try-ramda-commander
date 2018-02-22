/* eslint-disable */
let path = require('path');
let webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// corss-env NODE_ENV=production webpack --progress
// DO NOT PUT A & IN BETWEEN
const env = process.env.NODE_ENV;
// make sure you use JSON.stringify to make sure env become a string. user can set NODE_ENV=production
// without quotation marks
console.log(`********** webpack env=${JSON.stringify(env)} *********`);

let config = {
  devtool: env === 'production' ? '' : 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true
  },
  entry: './src/index.js',
  output: {
    path: path.resolve('./lib'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env),
      },
    }),
  ],
  module: {
    rules: [ // "style-loader!css-loader!less-loader" can only be used with module.loaders;
      {
        test: /\.jsx?/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader",
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                    browsers: ['last 2 versions']
                  })
                ]
              }
            },
            "less-loader"]
        })
      }
    ]
  },
};


if (env === 'production') {
  config.plugins.push(new UglifyJSPlugin());
} else {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}
module.exports = config;

