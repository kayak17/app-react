const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (_, { mode }) => ({
  entry: {
    "index": "./src/index.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](bootstrap|react|react-dom|react-router)[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  devtool: mode === "production" ? false : "inline-source-map",
  plugins: [
    new HTMLWebpackPlugin({
      favicon: "src/styles/favicon.ico",
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/styles/img", to: "img/" },
      ],
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          mode === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              url: false,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/i,
        use: [
          mode === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              url: false,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              ["@babel/transform-runtime"]
            ],
            presets: [
              ["@babel/preset-react", {
                "runtime": "automatic"
              }],
              "@babel/preset-env",
            ],
          },
        },
      },
    ]
  },
  devServer: {
    port: 1337,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
    fallback: {
      "querystring": require.resolve("querystring/"),
      "url": require.resolve("url/"),
    },
  },
});
