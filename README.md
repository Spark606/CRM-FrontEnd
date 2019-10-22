# npm init -y
# npm i -D webpack webpack-cli webpack-dev-server
webpack输出真实的文件，而webpack-dev-server输出的文件只存在于内存中,不输出真实的文件！
# npm i -D autoprefixer style-loader css-loader sass node-sass sass-loader postcss-loader html-loader html-webpack-plugin uglifyjs-webpack-plugin mini-css-extract-plugin webpack-merge babel-plugin-import
# npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime
# npm i react react-dom react-router-dom redux-thunk react-redux redux
# npm i normalizr nprogress

# 创建webpack.config.js
```
//webpack.config.js
const common = require("./webpack.common.config");
const merge = require("webpack-merge");
module.exports = merge(common, {
  devtool: "none",
  mode:"production"
});
```
# 创建webpack.common.config.js
```
//webpack.common.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = {
  src: path.resolve(__dirname, "src"),
  dist: path.resolve(__dirname, "dist"),
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
    path: paths.dist,
    chunkFilename: evn === EVN.dev ? "[name].[hash].js" : "[name].js",
    filename: evn === EVN.dev ? "[name].[hash].js" : "[name].js",
  },
  module: {
    rules: [
      {
        //处理jsx,js
        test: /\.(jsx?)$/,
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
      filename: evn === EVN.dev ? "[name].[hash].css" : "[name].css",
      chunkFilename: evn === EVN.dev ? "[id].[hash].css" : "[id].css"
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      'react-native': 'react-native-web'
    }
  }
};
```
# 创建webpack.dev.config.js
```
//webpack.dev.config.js
const common = require("./webpack.common.config");
const {resolve, join} = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
 
module.exports = merge(common, {   //合并两个webpack文件
  devServer: {
    port: 8000,
    contentBase: join(__dirname, "dist"),
    compress: true,  // 对所有的服务器资源采用gzip压缩
    hot: true,                     //模块热加载
    inline: true,
    open: 'Chrome',                //构建完成时自动打开浏览器
    openPage: "",
    stats: "errors-only" // 只打印错误
  },
  devtool: "inline-source-map",      //方便调试，将src目录下的资源映射到浏览器中
  mode: "development",
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //使用模块热加载插件
  ]
});
```
# 修改package.json脚本
```
{
  ···
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node_modules/.bin/webpack",
    "dev": "node_modules/.bin/webpack-dev-server  --config ./webpack.dev.config.js --process  --color --mode development"
  },
  ···
}

```
#  创建.babelrc
```
{
  "presets": [
      "@babel/preset-env",
      "@babel/react"
  ],
  "plugins": ["@babel/transform-runtime", ["@babel/plugin-proposal-decorators", {"legacy": true}], "@babel/plugin-proposal-class-properties"]
}
```
# 创建postcss.config.js
```
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```