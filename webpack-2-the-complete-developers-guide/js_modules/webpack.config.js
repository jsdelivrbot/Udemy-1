const path = require('path');
// ExtractTextPlugin takes a reference to a loader...
// It runs webpack with it and any text generated by that loader, and saves it into a seperate file in our output directory
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  // entry filepath is relative
  entry: './src/index.js',
  output: {
    // output file path must be absolute
    // path.resolve() creates a filepath suitable for OSX / Windows / Linux
    // Webpack will create /build directory for you
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    // specifies the public path
    // Used by any loader that produces a direct file path reference to a file in our output directory (eg: url-loader)
    publicPath: 'build/'
  },
  // module holds all the rules
  module: {
    // rules is an array of objects for all the loaders you want to use
    // a rule and a loader seem mean the same thing (use interchangeably)
    rules: [
      {
        test: /\.js$/, // test expects a regex, this one looks for js files in every file we've imported into project
        use: 'babel-loader' // babel-loader is the thing that connects babel to webpack
        // babel-loader will user .babelrc to lookup the preset rules it should run on js files
      },
      {
        test: /\.css$/,
        // you can use mulitple loaders with an array
        // Important! They are run right->left (eg: 1. css-loader 2. style-loader)
        // css-loader knows how to deal with CSS imports
        // style-loader takes CSS imports and adds them to HTML document in a <style> tag
        //use: ['style-loader', 'css-loader']

        // 'loader' is more legacy version of 'use', however ExtractTextPlugin needs 'loader'
        // Plugins are bit different to regular loaders, they have ability to keep files from ending up in bundle.js
        loader: ExtractTextPlugin.extract({
          // Grabs any text generated by css-loader
          loader: 'css-loader'
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          // remember loaders are run from end to beginning of array
          // object instead of string for additional options
          {
            loader: 'url-loader',
            options: { limit: 40000 }
            // if image is less than 40,000 bytes, include it into bundle.js
            // Otherwise, save it as a seperate file
          },
          'image-webpack-loader' // image-webpack-loader compresses file size of image
        ]
      }
    ]
  },
  plugins: [
    // This tells the ExtractTextPlugin library to find any files that were transformed earlier by it loader, and saved into a new file style.css
    new ExtractTextPlugin('style.css')
  ]
};

module.exports = config;
