<template>
  <div id="cart">

    <!-- 购物车导航栏 -->
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>


    <!-- 商品列表 -->
    <cart-list></cart-list>



    <!-- 底部计算选中商品的总价格 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
    
  
</template>

<script>

  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  // vuex里定义的一个辅助函数，将 store 中的 getter 映射到局部计算属性（computed）中
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {

      }
    },
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {

      // 将store里的getters中定义的函数展开到computed对象中
      ...mapGetters({
        length:'getGoodsNumber',
      })
    }
  }
</script>

<style scoped>


  .cart-nav-bar{
    font-size: 20px;
    font-weight: 600;
    font-family: '宋体';
    color: #fff;
    background-color: var(--color-tint);
  }

</style>