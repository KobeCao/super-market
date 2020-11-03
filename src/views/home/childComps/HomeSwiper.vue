<template>
  <swiper>
      <swiper-item v-for="item in banners" :key="item.index">
        <!--因为SwperItem预留了插条，所以将在banners里面取出的数据插入里面 -->
         <a :href="item.link">
           <img :src="item.image" alt="">
         </a>
      </swiper-item>
    </swiper>
</template>

<script>
// 因为在swiper文件里面导出的时候是对象，
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: "HomeSwiper",
  // 获取数据
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>

<style>

</style>
