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

*******************************************************************
*******************************************************************

3.vue-loader中的 cssModules ，也可以在css-loader中定义：
    {
        localIdentName: '[path][name]-[local]-[hash:base64:5]',         //不重复，保密性好
        camelCase: true,
    }

    vue组件中的style 如 head-aaa会被编译成
        $style{
            headAaa: '[path][name]-[local]-[hash:base64:5]'
        }

*******************************************************************
*******************************************************************

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

*******************************************************************
*******************************************************************

5.vue.js 原理 （独立于项目）（app）

    1.vue 实例
        挂在到节点上：
            el：'#app'
            $mount('#app')
        修改$options.data是不起作用的，但是修改$data会起作用。实际数据绑定就是$data数据
        $root就是最外层的vue对象。
        app.$options
        app.$data
        app.$watch
        app.$el
        app.$props
        app.$children
        app.$set(app.obj,'a',i)         会现在data中声明obj.a
        app.$delete
        app.$nextTick()             下一次dom更新时会触发直接执行。如每次setInterval，text+=1，加了5次，实际上dom只会                           一次+5进行渲染。
        app.$destroy()
        app.$forceUpdate(),强制渲染刷新，当data里的obj有个属性a没有声明，则在其他方法中直接赋值时是不会触发数据绑定的渲染的，要么先在data里声明，要么在直     接赋值后用  app.$forceUpdate()直接进行强制刷新。          //不建议使用，可以事先声明或者用$set

    2.vue 的生命周期
        a、不指定el或者$mount,不执行beforeMount和mounted
        b、beforeUpdate和updated在初始化时不执行，数据更新才执行
        c、beforeDestroy，destroyed
        d、activated、deactivated和keep-alive有关
        e、beforeMount： <div id="app"></div>
            mounted: <div>0</div>
            beforeMount =》 render function =》 mounted
        f、created阶段实例init了数据的reactivity，数据绑定，所以对数据的操作不能在beforeCreate阶段，最早在created阶段
        g、如果有template就会把它编译成render function，所以template多了一个编译过程，性能不好。
        h、render中报错了，就会触发renderError方法，只在本组件收集错误，子组件错误不会捕获到；
            errorCaptured(),可以捕获到子组件的错误

    3.vue 的数据绑定
        {{}}
        v-bind  => :
        v-on   => @
        v-html
        v-model
        :class="{}"  :class="[]"  :class="[{},xxx]"   //styles也差不多


    4.computed 和 watch的使用场景
        a、
        computed() {
            name:{
                get:
                set:            //一般不用，防止死循环
            }
            name() {

            }
        }

        watch() {
            name(a,b) {

            }
            name:{
                handler(a,b) {

                },
                immediate:true   //默认为false，所以一开始不会执行
                deep:true    //默认为false，如果name是一个对象，里面的属性变化时，deep：true才会监听到，性能开销大
            }
        }
        b、computed只会在依赖的data改变时才会调用，即使浏览器因为其他原因而刷新。所以性能很好。
        c、watched,在watch的name 改变时才会改变
        d、功能： watch监听数据变化并进行某些操作，computed，数据改变后用于视图的改变。
        e、 注意不要在watch和computed中触发原数据的修改，否则会触发无限循环

    5.Vue 的原生指令
        v-text      //标签里绑定的数据，相当于{{}}，但是更麻烦，少用
        v-html
        v-show      //相当于加了display：none
        v-if    v-else-if   v-else              //节点根本不存在，增删会比较性能差，用v-show好点。
        v-for="(item,index) in arr"   v-bind:key    //唯一指定当前循环列的值，下一次循环时可以在缓存中拿到相同的key会                                   直接从缓存拿，性能更好，一般直接用index，但是index也不好。
        v-on
        v-bind
        v-model  //输入组件
        v-model.number//会变成数字
        v-model.trim //去除前后空格
        v-model.lazy//绑定的input事件改成onchange事件
        v-pre   便签里的内容，不会转变，如 html：{{html}}               不常用
        v-cloak  在vue还没加载完成前，这个标签会display：none           不常用
        v-once  绑定的数据只进行一次渲染，不会再更新，性能开销小一点      不常用

    6.vue 的组件之组件的定义    (组件：component)
        a、Vue.component('NameOne',component)     =》 <name-one></name-one>
        b、new Vue({
            components:{
                NameOne: component
            }
        })
        c、 props:{
                prop:{
                    type:Boolean,
                    required:true,
                    default:true,
                    validator(value) {
                        return typeof value === 'boolean'
                    }
                },
                XXX
            }
            or
            props:['prop','XXX']
        d、data() {
            return {
                XXX
            }
        }       防止多次调用同一个组件修改数据时，会影响其他组件调用。闭包

        e、 子组件中可以用this.$parent修改父组件数据。      //不建议做

    7.vue 的组件之组件的继承
        CompVue = Vue.extend(component)
        new CompVue({
            //
        })
        or
        component2 = {
            extends: component
        }
        new Vue({
            components:{
                Comp: component2
            }
        })

    8.vue 的组件之自定义双向绑定

    9.vue 的组件之高级属性
        a、插槽<slot></slot>
            具名插槽：  属性：name="header",使用时 <p slot="header"></p>,实现插入具体位置

            作用域插槽：
            情景一：
                子：<slot></slot>
                父:<p>{{value}}</p>  这里的value是父里面的data
            情景二：
                子：<slot value="aaa" value2="bbb"></slot>
                父：<p slot-scope="props">{{props.value}}</p>    子slot中所有数据传入props中，调用子数据

        b、跨层级关系 app =》 component =》 childComponent
        app中:
            provide() {
                return {
                    yeye:this
                }
            }
        childComponent中：
            inject:['yeye']

    10.vue 的组件之render function
        render(h)=>{
            return h(app)
        }
        or
        render: (h)=>h(app)

        这里的h实际上传的就是this.$createElement
        相当于this.$createElement(app)

        一个template进行render解析的过程：
        template：`
            <comp-one ref="comp" :style:"style">
                <p ref="p">{{value}}</p>
                <slot name="slot1"></slot>
            </comp>
        `
        解析为：
        render(h){
            return h('comp-one',{
                ref:'comp',
                style:this.style
            },[
                h('p',{
                    ref:'p'
                },this.value),
                this.$slot.slot1          //插槽没有名字就是this.$slot.default
            ])
        }
        第一个参数：标签名； 第二个参数：属性； 第三个属性：子节点或者字符串，子节点时需要用数组括起来。
        render createElement创建的就是一个VNODE，虚拟节点


*******************************************************************
*******************************************************************

6.vue-router    (开始跟项目有关了)  （注释在项目文件中）
  npm i vue-router -S

  知识分点：
    1、vue-router之集成

    2、vue-router之配置

    3、vue-router之路由参数传递

    4、vue-router之导航守卫 (没在项目里写)
  过程：
    导航被触发。
    在失活的组件里调用离开守卫。
    调用全局的 beforeEach 守卫。
    在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
    在路由配置里调用 beforeEnter。
    解析异步路由组件。
    在被激活的组件里调用 beforeRouteEnter。
    调用全局的 beforeResolve 守卫 (2.5+)。
    导航被确认。
    调用全局的 afterEach 钩子。
    触发 DOM 更新。
    用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

  组件内钩子
    beforeRouteEnter    当多个路由匹配同一个组件时，如 /app/:id，我们可以在这两个钩子中的next(vm=>XXX),回调函数更新id
    beforeRouteUpdate
    beforeRouteLeave    当离开时可以发出comfirm , 控制页面跳转
                        if(window.comfirm('离开?')) { next() }
    ！！ 多次在同一个组件中切换，mounted生命周期不会被触发，当需要进行数据的改变时，可以在路由钩子中的next() 回调中进行

  动态加载异步组件：( 结合webpack )
    component: () => import('../views/todo/todo.vue')
    这种语法需要安装一个babel插件   npm i babel-plugin-syntax-dynamic-import -D
    然后在.babelrc中加入这个插件

    目录结构：
        client/config/routes.js
        client/config/router.js

    路由动画:
      <transition name="fade">
        <router-view></router-view>
      </transition>

      .fade-enter-active,.fade-leave-active
        transition opacity .5s
      .fade-enter, .fade-leave-to
        opacity 0

    注意：
        webpack中配置 output 的 publicPath: '/'
        否则路由嵌套会出错，打包出来的bundle.js可能在访问/app/test时会去/app下找，但是实际上bundle.js在/ 根目录下，就出现了路由嵌套失败的情况

        提供了 this.$route,拿到params、path、query等等，
        或者在写路由时用props，把params作为props传入组件中，有多种写法

7.vuex  (开始跟项目有关了)  （注释在项目文件中）
  npm i vuex -S
  知识点分：
    1、vuex之集成

    2、vuex之state和getters

    3、vuex之mutation和action

    4、vuex之模块

    5、vuex之其他一些API和配置

  目录结构：
    /store/store.js
    /store/
    /store/
    /store/


  Store:
  
  Mutation:

  Getter:

  Action:

  Module:

