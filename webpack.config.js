// const isDev = process.env.NODE_ENV === 'development';
const path = require('path')
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  entry: ['babel-polyfill', './app/src/index.js'],
  output: {
    path: __dirname,
    filename: './app/public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env', 'stage-2'] // if you aren't using 'babel-preset-env', then omit the 'env'
        }
      },
      { test: /\.node$/, loader: 'node-loader' },
      {
        test: /\.css$/, // use the style-loader/css-loader combos for anything matching the .css extension
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // "file" loader for svg
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'file-loader',
        query: {
          name: 'static/[name].[hash:8].[ext]'
        }
      }
    ]
  }
};
