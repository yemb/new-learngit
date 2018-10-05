const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const PurifyCSS = require('purifycss-webpack')
const HtmlWebpack = require('html-webpack-plugin')
const glob = require('glob-all')
const path = require('path')
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')

config= {
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname,'dist'),
        // publicPath: './dist/',
        filename: '[name]-bundle-[hash:5].js',
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
                    // publicPath: 'css/',
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
                                // localIdentName:'purify-[path][name]_[local]_[hash:base64:5]'    //定义css名
                            }
                        },
                        // {
                        //     loader: 'postcss-loader',
                        //     options: {
                        //         ident: 'postcss',//表明后面的插件就是给postcss使用的
                        //         plugins: [
                        //             // require('autoprefixer')()
                        //             require('postcss-sprites')({
                        //                 spritePath: 'dist/assets/img/sprites'
                        //                 // retina: true
                        //             }),
                        //             require('postcss-cssnext')()
                        //         ]
                        //     }
                        // },
                        {
                            loader: 'less-loader',
                        }
                    ]
                })
            },
            {
                test:/\.(png|jpg|jpeg|svg|gif)$/,
                use: [
                    // {
                    //     loader:'file-loader',
                    //     options:{
                    //         // outputPath:'dist/',
                    //         // publicPath:'',
                    //         useRelativePath:true
                    //     }
                    // }
                    {
                        loader:'url-loader',
                        options: {
                            name: '[name][hash:5]-min.[ext]',
                            limit: 1000,                               //base64   =》 css bundle中
                            publicPath: '',
                            outputPath: 'assets/imgs/'
                            // useRelativePath:true
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            pngquant: {
                                quality: 10
                            },
                            mozjpeg: {
                                progressive: true,
                                arithmetic: false
                            },
                        }
                    }
                ]
            },
            {
                test:/\.html$/,
                use:[
                    {
                        loader: 'html-loader',
                        options:{
                            attrs:['img:src','img:data-src']
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:'manifest',    
            minchunks: Infinity
        }),
        new ExtractTextWebpackPlugin({
            // filename: '[name].min.css',
            filename:'css/[name]-bundle-[hash:5].css',
            allChunks: false
        }),
        new HtmlInlineChunkPlugin({
            inlineChunks: ['manifest']
        }),
        new HtmlWebpack({
            filename:'index.html',
            template:'./index.html',
            // inject:false
            // minify: {
            //     collapseWhitespace: true
            // },
            // chunks: ['app']
        }),
        new PurifyCSS({
            paths: glob.sync([
                path.join(__dirname,'./index.html'),
                path.join(__dirname,'./src/app.js')
            ]),
            // purifyOptions: {
            //     whitelist: ['*purify*']
            // }
        })
        // new webpack.optimize.UglifyJsPlugin()
    ]
    
}

module.exports = config