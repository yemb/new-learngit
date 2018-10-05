const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
// const cleanPlugin = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

let config

const defaultPlugin = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin({
        template:path.join(__dirname,'template.html')
    }),
    // new cleanPlugin('../dist')
]

const devServer = {
    port: 8000,
    host: '0.0.0.0', // 内网 ip 和 local 都可以
    overlay: {
        errors: true // 有错误显示在网页
    },
    hot: true, // 热部署
    historyApiFallback: {
        index: '/index.html'
    }
    // open: true // 打开游览器
}

if (isDev) {
    config = merge(baseConfig,{
        devtool: '#cheap-module-eval-source-map', // 调试代码
        devServer,
        module:{
            rules:[
                {
                    test: /\.styl$/,
                    use: [
                        'vue-style-loader',
                        {
                            loader:'css-loader',
                            // options:{
                            //     module:true,             //webpack4已废除
                            //     localIdentName: isDev? '[path][name]-[local]-[hash:base64:5]':'[hash:base64:5]'
                            // }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        plugins: defaultPlugin.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })
} else {
    config = merge(baseConfig,{
        entry: {
            app: path.join(__dirname, '../client/index.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js',
        },
        module: {
            rules:[
                {
                    test: /\.styl$/,
                    use: ExtractPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                }
            ]
        },
        plugins:defaultPlugin.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            })
        ])
    })
}

module.exports = config
