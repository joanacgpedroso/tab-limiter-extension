const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  optimization: {
    minimize: false
  },
  entry: {
    'background': './src/app.js',
    'options/options': './src/options/options.js',
    'options/styles': './src/options/styles.scss'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
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
      patterns: [{
        from: './src/assets/icons',
        to: 'assets/icons'
      }]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
}
