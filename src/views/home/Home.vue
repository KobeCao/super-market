<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tab-control" v-show="isTabFixed">
        </tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- 推荐信息 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行 -->
      <feature-view></feature-view>
      <!-- 商品导航栏 -->
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2">
        </tab-control>
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
import goodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

//导入方法
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

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
    BackTop,
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
      currentType: "pop", //默认当前的类型
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,  // 默认不吸顶
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // 跳转页面恢复原来的位置
  destroyed() {
    console.log('home destroyed');
  },
  // 生命周期钩子
  activated() { //activate：是在被包裹组建被激活的状态下使用的生命周期钩子
    this.$refs.scroll.scrollTo(0,this.saveY,0),
    this.$refs.scroll.refresh()
  },
  deactivated() { // deactivated：在被包裹组件停止使用时调用
    this.saveY = this.$refs.scroll.getScrollY()
  },
  // 组件创建完成之后发送网络请求, 实现一个生命周期函数
  created() {
    // 1. 请求多个数据,异步操作
    this.getHomeMultidata();
    // 2. 请求商品数据 传入对应的类型
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
      // this.$refs.scroll.refresh()
    });
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      // 商品导航栏点击
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      // 让点击的两个导航保持一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // 通过this.$refs.scroll拿到scroll组件对象
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      //1.判断BackTop是否显示 隐藏箭头栏
        //将传过来的position的值里面的x和y 坐标来进行判断
      this.isShowBackTop = -position.y > 1000;

      //2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      // console.log("加载很多");
      this.getHomeGoods(this.currentType);
    },
    // 获取tabControl的offsetTop
    // 所有的组件都有一个属性$el：用于获取组件中的元素
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // 通过res拿到请求的结果
        // console.log(res);
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
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // 将数据中的对应值传到goods里面的list
        this.goods[type].list.push(...res.data.list);
        // 更新页码
        this.goods[type].page += 1;

        //完成了上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
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
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
