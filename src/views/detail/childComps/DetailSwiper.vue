<template>
  <div>
    <swiper class="detail-swiper" v-if="topImages.length">
      <swiper-item class="item" v-for="(item, index) in topImages" :key="index">
        <img :src="item" @load="imageLoad">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

	export default {
		name: "DetailSwiper",
    props: {
		  topImages: {
		    type: Array,
        default() {
		      return []
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
  .item {
    text-align: center;
    height: 300px;
  }
</style>
