<template>
  <div class="goods-list">
   
    <goods-list-item v-for="(item, index) in goods" :key="item.acm" :goodsItem="goods[index]"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue';

  export default {
    props: {
      goods: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    components: {
      GoodsListItem

    },
   
  }
</script>

<style scoped>
  .goods-list{
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: space-around;
    padding: 5px;
  }

</style>