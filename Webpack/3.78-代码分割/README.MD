3.56  打包公共代码
webpack.optimize.CommonsChunkPlugin   (webpack3)
：
多entry的代码打包
分离业务代码 和 业务公共代码 和 第三方依赖 和 webpack自动生成代码

3.78 代码分割和懒加载，不是在webpack中配置，而是写代码时进行处理
（单entry的代码打包解决方法）
（都是异步的）
webpack methods
ES 2015 Loader spec  （动态import，可以作为首屏加载和后来加载进行代码分割打包）

webpack methods：
    require.ensure
    require.include      适用于单entry公共模块分割打包，在父组件里，commonchunkplugin适用于多entry

ES 2015 Loader spec：
    import().then()


3-56中pagea,pageb中的共有“同步”加载代码 subpagea，subpageb打包到了common中

3-78中最后用async 打包了pagea和pageb“异步”加载的subpagea，subpageb中共同依赖的 modulea打包到了async-common中

打包文件：
pagea.bundle.js
pageb.bundle.js    业务代码

common.chunk.js   共同依赖的业务代码

manifest.bundle.js  webpack生成代码

async-common-xxx.chunk.js       异步加载的代码中 共同依赖的业务代码

vendor.bundle.js      第三方代码

subpagea.chunk.js 
subpageb.chunk.js   异步加载的代码块