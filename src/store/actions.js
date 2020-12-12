// 导入常量
import {
  ADD_COUNTER,
  ADD_T0_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    //payload新添加的商品
    let oldProduct = null;
    for (let item of context.state.cartList) {
      if (item.iid === payload.iid) {
        oldProduct = item;
      }
    }
    // 2. 判断oldProduct
    if (oldProduct) {
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1;
      context.commit(ADD_T0_CART, payload)
    }
  }
}
