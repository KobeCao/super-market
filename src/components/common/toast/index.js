// 导入Toast组件
import Toast from './Toast.vue'
const obj = {
}
obj.install = function(Vue) {
  // 1. 先创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2. 通过new的方式，根据组件构造器可以创建出来一个组件对象
  const toast = new toastContrustor()

  // 3. 将toast组件对象，手动的挂载到某一个元素上,相当于toast已经被挂载到div上面了
  toast.$mount(document.createElement('div'))

  // 4. toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast;
}
export default obj
