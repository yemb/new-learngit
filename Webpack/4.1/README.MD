文件处理之 
    图片处理
    字体文件
    第三方js库（cdn地址）


1、图片处理:file-loader/url-loader

    因为output中配置的publicPath,会出现html中图片引用路径错误的情况，这时可以用file-loader中的options中
    useRelativePath:true,设置dist打包好后的文件也有原来的文件目录结构，来排除相对路径会错误的情况
    以及配合outputPath配合图片打包出口。

    合成雪碧图
        postcss-sprites：{
            spritePath: 'dist/assets/img/sprites',              指定雪碧图打包路径
            retina: true                          //适配iPhone屏幕的retina屏，每张图片变成  xxx@2x.ext,css中大小减半
        }

    压缩图片
        img-loader,options中设置pngquant等等配置
        image-webpack-loader

    base64编码（小图）
        url-loader{
            options:{
                name,
                limit
                ...
            }
        }


2、字体文件：file-loader 、 url-loader

3.第三方 js 库 ( jquery举例 )
    1、script标签加入，什么都不用做

    2、webpack.providePlugin ( plugin 方式 )
    （线上）
    {
        npm install jquery
        new webpack.ProvidePlugin({
            $：'jquery'
        })
    }
    （线上）
    {
        resolve: {
            alias: {    (别名)
                jquery$: path.resolve('src/...(目录)')
            }
        }
        new webpack.ProvidePlugin({
            $：'jquery'
        })
    }
        
    3、imports-loader 
    {
        module:{
            rule:[
                {
                    test:path.resolve(__dirname,'src/app.js')
                    use:[
                        {
                            loader:'imports-loader',
                            options:{
                                $:'jquery'//从alias解析还是node_modules中检测'jquery'
                            }
                        }
                    ]
                }
            ]
        }
    }

    window


另外:
    postcss-pxtorem        ====》 px to rem


出现疑问：

使用postcss-sprites时，webpack打包会卡住，而且打包出的雪碧图非常大，webpack.config.js后面的内容被卡住不执行。


使用第三方jquery库时，只有用script标签注入的方式没有报错。
npm install以及本地libs文件通过resolve alias配置别名的方式，都报了rangeError的错误。暂未解决！！！
