const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
  entry: {
    'background': './src/app.js',
    'options/options': './src/options/options.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Options Page',
      filename: 'options/options.html',
      template: './src/options/options.html',
      chunks: ['options/options']
    }),
    new CopyWebpackPlugin([{
      from: './src/assets/icons',
      to: 'assets/icons'
    }])//,
    // new ImageminPlugin({
    //   test: /\.(jpe?g|png|gif|svg)$/i
    // })
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
