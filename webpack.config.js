const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  optimization: {
    minimize: false
  },
  entry: {
    'background': './src/app.js',
    'options/options': './src/options/options.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Options Page',
      filename: 'options/options.html',
      template: './src/options/options.html',
      chunks: ['options/options'],
      minify: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets/icons',
          to: 'assets/icons'
        }
      ]
    })
  ],
}
