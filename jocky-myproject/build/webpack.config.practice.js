const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
// const cleanPlugin = require('clean-webpack-plugin')

let config

const defaultPlugin = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV:  '"development"'
        }
    }),
    new HTMLPlugin({
        template: path.join(__dirname,'template.html')
    }),
    // new cleanPlugin('../dist')
]

const devServer = {
    port: 8080,
    host: '0.0.0.0', // 内网 ip 和 local 都可以
    overlay: {
        errors: true // 有错误显示在网页
    },
    hot: true, // 热部署
    // open: true // 打开游览器
}

config = merge(baseConfig,{
    entry:path.join(__dirname,'../practice/index.js'),
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
    resolve:{
        alias:{
            'vue':path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
        }
    },
    plugins: defaultPlugin.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ])
})

module.exports = config
