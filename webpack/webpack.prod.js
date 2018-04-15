const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Visualizer = require('webpack-visualizer-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const ngcWebpack = require('ngc-webpack');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const path = require('path');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

// require('process').env.NODE_ENV = 'production';
// const ENV = 'production';

module.exports = webpackMerge(commonConfig(), {
    // Enable source maps. Please note that this will slow down the build.
    // You have to enable it in UglifyJSPlugin config below and in tsconfig-aot.json as well
    // devtool: 'source-map', // Enable source maps. Please note that this will slow down the build
    mode: 'production',
    entry: {
        polyfills: './src/polyfills',
        global: './src/common/scss/global.scss',
        main: './src/main-aot'
    },
    output: {
        path: utils.root('dist/www'),
        filename: 'app/[name].[hash].bundle.js',
        chunkFilename: 'app/[id].[hash].chunk.js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: [ '@ngtools/webpack' ]
        }]
        // rules: [{
        //     test: /\.ts$/,
        //     enforce: 'pre',
        //     loaders: 'tslint-loader',
        //     exclude: ['node_modules', new RegExp('reflect-metadata\\' + path.sep + 'Reflect\\.ts')]
        // },
        // {
        //     test: /\.ts$/,
        //     use: [
        //         { loader: 'angular2-template-loader' },
        //         {
        //             loader: 'awesome-typescript-loader',
        //             options: {
        //                 configFileName: 'tsconfig-aot.json'
        //             },
        //         },
        //         { loader: 'angular-router-loader?aot=true&genDir=dist/aot' }
        //     ],
        //     exclude: ['node_modules/generator-jhipster']
        // }]
    },
    plugins: [
        new ExtractTextPlugin('[hash].styles.css'),
        new Visualizer({
            // Webpack statistics in dist folder
            filename: '../stats.html'
        }),
        new UglifyJSPlugin({
            parallel: true,
            uglifyOptions: {
                ie8: false,
                // sourceMap: true, // Enable source maps. Please note that this will slow down the build
                compress: {
                    dead_code: true,
                    warnings: false,
                    properties: true,
                    drop_debugger: true,
                    conditionals: true,
                    booleans: true,
                    loops: true,
                    unused: true,
                    toplevel: true,
                    if_return: true,
                    inline: true,
                    join_vars: true
                },
                output: {
                    comments: false,
                    beautify: false,
                    indent_level: 2
                }
            }
        }),
        // new ngcWebpack.NgcWebpackPlugin({
        //     disabled: false,
        //     tsConfig: utils.root('tsconfig-aot.json'),
        //     resourceOverride: ''
        // }),
        new AngularCompilerPlugin({
            entryModule: utils.root('src/app/app.module#AppModule'),
            // mainPath: utils.root('src/main.ts'),
            tsConfigPath: utils.root('tsconfig-aot.json'),
            sourceMap: true
        }),
        // new AotPlugin({
        //     tsConfigPath: 'tsconfig-aot.json',
        //     entryModule: utils.root('src', 'app', 'app.module') + '#AppModule'
        // }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    ]
});
