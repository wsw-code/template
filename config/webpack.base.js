var path = require('path')
var webpack = require('webpack')
const yargs = require('yargs');
var name =  yargs.argv.project || '';

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var appConfig = require('../app.config.js')
var poxcyPath = appConfig.poxcyPath
console.log(poxcyPath)
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const config = {
  mode: process.env.NODE_ENV,
  // mode: 'development', // development状态下vue报错更详细也可以在package.json中用--mode=development
  entry: {
    
  }, // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
  output: {
    path: path.resolve(__dirname, `../views/${name}Project`), // 项目的打包文件路径
    publicPath: process.env.NODE_ENV == 'production'?`${poxcyPath}/${name}Project/`:'/', // 通过devServer访问路径
    filename: `js/[name].js`, // 打包后的文件名,
    chunkFilename: `js/[name].bundle.js`
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // 加上可以在入口文件里用templete不然只能用render函数
      '@': path.resolve(__dirname, `../pages/${name}`),
      'util': path.resolve(__dirname, `../static/js/util.js`),
      'appConfig': path.resolve(__dirname, '../app.config.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../' // 图片引用
              }
            },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../' // 图片引用
              }
            },
          'css-loader',
          'postcss-loader',
          'less-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              // 需要一个全局路径
              resources: `./static/style/mixins.less`
            }
          }

        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: { // 这里的options选项参数可以定义多大的图片转换为base64
              limit: 50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
              name: 'images/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: "fonts/",
              outputPath: "fonts/"
            }
          }
        ]
      }

    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 提取 node_modules 中代码
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        common: {
          name: 'common',
          chunks: 'all',
          test: /[\\/]pages[\\/]/,
          minChunks: 2
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    //new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `css/[name].css`
    }),
    new VueLoaderPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: `!!raw-loader!./template/${name}.html`,
      chunks: ['common', 'vendors', 'manifest', `${name}`],
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  node: {

    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  devtool: process.env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : 'cheap-module-source-map'
}

if(process.env.NODE_ENV == 'development') {  
  config.module.rules.unshift({ 
    test: /\.(vue|js|jsx)$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
    enforce: 'pre'
  })
}

module.exports = config
