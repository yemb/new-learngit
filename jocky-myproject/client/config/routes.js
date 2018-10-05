// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    // component: Todo,
    component: () => import('../views/todo/todo.vue'),
    name: 'app'
    // path: '/app/:id', // 在相关匹配路由中，app中拿到this.$route.params.id
    // props: true, // 相当于作为props传入到app组件中，app组件中通过props:['id'],作用是不用调用this.$route ！！推荐！！
    // props: {
    //     id:456
    // },
    // props: (route) => ({ id: route.xxx.xxx}),

    // meta: { // 路由原信息
    //   title: 'this is app',
    //   description: 'this is app description'
    // },
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/login/exact',
    component: () => import('../views/login/login.vue')
  }
]
