<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!-- 轮播图 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 推荐信息 -->
    <recommend-view :recommends="recommends"></recommend-view>
    <!-- 本周流行 -->
    <feature-view></feature-view>
    <!-- 商品导航栏 -->
    <tab-control class="tab-control"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"></tab-control>
    <!-- 商品列表页 -->
    <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 返回顶部按钮 -->
    <!-- 修饰符.native 我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符，才能进行监听-->
    <!-- v-show="true" 当为true的时候就显示，false为隐藏 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import goodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll"
import BackTop from "components/content/backTop/BackTop"

//导入方法
import { getHomeMultidata, getHomeGoods } from "network/home";


export default {
  name: "Home",
  // 注册组件
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    goodsList,
    Scroll,
    BackTop
  },
  data() {
    // 将请求过来的数据进行保存
    return {
      banners: [],
      recommends: [],
      // 设计数据模型将请求到的数据进行分类保存
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop',  //默认当前的类型
      isShowBackTop: false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  // 组件创建完成之后发送网络请求, 实现一个生命周期函数
  created() {
    // 1. 请求多个数据,异步操作
    this.getHomeMultidata()
    //2. 请求商品数据 传入对应的类型
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /**
     * 事件监听相关的方法
    */
    tabClick(index) {  // 商品导航栏点击
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
    },
    backClick() {
      // 通过this.$refs.scroll拿到scroll组件对象
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position) { //显示隐藏箭头栏
    // 将传过来的position的值里面的x和y 坐标来进行判断
      this.isShowBackTop = (-position.y) > 1000

    },
    loadMore() { // 上拉加载更多
    // currentType表示正在记录着pop/new/sell这三个类型。只需要将currentType传到getHomeGoods()里面，
      this.getHomeGoods(this.currentType)
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // 通过res拿到请求的结果
        console.log(res);
        // this.result = res;
        // this在箭头函数里面往上找作用域,created()里面有this,所以箭头函数里面this找到的就是created里面的this,而created里面的
        // 的this就是当前组件的对象。所以： this.result拿到的就是data()里面的result。
        // 因为如果不使用this.result = res,将结果保存下来，res它会被回收，而使用了之后，res将对应的内存地址赋值给result，
        // res会被回收，而result不会被回收，

        // 从data对象里面对应的值，并且赋值给banners
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 把在goods里面的三个里面的一个放进去，根据传进来的页码取出页码,把类型和页码传进去，一旦发生请求，拿到最新的数据，然后再根据类型
    // 把它对应的list取出来，把最新的数据放到goods[type].list里面。
    getHomeGoods(type) {
      // 动态获取页码数page   this.goods[type].page当前的页码  在原来page(this.goods[type].page)的基础上加1,在把最新的page加上
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        // 将数据中的对应值传到goods里面的list
        this.goods[type].list.push(...res.data.list)
        // 更新页码
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      });
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky; /*粘性定位 */
  top: 40px;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
