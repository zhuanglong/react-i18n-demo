const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const chalk = require('react-dev-utils/chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const commonConfig = require('./webpack.common');

const prodConfig = {
  devtool: false, // 'source-map'

  plugins: [
    new ProgressBarPlugin({
      format: `  build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ],

  optimization: {
    // 压缩 js
    // mode 为 'production' 会默认开启压缩，这里无需重复配置
    // minimize: true,

    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          compress: {
            drop_debugger: true, // 删除 debugger
            drop_console: true // 删除 console
          }
        }
      }),
      // 压缩 css
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};

module.exports = merge(commonConfig, prodConfig);
