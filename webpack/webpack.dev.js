const path = require('path');
const webpack = require('webpack');
const { mergeWithCustomize } = require('webpack-merge');
const chalk = require('react-dev-utils/chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { DIST_PATH, SRC_PATH } = require('./paths');
const commonConfig = require('./webpack.common');
const devServer = require('./devServer');

const devConfig = {
  devtool: 'inline-source-map',

  entry: {
    app: [
      path.join(SRC_PATH, 'index.js')
    ]
  },

  plugins: [
    new ProgressBarPlugin({
      /* eslint-disable no-console */
      format: ` Avtion [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false,
      callback: () => {
        console.log(' \n 成功启动服务！！！😊😊😊');
        console.log(` \n Local:            ${chalk.green(`http://localhost:${devServer.port}/`)}`);
        console.log(` On Your Network:  ${chalk.green(`http://${devServer.ipAdress}:${devServer.port}/`)}`);
        console.log('\n\nNote that the development build is not optimized.');
        console.log(`To create a production build, use ${chalk.yellow('npm run build')}.`);
      }
      /* eslint-enable no-console */
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin()
  ],

  devServer: {
    contentBase: DIST_PATH,
    port: devServer.port,
    host: '0.0.0.0', // 可局域网访问
    open: false, // 自动打开浏览器
    compress: true, // 启用 gzip 压缩
    hot: true,
    historyApiFallback: true,
    clientLogLevel: 'silent', // 禁止浏览器控制台上输出热重载进度【这可能很繁琐】
    noInfo: true, // 控制台禁止显示诸如 Webpack 捆绑包信息之类的消息。错误和警告仍将显示。
    // quiet: true, // 除了初始启动信息外，什么都不会写入控制台。这也意味着来自 webpack 的错误或警告是不可见的。
    proxy: {
      // http://localhost:7001/api/getList => http://localhost:7001/getList
      '/api': {
        target: 'http://localhost:7001',
        pathRewrite: { '^/api': '' },
        changeOrigin: true // target 是域名的话，需要这个参数
      }
    }
  }
};

module.exports = mergeWithCustomize({
  customizeArray(a, b, key) {
    if (key === 'entry.app') { // entry.app 不合并，全替换
      return b;
    }
    return undefined;
  }
})(commonConfig, devConfig);
