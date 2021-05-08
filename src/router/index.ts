import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Article from '@/components/Article.vue'

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
    path: '/post/:id',
    name: 'Post',
    components: {
      main: Article
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
