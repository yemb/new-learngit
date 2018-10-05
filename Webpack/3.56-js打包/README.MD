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
    require.include

ES 2015 Loader spec：
    import().then()
