const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");

const utils = require('./utils.js');

module.exports = (options) => {
  return {
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['node_modules']
    },
    module: {
      rules: [{
          test: /bootstrap\/dist\/js\/umd\//,
          loader: 'imports-loader?jQuery=jquery'
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            minimize: true,
            caseSensitive: true,
            removeAttributeQuotes: false,
            minifyJS: false,
            minifyCSS: false
          },
          exclude: ['./src/index.html']
        },
        {
          test: /\.scss$/,
          loaders: ['to-string-loader', 'css-loader', 'sass-loader'],
          exclude: /(vendor\.scss|global\.scss)/
        },
        {
          test: /(vendor\.scss|global\.scss)/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.css$/,
          loaders: ['to-string-loader', 'css-loader'],
          exclude: /(vendor\.css|global\.css)/
        },
        {
          test: /(vendor\.css|global\.css)/,
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
          loaders: ['file-loader?hash=sha512&digest=hex&name=content/[hash].[ext]']
        },
        {
          test: /manifest.webapp$/,
          loader: 'file-loader?name=manifest.webapp!web-app-manifest-loader'
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10
          },
          common: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5, // The default limit is too small to showcase the effect
            minSize: 0, // This is example is too small to create commons chunks
            name: 'common'
          },
        }
      },
      runtimeChunk: {
        name: 'manifest'
      }
    },
    plugins: [
      // new webpack.DefinePlugin({
      //   'process.env': {
      //     'NODE_ENV': JSON.stringify(options.env)
      //   }
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'polyfills',
      //   chunks: ['polyfills']
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor',
      //   chunks: ['main'],
      //   minChunks: module => utils.isExternalLib(module)
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: ['polyfills', 'vendor'].reverse()
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: ['manifest'],
      //   minChunks: Infinity,
      // }),
      /**
       * See: https://github.com/angular/angular/issues/11580
       */
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        utils.root('src/app'), {}
      ),
      new CopyWebpackPlugin([{
          from: './node_modules/core-js/client/shim.min.js',
          to: 'core-js-shim.min.js'
        },
        {
          from: './src/favicon.ico',
          to: 'favicon.ico'
        },
        {
          from: './src/manifest.webapp',
          to: 'manifest.webapp'
        },
        // { from: './src/sw.js', to: 'sw.js' },
        {
          from: './src/robots.txt',
          to: 'robots.txt'
        },
        // {
        //   from: 'src/assets',
        //   to: 'assets'
        // }
      ]),
      new MergeJsonWebpackPlugin({
        output: {
          groupBy: [{
              pattern: "./src/i18n/zh-cn/*.json",
              fileName: "./i18n/zh-cn.json"
            }
            // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array
          ]
        }
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body'
      }),
      new StringReplacePlugin()
    ]
  };
};
