<template>
  <!-- 使用v-if有数据的时候再展示，没有数据不用展示 -->
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <!-- 商品的标题 -->
    <div class="info-title">{{ goods.title }}</div>
    <!-- 商品的价格 -->
    <div class="info-price">
      <!-- 商品的最新价格 -->
      <span class="n-price">{{ goods.newPrice }}</span>
      <!-- 商品的旧价格 -->
      <span class="0-price">{{ goods.oldPrice }}</span>
      <!-- 商品的折扣/火热促销 -->
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <!-- 销量 -->
      <span>{{ goods.columns[0] }}</span>
      <!-- 收藏 -->
      <span>{{ goods.columns[1] }}</span>
      <!-- 这里展示的是services数据里面的最后一条数据 -->
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <!-- 遍历services的时候减去1，在上面已经使用了 -->
      <span class="info-service-item" v-for="index in goods.services.length - 1"
      :key="index">
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index-1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBbaseInfo",
  props: {
    goods: {
      type: Object,
      dafault() {
        return {}
      }
    }
  }
};
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-title {
    color: #222
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }

  .info-price .o-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }

  .info-price .discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;

    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -8px;
  }

  .info-other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }

  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }

  .info-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .info-service-item span {
    font-size: 13px;
    color: #333;
  }
</style>
