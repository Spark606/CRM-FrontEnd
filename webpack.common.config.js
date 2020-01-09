//webpack.common.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const paths = {
  src: path.resolve(__dirname, "src"),
  build: path.resolve(__dirname, "build"),
};
 
const evn = process.argv.pop();//获取当前的环境，生产或开发
const EVN = {
  pro: "production",
  dev: "development"
};
module.exports = {
  entry: [
    path.join(paths.src, "index.html"),
    // "@babel/polyfill",
    path.join(paths.src, "index.js"),
  ],
  output: {
    path: paths.build,
    chunkFilename:"[name].[hash].js",
    filename:"[name].[hash].js",
    // publicPath: "http://192.168.205.221:8000"// 服务器地址
  },
  module: {
    rules: [
      {
        //处理jsx,js
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: evn === EVN.dev,
            sourceMap: evn === EVN.dev,
          },
        }
      },
      {
        ///处理html
        test: /\.html?/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "html-loader",
          options: {
            minimize: evn === EVN.dev,  //压缩html代码
            sourceMap: evn === EVN.dev  //生产环境可以不用资源映射
          }
        }
      },
      {// 规则数组
        test: /\.css|scss|less$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.jpge|jpg|png|svg$/,
        // loader: ['file-loader', 'image-webpack-loader'],
        loader: 'file-loader',
        query: {
          name: './[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.src, "index.html"),
      filename: "index.html",
      title: "react"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new UglifyJsPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      'react-native': 'react-native-web'
    }
  }
};