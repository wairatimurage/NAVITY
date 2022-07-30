const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const env = require("dotenv").config({
  path: path.join(__dirname, ".env"),
}).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: "./src/index.js",
  devtool: false,
  // historyApiFallback: true,
  output: {
    path: path.join(__dirname, "./build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: {
          loader: "file-loader",
          options: { name: "static/images/[name].[ext]" },
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000,
    // stats: { errorDetails: true },
    // contentBase: path.join(__dirname, "../dist/shop"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      // filename: "shop.html",
    }),
    new DefinePlugin(envKeys),
  ],
};
