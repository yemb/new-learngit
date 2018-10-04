1.目录结构
    build:
        webpack.config.js
        webpack.config.base.js              公共代码
        webpack.config.client.js            客户端


        webpack部分注意：
            webpack-merge，进行webpack代码的合并,合理合并webpack
            devServer 用一个外部对象，比较方便
            修改output的dist目录结构

    src ===> client
    client{                 客户端
        views{              页面
            todo{           每个页面一个目录
                ..vue       具体页面涉及的 vue 文件
                ..vue
            }
            layout{         布局类vue文件,公用
                header.vue
                ...vue
            }
        }
    }
    注意修改文件中跟路径有关的url以及webpack中的配置

*******************************************************************
*******************************************************************

2.vue-loader 配置
    vue-loader.config.js       //module.exports 一个function，在webpack中才进行传参执行，返回需要的options配置项
        return {
            preserveWhitespace: true,       //把template中每行后面的空格去掉，防止对布局样式产生影响
            extractCSS: !isDev,             //extract-text-webpack-plugin没办法把vue中的style打出来，用这个完成。提                                 高首屏加载速度
                                            //在类中加入hash码，实现scoped
            cssModule:{

            }
            hotReload: false/true  //开发环境热重载，生成环境没有，会自动根据环境变量生成，一般不用设置
            loaders:{                       //可以指定各种webpack一样的loader，也可以自定义模块及其解析的loader
                js：'XXX.loader..'
                'docs': 'XXX'
            },
            preLoader:{}
            postLoader:{}
        }
    !!== 注意：用style-loader的vue的css是没有热重载的，需要刷新页面==,需要使用vue-style-loader ==！！

    rimraf 和 clean-webpack-plugin：都可以在每次production模式下，webpack打包时删除文件及文件夹
        rimraf在package.json中配置“rimraf dist” 每次会删除dist目录
        clean-webpack-plugin:   new CleanPlugin('dist')

3.vue-loader中的 cssModules ，也可以在css-loader中定义：
    {
        localIdentName: '[path][name]-[local]-[hash:base64:5]',         //不重复，保密性好
        camelCase: true,
    }

    vue组件中的style 如 head-aaa会被编译成
        $style{
            headAaa: '[path][name]-[local]-[hash:base64:5]'
        }

4.eslint
    loaders:
        eslint
        eslint-config-standard
        eslint-plugin-standard
        eslint-plugin-promise
        eslint-plugin-import
        eslint-plugin-node
        eslint-plugin-html          //识别html，vue的格式类似于html。识别vue

        eslint-loader               //webpack loader
        babel-eslint                //webpack loader ,这两个东西实现编译时就进行eslint校验和修正

    .eslintrc
        {
            "extends": "standard",
            "plugin": [
                "html"
            ],
            "parser": "babel-eslint"        //所有通过webpack的代码经过babel编译后可能不符合eslint，需要这样配置解决
        }

    package.json:
        "lint":"eslint --ext .js --ext .jsx --ext .vue client/"    //--ext,指定后缀文件进行检测，client/指定检测目录
        "lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/"     //--fix自动修复问题

    webpack.config.base.js:
        module.rule:
        {
            test:/\.(vue|js|jsx)$/,           //所有文件需经过eslint-loader
            loader: 'eslint-loader',
            exclude: /node_modules/,          //eslint-standard标准可能是es6，es7，es8，但是node_modules是已                                         //经经过处理的es5的代码，所以不需要处理且可能报错
            enforce:'pre'//post就是后处理      //js、jsx、vue都有自己的处理的loader，在进行真正的处理之前，这是预处理
        },

    定义一些书写规范，要在vscode安装editorconfig插件
    .editorconfig{

    }

    npm i husky -D:     //帮助我们在git commit之前进行一个检测，保证错误只在本地存在
    package.json:{
        "precommit" : "npm run lint-fix",
    }
