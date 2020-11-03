<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 推荐信息 -->
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';

import {getHomeMultidata} from 'network/home';


export default {
  name: "Home",
  // 注册组件
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data() {  // 将请求过来的数据进行保存
    return {
      banners: [],
      recommends: []
    }
  },
  // 组件创建完成之后发送网络请求, 实现一个生命周期函数
  created() {
    // 1. 请求多个数据,异步操作
    getHomeMultidata().then(res => {  // 通过res拿到请求的结果
      console.log(res);
      // this.result = res;
      // this在箭头函数里面往上找作用域,created()里面有this,所以箭头函数里面this找到的就是created里面的this,而created里面的
      // 的this就是当前组件的对象。所以： this.result拿到的就是data()里面的result。
      // 因为如果不使用this.result = res,将结果保存下来，res它会被回收，而使用了之后，res将对应的内存地址赋值给result，
      // res会被回收，而result不会被回收，

      // 从data对象里面对应的值，并且赋值给banners
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  }
};
</script>

<style>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
