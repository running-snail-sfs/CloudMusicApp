import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from  './router'
import VueLazyload from 'vue-lazyload'
import store from './store'

import './common/stylus/index.styl'
// 解决移动端300毫秒的延迟
fastclick.attach(document.body)
// 解决来加载问题
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
