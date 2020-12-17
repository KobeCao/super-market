import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import vueLzayLoad from 'vue-lazyload'

// 导入自定义的弹窗插件
import toast from 'components/common/toast'

// 解决移动端点击事件的300ms延迟
FastClick.attach(document.body);

// 懒加载
Vue.use(vueLzayLoad, {

  // 图片未加载回来使用这张图片进行占位
  loading: require('./assets/images/common/loading.svg'),
  error: require('./assets/images/common/error.svg')

})


Vue.config.productionTip = false;

// 定义事件总线
Vue.prototype.$bus = new Vue();

// 使用自定义弹窗插件
Vue.use(toast);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
