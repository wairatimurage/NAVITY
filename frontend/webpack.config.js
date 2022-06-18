const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const json = require("./public/manifest.json");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",

  // historyApiFallback: true,
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|gif|png)/,
        use: {
          loader: "file-loader",
          options: {
            name: "static/images/[name].[ext]",
          },
        },
      },
      // {
      //   test: /\.json$/,
      //   exclude: [/node_modules/, /package.json/, /package-lock.json/],
      //   loader: "file-loader",
      //   // options: "",
      // },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
