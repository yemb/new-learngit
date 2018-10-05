搭建开发环境
    1、webpack watch mode
    2、webpack-dev-server
    3、express/koa + webpack-dev-middleware


1、webpack watch mode   修改css、js时可以实时改变打包内容
    plugin:
        clean-webpack-plugin   每次打包清除的目录 new CleanWebpackPlugin(['dist'])

    webpack -w/-watch --progress --display-reasons --color        观察打包过程

2、webpack-dev-server——————不可以打包文件！！！帮助本地服务器。

!!!! ps:webpack3 配置 webpack-dev-server2.x版本。安装2.9.7版本出错，故安装了2.11.2版本

    live reloading  文件出现变动实现 自动刷新浏览器
    路径重定向？
    https
    浏览器中显示编译错误
    接口代理 ———— 请求远端接口
    模块热更新  不刷新浏览器的情况下 刷新代码

    devServer
        inline                  true/false
        contentBase
        port                    端口
        historyApiFallback      提供给HTML5 history Api使用，改变url路径且不匹配时，可以避免404
        https                   
        proxy                   接口代理
        hot                     模块热更新，触发钩子，进行相关代码替换。vue-loader框架loader等等都支持hot。
        openpage                设置初始页面
        lazy                    懒打包懒编译，只有访问的资源才会进行打包和编译（适合多页面应用）
        overlay                 在浏览器中设置遮罩，可以显示编译错误，不用跑去命令行看编译错误
    
    运行：
        node_modules/.bin/webpack-dev-server --open
        一般会在package.json中设置  "webpack-dev-server --open",然后npm run XXX。

    proxy:
        http-proxy-middleware和devServer.proxy的参数:
        options：{
            target
            changeOrigin
            headers                     增加http请求头
            logLevel                    在命令行工具中显示代理情况
            pathRewrite                 重请求地址
        }




    与webpack.config.js不同：
        访问浏览器是 localhost：xxxx/...
        可在output中设置publicPath('/'),让图片的路径变成根路径（dist）下的绝对路径

    

