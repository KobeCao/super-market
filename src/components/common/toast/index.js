// 引入弹窗组件
import Toast from './Toast'

const obj = {}

// 必须要有变量来接收传过来的vue,否则函数不执行
obj.install = Vue => {

  // 将弹窗插件里的模板插入到页面
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast);

  // 2.通过new组件构造器来创建一个组件对象(该对象保存了弹窗组件的 html模板、methods里定义的方法、data里保存的数据、css样式)
  const toast = new toastConstructor();

  // 3.将创建的元素挂载到组件对象上
  toast.$mount(document.createElement('div'));

  // 4.将将弹窗插件里的模板插入到页面中（刚才创建的div里）
  document.body.appendChild(toast.$el);

  // 将弹窗组件上的属性、方法挂载到Vue原型上，以便调用
  Vue.prototype.$toast = toast;
}

export default obj
