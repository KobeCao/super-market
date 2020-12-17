<template>
  <div id="home">

    <!-- 头部导航栏 -->
    <nav-bar class="home-nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 中间选项卡吸顶 -->
    <tab-control :titles="titles" ref="tabControlTop" @tabClick="tabClick" class="tab-control-top" v-show="isShowTabControl"></tab-control>


    <!-- 滑屏滚动 -->
    <scroll class="home-wrapper-scroll" 
            ref="scroll" 
            :probeType="3" 
            @scroll="getScrollPosition" 
            :pullUpLoad="true"
            @pullingUp="loadMore">

      <!-- home轮播图部分组件 -->
      <home-swiper :banners="banners" @homeSwiperImageLoaded="homeSwiperImageLoaded"></home-swiper>

      <!-- 首页中间图片导航组件 -->
      <home-recommend-view :recommends="recommends"></home-recommend-view>

      <!-- 首页本周流行组件 -->
      <the-week-popular></the-week-popular>

      <!-- 首页中间选项卡部分组件 -->
      <tab-control :titles="titles" ref="tabControl" @tabClick="tabClick"></tab-control>

      <!-- 首页下部的商品展示 -->
      <good-list :goods="showGoods"></good-list>
    </scroll>

    <!-- 返回顶部的小按键组件 -->
    <back-top @click.native="backTopClick" v-show="showBackTop"></back-top>




  </div>
  
</template>

<script>
  // 引入navbar组件
  import NavBar from 'components/common/navbar/NavBar.vue'

  // 导入首页的轮播图组件
  import HomeSwiper from './childComps/HomeSwiper'

  // 首页中间图片导航组件
  import HomeRecommendView from './childComps/HomeRecommendView'

  // home里的本周流行的图片
  import TheWeekPopular from './childComps/TheWeekPopular'

  // home中间选项卡组件
  import TabControl from 'components/content/tabControl/TabControl.vue'

  // 引入首页下部的商品展示组件
  import GoodList from 'components/content/goods/GoodsList.vue'

  // 引入封装的滑屏滚动的组件
  import Scroll from 'components/common/scroll/Scroll.vue'




  // 引入混入文件
  import Mixin from 'common/mixin'


  // 引入发送请求响应home页面的数据的函数
  import request from 'network/home'




  export default {
    name: 'Home',
    
    data () {
      return {

        // 保存轮播图里的数据
        banners: [],

        // 保存中间图片导航的数据
        recommends: [],

        // 首页中间的选项卡
        titles: ['流行', '新款', '精选'],

        // 首页下面根据点击的选项卡展示的数据
        goods: {
          pop: {page: 0, list:[]},
          new: {page: 0, list:[]},
          sell: {page: 0, list:[]},
        },

        // 设置选项卡默认选中pop
        currShow: 'pop',

        // 记录中间选项卡元素到顶部的高度
        tabControlOffsetTop: null,



        // 控制首页中间选项卡的吸顶效果是否展现
        isShowTabControl: false,

        // 记录页面切出元素的位置
        pageOffsetTop: 0,
      }
    },

    // 混入
    mixins: [Mixin.backTopMixin],


    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      TheWeekPopular,
      TabControl,
      GoodList,
      Scroll,
      // BackTop
    },

    // home组件创建时，请求home页里的数据并保存到data中
    created () {

      // 请求轮播图和图片导航的数据
      this.getHomeMultidata()

      // 请求选项卡里的数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

     
    },


    // 页面处于活跃状态（页面打开）
    activated () {



      // 重新更新home页面里的元素高度
      this.$refs.scroll.refresh();

      // 离开home页面再次进入时，打开的是离开时的位置
      this.$refs.scroll.scrollTo(0, this.pageOffsetTop, 0);

    },

    // 页面处于不活跃状态（页面关闭,但被缓存）
    deactivated () {

      // 记录离开时页面的位置
      this.pageOffsetTop = this.$refs.scroll.getCurrScrollY();
    },

    methods: {
      // 事件监听相关的方法

      // 首页中间选项卡的点击事件
      tabClick (index) {
        switch (index) {
          case 0:
            this.currShow = 'pop';
            break;

          case 1:
            this.currShow = 'new';
            break;

          case 2:
            this.currShow = 'sell';
            break;
        }

        // 让吸顶和不吸顶的选项卡展示的数据一致
        this.$refs.tabControl.currIndex = index;
        this.$refs.tabControlTop.currIndex = index;
        
      },


      // 上拉加载更多数据
      loadMore () {

        // 请求商品列表数据
        this.getHomeGoods (this.currShow);

        // 每次上拉都能加载数据
        this.$refs.scroll.finishPullUp();
      },





      // 监听轮播图片是否加载完成
      homeSwiperImageLoaded () {

        // 计算中间选项卡元素到顶部的高度，并保存
        this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop;
      },







      // 网络请求相关的方法
      // 请求轮播图和图片导航的数据具体实现
      getHomeMultidata () {
        request.getHomeMultidata().then(res => {

          // console.log('首页轮播图和图片导航的数据', res);

          // 将数据保存到data里
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },

      // 请求选项卡里的数据具体实现
      getHomeGoods (type) {
        const page = this.goods[type].page + 1;
        request.getHomeGoods(type, page).then(res => {

          // console.log('请求选项卡里'+ type + '的第'+ page +'页数据', res);

          // 将请求到的数据添加到data中，并做好页码标示
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        })
      },

      
     
    },

    computed: {
      
      // 获取v选项卡当前列表里的数据
      showGoods () {
        return this.goods[this.currShow].list;
      }
    }
  }
</script>

<style scoped>

  #home{
    position: relative;
    height: 100vh;
  }

  .home-nav-bar{
    z-index: 2;
    font-size: 20px;
    font-weight: 600;
    font-family: '宋体';
    color: #fff;
    background-color: var(--color-tint);

  }

  .home-wrapper-scroll{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
    overflow: hidden;
  }
  .tab-control-top{
    position: relative;
    z-index: 2;
    margin-top: -1px;
  }


</style>
