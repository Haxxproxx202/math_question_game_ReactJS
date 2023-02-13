const path = require("path");

module.exports = {
  entry: `./game/js/app.js`,
  output: {
    filename: "out.js",
    path: path.resolve(__dirname, 'game/build')
  },
  devServer: {
    contentBase: path.join(__dirname, 'game'),
    publicPath: "/build/",
    compress: true,
    port: 3001,
    historyApiFallback: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
