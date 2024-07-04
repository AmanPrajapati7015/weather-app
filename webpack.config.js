const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
} );

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    watchFiles: ['src/styles.css','src/index.html', 'public/**/*'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template:"./src/index.html",
      inject:'body',
    }),
    new webpack.DefinePlugin( {
      "process.env": dotenv.parsed
    }),
    new CopyPlugin({
      patterns: [
          { 
            from: "src/assets", 
            to: "assets" 
          }
      ],
  }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      ],
    },
};