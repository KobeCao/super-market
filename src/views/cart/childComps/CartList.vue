<template>
  <div class="cart-list">

    <scroll class="wrapper" ref="scroll">

      <cart-list-item :itemInfo="item" v-for="(item, index) in list" :key="index"></cart-list-item>

    </scroll> 
    
  </div>
</template>

<script>

  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      Scroll,
      CartListItem
    },

    activated () {

      // 当购物车页面处于活跃状态时，让better-scroll对象从新获取页面高度
      this.$refs.scroll.refresh();
    },

    computed: {
      ...mapGetters({list: 'getCartList'})
    }
    
  }
</script>

<style scoped>

  .wrapper{
    position: absolute;
    width: 100%;
    top: 44px;
    bottom: 89px;
    overflow: hidden;
  }

</style>