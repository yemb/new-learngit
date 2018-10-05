1.  style-loader    把样式插入html中，style标签
    style-loader/url   打包出一个css文件， 以link标签插入html中,匹配file-loader使用  （不常用）
    style-loader/useable   可以在业务代码中使用use（），unuse（）控制样式显示   （不常用）

    options:
        insertInto  插入到dom中
        singleton   默认false，打包成一个style标签
        transform   利用js进行css转化，可获得浏览器参数，项目数据，dom等等。 （不在打包时运行，浏览器环境下，插入页面前执行，进行css的转化）

2.  css-loader
    options:
        alias （解析的别名）
        importLoader （@import ）
        Minimize （是否压缩）(1.0以后已废除,改成postcss-cssnano或者用uglifyjsplugin)
        modules （启用css-modules）
        localIdentName: '[path][name]__[local]--[hash:base64:5]'    //配合modules使用

3.  less less-loader  sass-loader node-sass  stylus-loader  

4.  提取CSS（单独文件）:
    extract-text-webpack-plugin
        fallback,不用时用fallback里的来提取文件，如style-loader
        参数：
            filename，
            allChunks：默认false，只提取初始化内容，不会提取异步加载内容（css)，css就会打包到js中,true为全部css             打包到一个文件里

5.  PostCSS：
    安装：postcss postcss-cssnext cssnano  autoprefixer  postcss-loader：
    css-loader里的minimize已废除，本来是实现cssnano的。

    Broswerslist ,所有插件公用一份浏览器兼容配置，可设置package.json 或者设置.broswerslistrc


6.  Tree shaking，提取用到的模块，把不用的不打包。
    js Tree shaking ：
        webpack.optimize.UglifyJsPlugin

    css Tress Shaking:
        Purify CSS   安装： purifycss-webpack purify-css
        glob-all   安装  glob-all，实现purifycss可以同时处理多个css文件

        PS!!!!!:
            purifycss 与 css-module不能同时使用，非要用就要在purify中配置purifyOptions：whilelists:[] ,设置白名单

8
8
8888
8888888888
88888888888888888--------- 以上是第三章 -----------------88888888888888888888
8888888888
8888
8
8






