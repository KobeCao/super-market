<template>
  <!-- home轮播图组件 -->
  <swiper>
      <swiper-item v-for="item in banners" :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>

// 导入首页的轮播图组件
import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    props: {
      banners:{
        type: Array,
        default () {
          return [];
        }
      }
    },
    data () {
      return {
        isLoad: false,
      }
    },

    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad () {
        !this.isLoad && this.$emit('homeSwiperImageLoaded');
        this.isLoad = true;
      }
    }
  }
 
</script>

<style scoped>
  img{
    border-radius:10px;

  }
</style>