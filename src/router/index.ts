import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Article from '@/components/Article.vue'
import sliderBar from '@/components/SiderBar.vue'

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
      sliderbar:sliderBar
    }
  },
  {
    path:'/userinfo/:name',
    name:"Userinfo",
  }
]

const router = new VueRouter({
  routes
})

export default router
