const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  target: 'web',
  entry: './src/app.tsx',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css", ".less"],
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
      { test: /\.less$/, use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'less-loader', options: {
          lessOptions: {
            javascriptEnabled: true
          }
        } }
      ] }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}