const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack"); //to access built-in plugins

module.exports = {
  entry: {
    test: path.resolve(__dirname, "src", "test.js"), // === "/src/test.js"
    vendor: path.resolve(__dirname, "src", "vendor.js"),
    app: path.resolve(__dirname, "src", "index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // { loader: "style-loader" },
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
    }),
  ],
};
