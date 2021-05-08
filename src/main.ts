import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Axios from 'axios'

Vue.prototype.$http = Axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.filter('formatDate', (str: string) => {
  if (!str) return ''
  const date = new Date(str)
  const time = new Date().getTime() - date.getTime()
  if (time < 0) {
    return ''
  } else if (time / 1000 < 30) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000).toString()) + '秒前'
  } else if (time / 60000 < 60) {
    return parseInt((time / 60000).toString()) + '分钟前'
  } else if (time / 3600000 < 24) {
    return parseInt((time / 3600000).toString()) + '小时前'
  } else if (time / 86400000 < 31) {
    return parseInt((time / 86400000).toString()) + '天前'
  } else if (time / 2592000000 < 12) {
    return parseInt((time / 2592000000).toString()) + '月前'
  } else {
    return parseInt((time / 31536000000).toString()) + '年前'
  }
})

type Post = {
  author: any,
  author_id: any,
  content: any,
  create_at: string,
  good: boolean,
  id: string,
  last_reply_at: string,
  reply_count: number,
  tab: string,
  top: boolean,
  visit_count: number
}

Vue.filter('labelFormatter', (post: Post) => {
  if (post.good) {
    return '精华'
  } else if (post.top) {
    return '置顶'
  } else if (post.tab === 'ask') {
    return '问答'
  } else if (post.tab === 'share') {
    return '分享'
  } else {
    return '招聘'
  }
})