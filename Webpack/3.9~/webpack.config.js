
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const path = require('path')

config= {
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname,'dist'),
        publicPath: './dist',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },

    module: {
        rules: [
            {
                test:/\.js$/,
                use: [
                    {
                        loader:'babel-loader',
                        options: {
                            presets: ['env'],
                            plugins: [
                                'lodash'
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options:{
                            singleton: true,
                            transform: './css.transform.js'
                        }
                    },
                    use:[
                        {
                            loader: 'css-loader',
                            options: {
                                // minimize: true,   已废除,注意!!!
                                // modules: true,      //css module开启
                                localIdentName:'purify-[path][name]_[local]_[hash:base64:5]'    //定义css名
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',//表明后面的插件就是给postcss使用的
                                plugins: [
                                    // require('autoprefixer')()
                                    require('postcss-cssnext')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader',
                        }
                    ]
                })
            },
        ]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:'manifest',
        //     minchunks: Infinity
        // }),
        new ExtractTextWebpackPlugin({
            filename: '[name]-[contenthash:5].min.css',
            allChunks: true
        }),
        new PurifyCSS({
            paths: glob.sync([
                path.join(__dirname,'./index.html'),
                path.join(__dirname,'./src/app.js')
            ]),
            // purifyOptions: {
            //     whitelist: ['*purify*']
            // }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
    
}

module.exports = config