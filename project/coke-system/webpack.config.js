const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
console.log('getdirname',__dirname)
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
    publicPath: '/public/',
    historyApiFallback: true,
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