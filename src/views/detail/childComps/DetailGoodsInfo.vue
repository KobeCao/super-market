<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" v-lazy="item" alt="" :key="index" @load="detailGoodsImageLoaded">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      detailInfo: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        imageLoadedCound: null,
      }
    },

    methods: {
      detailGoodsImageLoaded () {

        // 每次有图片加载成功都判断当前商品详情里的图片是否加载过3/4，如果过半则认为所有图片都加载过来，然后发送自定义事件
        this.imageLoadedCound >= this.detailInfo.detailImage[0].list.length * 3 / 4 && this.$emit('detailGoodsAllImagesLoaded');

        // 不过半就次数加一
        this.imageLoadedCound++;
      }
    }

  }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before,
  .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0px;
  }

  .info-desc .end::after {
    right: 0px;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
