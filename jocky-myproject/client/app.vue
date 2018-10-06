<template>
    <div :id="$style.app">
        <div :id="$style.cover"></div>
        <Header></Header>
        <p>{{count}}</p>
        {{fullName}}
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

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
// import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header,
    Footer
    // Todo
  },
  mounted () {
    // console.log(this.$route.params.id)
    // let i = 1
    // this.$store.dispatch('updateCountSync', { num: 5, time: 3000 })
    this.updateCountSync({ num: 5, time: 3000 })
    // setInterval(() => {
    //   // this.$store.commit('updateCount', i++)
    //   this.updateCounter(i++)
    // }, 1000)
  },
  methods: {
    ...mapMutations({
      updateCounter: 'updateCount'
    }),
    ...mapActions(['updateCountSync'])
  },
  computed: {
    ...mapState(['count']),
    // count () {
    //   return this.$store.state.count
    // },
    ...mapGetters(['fullName'])
    // fullName () {
    //   return this.$store.getters.fullName
    // }
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
