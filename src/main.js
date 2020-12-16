import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from './components/common/toast'

Vue.config.productionTip = false
// 添加事件总线
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms的延迟 初始化FastClick实例。在页面的DOM文档加载完成后
FastClick.attach(document.body)

// 使用懒加载的插件
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/placeholder.png')
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
