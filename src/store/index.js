import Vue from 'vue'
import Vuex from 'vuex'



import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 使用vuex状态管理插件
Vue.use(Vuex);

const state = {

    // 该数组是无迭代接口的数据，无es6的for-in语法
    shoppingCartGoodsInfo: [],
  }



  
const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
  
})


export default store




