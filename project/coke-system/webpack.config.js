const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  target: 'web',
  entry: './src/app.tsx',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '/',
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
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                path.resolve(__dirname, 'public/style/theme.css')
              ]
            }
          }
        ]
      },
      { 
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader', options: {
            lessOptions: {
              javascriptEnabled: true
            }
          } },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                path.resolve(__dirname, 'src/assets/style/theme.less'),
                path.resolve(__dirname, 'src/assets/style/init.less')
              ]
            }
          }
        ] 
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    historyApiFallback: true,
    compress: true,
    port: 5009,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://192.168.0.121:3002/', 
        changeOrigin: true,
        ws: true,
        secure: false
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new NodePolyfillPlugin()
  ]
}