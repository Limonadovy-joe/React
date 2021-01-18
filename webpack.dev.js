// import webpack from 'webpack';
// import path from 'path';
const webpack = require('webpack');
const path = require('path');
// import {HOT_RELOAD_PORT} from './constants';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

module.exports = {
  mode: 'development',
  cache: true,
  devtool: 'inline-source-map',
  entry: {
    app: path.resolve(__dirname, 'src', 'index.js'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.jsx', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'ts-loader', options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader', options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'],
            },
          },
        ],
      },
      { //only CSS modules + typescript types
        test: /\.css$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src/styles'),
        use: [
          'style-loader', 'css-loader', {
            loader: 'typings-for-css-modules-loader', options: {
              importLoaders: 1,
              modules: true,
              namedExport: true,
            },
          }],
      },
      {
        test: /\.(sa|sc)ss$/,
        exclude: /node_modules/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
              modules: true,
            },
          },
          {
            loader: 'postcss-loader', options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader', options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 8080,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React App - mode development',
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        hotPort: 8080,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      // eslint: {
      //   files: './src/**/*.{ts,tsx,js,jsx}',
      // },
    }),
  ],
};


