const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "src/js/index.js")
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(svg|png|jpe?g|gif|eot|woff|woff2|ttf|json)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/assets/medias/*", to: "assets/medias/[name][ext]" },
        { from: "./src/assets/icons/*", to: "assets/icons/[name][ext]" },
        { from: "./src/assets/logo/*", to: "assets/logo/[name][ext]" },
        { from: "./src/data/*", to: "data/[name][ext]" }
      ]
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "./src/html/index.html")
    }),
    new HtmlWebpackPlugin({
      filename: "photographer.html",
      template: path.join(__dirname, "./src/html/photographer.html")
    })
  ],
  stats: "minimal",
  devtool: "source-map",
  mode: "development",
  devServer: {
    open: false,
    contentBase: "./public",
    inline: true,
    port: 4000
  }
};
