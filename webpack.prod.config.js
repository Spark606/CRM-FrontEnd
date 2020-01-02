//webpack.prod.config.js
const common = require("./webpack.common.config");
const {resolve, join} = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
 
module.exports = merge(common, {   //合并两个webpack文件
  mode: "production",
  bail: true,
  performance: {
    hints:false
  }
});