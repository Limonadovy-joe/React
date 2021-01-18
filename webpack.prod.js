import webpack from 'webpack';
import path from 'path';
// import {DIST_DIR, SRC_DIR} from './constants';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

module.exports = {
  mode: 'production',
  cache: false,
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
        loader: 'ts-loader',
        include: path.resolve(__dirname, 'src'),
        options: {
          //dis type checker -> it will be used in fork plugin
          transpileOnly: true,
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader', options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        exclude: /node_modules/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader', options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
          {
            loader: 'sass-loader', options: {},
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default', {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        },
      }),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'App - mode production',
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[name]-[chunkhash].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};


