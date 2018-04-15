const webpack = require('webpack');
const writeFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackNotifierPlugin = require('webpack-notifier');
const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

// require('process').env.NODE_ENV = 'development';
// const ENV = 'dev';

module.exports = webpackMerge(commonConfig(), {
    devtool: 'eval-source-map',
    mode: 'development',
    devServer: {
        contentBase: './dist/www',
        proxy: [{
            context: [
                '/esenuaa',
                '/esenaccount',
                '/esengtp',
                '/eseneapp',
                '/yundisk',
                '/words',
                '/personalprofile',
                '/esenste',
                '/esenpm',
                '/esencommon',
                '/esenste',
                '/esenchat',
                '/esenpersonalspace',
                '/esenfeedback',
                '/metas',
                '/esenbase',
                '/esenmessage',
                '/esenhrm',
                '/esenapproval',
                '/esenproduct',
                '/esencrscore',
                '/esenwx'
            ],
            // target: 'http://192.168.1.9:9091',
            // target: 'http://192.168.1.18:9091',
            // target: 'http://test-gateway.workdesk.esenyun.com:9091',
            target: 'https://pre-gateway.workdesk.esenyun.com:9091',
            // target: 'https://gateway.workdesk.esenyun.com:9091',
            // target: 'http://esen-office.f3322.net:19091',
            secure: false
        }]
    },
    entry: {
        polyfills: './src/polyfills',
        global: './src/common/scss/global.scss',
        main: './src/main'
    },
    output: {
        path: utils.root('dist/www'),
        filename: 'app/[name].bundle.js',
        // chunkFilename: 'app/[id].chunk.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            enforce: 'pre',
            loaders: 'tslint-loader',
            exclude: ['node_modules', new RegExp('reflect-metadata\\' + path.sep + 'Reflect\\.ts')]
        },
        {
            test: /\.ts$/,
            loaders: [
                'angular2-template-loader',
                'awesome-typescript-loader',
                'angular-router-loader'
            ],
            exclude: ['node_modules/generator-jhipster']
        },
        // {
        //     test: /\.js$/,
        //     exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/,
        //     loader: 'babel-loader'
        //     }
        ]
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     'window.Quill': 'quill'
        // }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 8000,
            proxy: {
                target: 'http://localhost:8060'
            }
        }, {
            reload: false
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.NoEmitOnErrorsPlugin(),
        new writeFilePlugin(),
        new webpack.WatchIgnorePlugin([
            utils.root('src/test'),
        ]),
        new WebpackNotifierPlugin({
            title: 'JHipster',
            contentImage: path.join(__dirname, 'logo-jhipster.png')
        })
    ]
});
