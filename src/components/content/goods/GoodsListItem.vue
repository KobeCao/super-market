<template>
  <div class="goods-list-item" @click="itemClick">
      <img v-lazy="getImageUrl" alt="" @load="imageLoaded">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
  
</template>

<script>
  export default {
    props: {
      goodsItem: {
        type: Object,
        default () {
          return {};
        }
      }
    },

    methods: {

      // 当有图片加载成功就发送一个“有张图片加载成功的事件”，首页监听到该事件就触发执行从新计算better-scroll里的content区域高度的函数
      imageLoaded () {
        this.$bus.$emit('itemImageLoaded');
      },

      // 商品的点击事件
      itemClick () {
        this.$router.push({
          path: '/detail',
          query: {
            iid: this.goodsItem.iid 
          }
        })
      }
    },
    computed: {
      
      // 兼容首页和商品详情里的商品列表的图片的引入URL地址
      getImageUrl () {
        if (this.goodsItem.show) {
          return this.goodsItem.show.img;
        }else if (this.goodsItem.image) { 
          return this.goodsItem.image;
        }else{
          return this.goodsItem.img
        }
      }
    }
  }
</script>

<style scoped>
  .goods-list-item {
    padding-bottom: 40px;
    position: relative;

    width: 47%;
  }

  .goods-list-item img {
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
    margin-right: 30px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
  }
</style>