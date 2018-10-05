html-webpack-plugin
    自动生成HTML
    场景优化，/\.html$/
    manifest文件直接不用每次打包
    minify，启动html-minifier插件，进行html压缩
    配置：
    options：
        template
        filename
        minify
        chunks，指定加载的entry页面名
        inject，是否通过标签把css ， js插入html中，默认true，插入


html中引入图片

    1、html-loader
    options
        attrs：[img:src,img:data-src] ……

    2、${require('...')},不用html-loader
    <img src="${require('./src/assets/imgs/1.jpg')}" alt=""/>


提前载入webpack 加载代码
多页面时，每次页面加载都会请求一次公共代码，就很浪费资源，可以吧资源包含在html中，只请求一次，

    1、inline-manifest-webpack-plugin
    2、html-webpack-inline-chunk-plugin !important  
        用script标签包含着公共代码内容


        