<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">

    <!-- 商品标题 -->
    <div class="info-title">{{goods.title}}</div>

    <!-- 商品描述 -->
    <div class="info-desc">{{goods.desc}}</div>

    <!-- 商品价格 -->
    <div class="info-price">
      <span class="n-price">{{getRealPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>

    <!-- 商品的其他信息 -->
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>

    <!-- 售后服务 -->
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>

  </div>


  
</template>

<script>
  export default {
    props:{
      goods: { 
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      getRealPrice () {
        if (this.goods.newPrice.indexOf('~') == -1) {
          return this.goods.newPrice
        }else{
          return this.goods.realPrice
        }
      }

    }

    
  }
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

  .info-desc{
    font-size: 10px;
    margin-top: 5px;
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
    margin-left: 70px;
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
    top: -4px;
  }

  .info-other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 2px solid rgba(100,100,100,.2);
    justify-content: space-between;
  }

  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }

  .info-service-item img {
    width: 12px;
    height: 12px;
    position: relative;
    top: 2px;
  }

  .info-service-item span {
    font-size: 12px;
    color: #999;
  }
</style>