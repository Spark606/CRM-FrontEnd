//webpack.prod.config.js
const common = require("./webpack.common.config");
const merge = require("webpack-merge");

module.exports = merge(common, {   //合并两个webpack文件
  mode: "production",
  bail: true,
  performance: {
    hints: false
  }
});