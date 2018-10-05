<template>
    <div :id="$style.app">
        <div :id="$style.cover"></div>
        <Header></Header>
        <router-link to="/app">app-routeByPath</router-link>
        <router-link :to="{name: 'app'}">app-routeByName</router-link>
        <router-link to="/login">login</router-link>
        <router-link to="/login/exact">login exact</router-link>
        <transition name="fade">
            <router-view></router-view>
        </transition>
        <!-- <Todo></Todo> -->
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header,
    Footer
    // Todo
  },
  mounted () {
    console.log(this.$route.params.id)
  }
}
</script>


<!-- scoped 只在本组件生效 -->
<style lang="stylus" module>
#app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

#cover {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #999;
    opacity: 0.9;
    z-index: -1;
}
</style>
