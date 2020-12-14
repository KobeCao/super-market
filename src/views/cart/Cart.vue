<template>
  <div class="cart">
    <!-- 导航界面 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list></cart-list>
    <!-- 底部的汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
// 导入导航栏组件
import NavBar from 'components/common/navbar/NavBar';
// 导入子组件CartList
import CartList from './childComps/CartList';
// 导入底部工具栏组件
import CartBottomBar from './childComps/CartBottomBar';
// 导入vuex模块中的mapGetters方法
import { mapGetters } from 'vuex'
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //两种语法
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length: 'cartLength',
    })
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
