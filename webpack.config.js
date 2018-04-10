const path = require('path')

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    background: './src/app.js',
    settings: './src/settings/settings.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
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
