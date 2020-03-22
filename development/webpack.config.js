const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const RemovePlugin = require('remove-files-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  devtool: 'none',
  entry: {
    'background': './src/app.js',
    'options/options': './src/options/options.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new RemovePlugin({
      before: {
        include: [
          './dist'
        ]
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Options Page',
      filename: 'options/options.html',
      template: './src/options/options.html',
      chunks: ['options/options']
    }),
    new CopyWebpackPlugin([{
      from: './src/assets/icons',
      to: 'assets/icons'
    }])
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
              presets: ['@babel/preset-env'],
              plugins: ["@babel/transform-runtime"]
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
