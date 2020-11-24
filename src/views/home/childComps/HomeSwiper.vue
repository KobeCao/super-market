<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.index">
      <!-- 在data()里面的banners里面取出数据，在</swiper-item>进行展示，
        因为</swiper-item>已经预留了插条 -->
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
//导入轮播图组件
import {Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style>
</style>
