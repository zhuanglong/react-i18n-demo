const path = require('path');
const webpack = require('webpack');
const { mergeWithCustomize, customizeObject } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LessPluginFunctions = require('less-plugin-functions');

const { SRC_PATH, DIST_PATH, PUBLIC_PATH } = require('./paths');

// https://webpack.docschina.org/guides/production/#specify-the-mode
// https://github.com/webpack/webpack/issues/2537
// https://github.com/niexias/niexias.github.io/issues/7
const isDev = process.env.NODE_ENV === 'development';

// 公共的样式 loader
const styleLoaders = {
  styleLoader: {
    loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    ...(!isDev && {
      options: {
        publicPath: '../../'
      }
    })
  },
  // https://zhuanlan.zhihu.com/p/20495964?columnSlug=purerender
  // https://github.com/rails/webpacker/issues/2197#issuecomment-517234086
  cssLoader: {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[folder]__[local]--[hash:8]'
      }
    }
  },
  postcssLoader: {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: ['postcss-preset-env']
      }
    }
  },
  sassLoader: {
    loader: 'sass-loader'
  },
  lessLoader: {
    loader: 'less-loader',
    options: {
      lessOptions: {
        plugins: [new LessPluginFunctions()]
      }
    }
  }
};

const commonConfig = {
  // https://webpack.docschina.org/configuration/mode/
  mode: process.env.NODE_ENV,

  entry: {
    app: [
      path.join(SRC_PATH, 'index.js')
    ]
  },

  output: {
    path: DIST_PATH,
    filename: isDev ? 'static/js/[name].js' : 'static/js/[name].[contenthash:8].js', // name 是入口名称
    chunkFilename: isDev ? 'static/js/[name].chunk.js' : 'static/js/[name].[contenthash:8].chunk.js' // name 是从 /* webpackChunkName: "xxPage" */ 中取的
  },

  plugins: [
    new webpack.DefinePlugin({
      // https://www.cnblogs.com/usebtf/p/9912413.html
      'process.env': {
        PUBLIC_PATH: JSON.stringify('')
      }
    }),
    new HtmlWebpackPlugin({
      title: 'react-template',
      filename: 'index.html',
      template: path.join(PUBLIC_PATH, 'index.html')
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(PUBLIC_PATH, 'favicon.ico'),
        to: path.join(DIST_PATH, 'favicon.ico')
      }]
    })
  ],

  resolve: {
    alias: {
      '@': SRC_PATH
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: SRC_PATH,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true // 缓存编译结果，下次编译加速
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192, // 小于 8kb 的图片转换为 base64 编码
            name: '[name].[hash:8].[ext]',
            outputPath: 'static/image'
          }
        }]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            outputPath: 'static/fonts'
          }
        }]
      },
      {
        test: /\.css$/i,
        use: [
          styleLoaders.styleLoader,
          mergeWithCustomize({
            customizeObject: customizeObject({
              options: 'replace'
            })
          })(
            styleLoaders.cssLoader, { options: {} }
          )
        ]
      },
      {
        // https://webpack.docschina.org/loaders/css-loader/#pure-css-css-modules-and-postcss
        test: /\.less$/i,
        use: [
          styleLoaders.styleLoader,
          styleLoaders.cssLoader,
          styleLoaders.postcssLoader,
          styleLoaders.lessLoader
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          styleLoaders.styleLoader,
          styleLoaders.cssLoader,
          styleLoaders.postcssLoader,
          styleLoaders.sassLoader
        ]
      }
    ]
  },

  optimization: {
    // named 对应旧的 new webpack.NamedModulesPlugin() // 当开启 HMR 的时候，该插件会显示模块的相对路径
    // hashed 对应旧的 new webpack.HashedModuleIdsPlugin()
    moduleIds: isDev ? 'named' : 'hashed',

    splitChunks: {
      cacheGroups: {
        verdor: {
          test: /[\\/]node_modules[\\/]/, // 这样写也可以 path.join(process.cwd(), 'node_modules')
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`
    }
  }
};

module.exports = commonConfig;
