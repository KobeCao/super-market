<template>
  <!-- 商品详情轮播图 -->
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages" :key="item">
      <img v-lazy="item" alt="" @load="imageLoad">
    </swiper-item>
  </swiper>

</template>

<script>
  // 引入公共轮播图组件
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    props:{
      topImages: {
        type: Array,
        default () {
          return [];
        }
      }
      
    },
    data () {
      return {
        isLoad: false
      }
    },
    
    components: {
      Swiper,
      SwiperItem
    },

    methods:{
      imageLoad () {
        !this.isLoad && this.$emit('detailSwiperImageLoaded');
        this.isLoad = true;
      }
    }
    
  }
</script>

<style scoped>

  .detail-swiper img{
    height: 420px;
  }
</style>