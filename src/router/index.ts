import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Article from '@/components/Article.vue'
import sideBar from '@/components/SideBar.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    components: {
      main: Home
    }
  },
  {
    path: '/post/:id&author=:name',
    name: 'Post',
    components: {
      main: Article,
      sidebar: sideBar
    }
  },
  {
    path: '/userinfo/:name',
    name: "Userinfo",
    components: {
      main: sideBar
    },
    props: {
      main: {
        isLimited: false
      }
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
