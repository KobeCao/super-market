// 导入常量
import {
  ADD_COUNTER,
  ADD_T0_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
   return new Promise((resolve,reject) => {
      //payload新添加的商品
    let oldProduct = null;
    for (let item of context.state.cartList) {
      if (item.iid === payload.iid) {
        oldProduct = item;
      }
    }
    // 2. 判断oldProduct
    if (oldProduct) { // 数量+1
      context.commit(ADD_COUNTER, oldProduct)
      resolve('当前的商品数量+1')
    } else { // 添加新的商品
      payload.count = 1;
      context.commit(ADD_T0_CART, payload)
      resolve('添加了新的商品')
    }
   })
  }
}
