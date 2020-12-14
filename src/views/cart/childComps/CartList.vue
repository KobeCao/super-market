<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList"
      :key="index"
      :item-info="item">
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
// 导入Scroll滚动组件
import Scroll from 'components/common/scroll/Scroll'
// 导入CartListItem组件
import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 35px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
