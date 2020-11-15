<template>
  <div class="goodsItem.show.img" @click="itemCilck">
    <!-- 商品图片 -->
    <img :src="goodsItem" alt="" @load="imagLoad">
    <div class="goods-info">
      <!-- 商品描述 -->
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return []
      }
    }
  },
  methods: {
    // 监听到图片加载完之后执行imagLoad函数
    imagLoad() {
      // 通过$emit发射出去itemImageLoad事件,因为$bus为空，所以通过原型给$bus赋值一个Vue实例，因为Vue实例是可以作为我们事件总线的
      // 此时$bus就是一个Vues实例，就可以用new出来的Vue实例发射事件，并且也可以用new出来的Vue实例监听事件。
      this.$bus.$emit('itemImageLoad')
    },
    itemClick() {
      console.log(this.goodsItem.iid);
    }
  }
}
</script>

<style>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
