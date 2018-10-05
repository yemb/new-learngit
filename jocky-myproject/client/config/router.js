import Router from 'vue-router'
import routes from './routes'

// const router = new Router({
//     routes
// })
// export default router

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base: '/base/'           // 不常用，非强制
    linkActiveClass: 'active-link', // 页面使用routerlink标签时，选中的会生成router-link-exact-active和router-link-active两个类
    linkExactActiveClass: 'exact-active-link', // 指定他们这两个类名，控制routerlink样式
    // 区别，如/login/exact,  /login和/login/exact都会有active-link，但是只有/login/exact，准确匹配的路径才有exact-active-link
    scrollBehavior (to, from, savedPosition) { // 页面滚动位置保存。
      if (savedPosition) {
        return savedPosition
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    },
    // parseQuery () { // 如？a=xxx&。。。这些

    // },
    // stringifyQuery () {

    // }
    fallback: true // 不是所有浏览器都支持history模式，设置成true之后会在不支持的浏览器自动变成hash模式
  })
}

// 通过export一个function，然后return 一个new router，每次服务端渲染后可以释放内存，防止内存溢出，赞不太理解
