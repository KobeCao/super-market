<template>
  <div class="goods">
    <!-- 从goods里面遍历出来的一个一个item，传入到item里面,到时候GoodsListItem.vue里面就可以拿到一个一个小item -->
    <goods-list-item
      v-for="item in goods"
      :goods-item="item"
      :key="item.index"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      dafault() {
        return [];
      },
    },
  },
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;
}

</style>
