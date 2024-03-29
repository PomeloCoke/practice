const path = require('path')
const webpack = require('webpack')

module.exports = {
  target: 'node',
  entry: './src/index.ts',
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/, /lib/],
        use: [
          { loader: "ts-loader" }
        ]
      },
      {
        test: /\.js$/, enforce: "pre", loader: "source-map-loader"
      },
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    historyApiFallback: true,
    compress: true,
    port: 3000,
    hot: true
  },
  optimization: {
      minimize: false
  }
}