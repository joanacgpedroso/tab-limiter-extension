const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    background: './src/app.js',
    options: './src/options/options.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|dist)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          },
          {
            loader: 'standard-loader',
            options:
            {
              error: true
            }
          }
        ]
      }
    ]
  }
}
