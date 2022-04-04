const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Sno & Co.',
        filename: './index.html', //output filename
        template: './src/index.html',
      }),
  ],
  watchOptions: {
    //   aggregateTimeout: 500,
      ignored: /node_modules/,
  },
};