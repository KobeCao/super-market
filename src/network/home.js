// 引入requset.js文件
import {request} from "./request";

// getHomeMultidata()获取首页的多个数据
// home.vue面向home.js来开发，
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}
// 拿到正真请求的数据，.then()方法，因为return request({ url:'/home/multidata'})这个函数把request({url:'/home/multidata'})
// 函数的返回值返回了，而return request({ url:'/home/multidata'})这个函数的返回值是request.js里面的instance(config)。
// 因为instance(config)返回一个promise,所以request({url:'/home/multidata'})这个函数的返回值是promise。

// 请求对应的页码和数据类型
export function getHomeGoods(type,page) {
  return request({
    url: 'home/data',
    params: {
      type,
      page
    }
  })
}
