import * as webpack from "webpack";
import {Configuration} from 'webpack-dev-server';
import * as path from 'path';

import {HOT_RELOAD_PORT} from './constants';

import ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
import HtmlWebpackPlugin = require("html-webpack-plugin");


const config: webpack.Configuration = {
  mode: 'development',
  cache: true,
  devtool: 'inline-source-map',
  entry: {
    app: path.resolve(__dirname, 'src', 'index.js'),
  },
  module: {
    rules: [
      // {
      //   test: /\.ts?$/,
      //   exclude: /node_modules/,
      //   include: path.resolve(__dirname, 'src'),
      //   use: [
      //     {
      //       loader: 'ts-loader', options: {
      //         transpileOnly: true,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader', options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
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
              // modules: true,
            },
          },
          {
            loader: 'postcss-loader', options: {
              sourceMap: true,
              postcssOptions: {
                config: path.resolve(__dirname, 'postcss.config.js'),
              },
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: HOT_RELOAD_PORT,
  } as Configuration,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'mode development',
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        hotPort: HOT_RELOAD_PORT,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        HOT_RELOAD_PORT: 8080,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      // eslint: {
      //   files: './src/**/*.{ts,tsx,js,jsx}',
      // },
    }),
  ],
  watch: true,
};
export default config;

