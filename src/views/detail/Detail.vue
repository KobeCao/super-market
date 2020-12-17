<template>
  <div id="detail">
    <!-- 头部导航栏 -->
    <detail-nav-bar
      class="detail-nav-bar"
      @detailNavBarClick="detailNavBarClick"
      ref="detailNavBar"
    ></detail-nav-bar>

    <!-- 滑屏滚动 -->
    <scroll
      class="detail-wrapper-scroll"
      ref="scroll"
      @scroll="contentScroll"
      :probeType="3"
    >
      <!-- 轮播图 -->
      <detail-swiper
        :topImages="topImages"
        @detailSwiperImageLoaded="detailSwiperImageLoaded"
      ></detail-swiper>

      <!--商品介绍 -->
      <detail-base-info :goods="goods"></detail-base-info>

      <!-- 商品店家信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>

      <!-- 商品具体信息及穿着展示图片信息 -->
      <detail-goods-info
        :detailInfo="detailInfo"
        @detailGoodsAllImagesLoaded="detailSwiperImageLoaded"
      ></detail-goods-info>

      <!--  商品尺码参数等信息 -->
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>

      <!-- 商品评论信息 -->
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>

      <!-- 更多商品推荐 -->
      <detail-recommend-info
        :recommendGoods="recommendGoods"
        ref="recommend"
      ></detail-recommend-info>
    </scroll>

    <!-- 回到顶部 -->
    <back-top @click.native="backTopClick" v-show="showBackTop"></back-top>

    <!-- 底部加入购物车 -->
    <detail-bottom-bar @addGoodToCart="toCartGoodInfo"></detail-bottom-bar>
  </div>
</template>

<script>
// 导航栏组件
import DetailNavBar from "./childComps/DetailNavBar";

// 商品的轮播图组件
import DetailSwiper from "./childComps/DetailSwiper";

// 商品介绍组件
import DetailBaseInfo from "./childComps/DetailBaseInfo";

// 商品店铺组件
import DetailShopInfo from "./childComps/DetailShopInfo";

// 滑屏滚动组件
import Scroll from "components/common/scroll/Scroll";

// 商品具体信息及穿着展示图片组件
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";

// 商品尺码参数等信息的组件
import DetailParamInfo from "./childComps/DetailParamInfo";

// 商品评论信息组件
import DetailCommentInfo from "./childComps/DetailCommentInfo";

// 更多商品推荐组件
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";

// 加入购物车组件
import DetailBottomBar from "./childComps/DetailBottomBar";

// 引入发送请求商品详情数据的函数
import request from "network/detail";

// 引入混入文件
import Mixin from "common/mixin";

// 引入辅助函数
import { mapActions } from "vuex";

export default {
  name: "Detail",
  data() {
    return {
      // 商品的id
      id: "",

      // 请求到的商品详情的轮播图数据
      topImages: [],

      // 商品标题简单介绍里的数据
      goods: {},

      // 商品店家的信息
      shop: {},

      // 商品具体信息及穿着展示图片信息
      detailInfo: {},

      // 商品尺寸参数等信息
      paramInfo: {},

      // 商品评论相关信息
      commentInfo: {},

      // 更多商品推荐信息
      recommendGoods: [],

      // 商品详情页的导航栏里各个主题的高度
      themeTopYs: [],

      // 记录当前顶部导航栏的主题
      currIndex: 0,
    };
  },

  mixins: [Mixin.backTopMixin],

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
  },

  created() {
    // 请求商品的信息的数据
    this._getDetaileData();

    // 请求更多商品推荐的数据
    this._getRcommendData();
  },

  methods: {
    // 映射store里的actions中的函数
    ...mapActions(["getGoodsInfo"]),

    // 当轮播图图片加载回来让better-scroll对象重新获取content的高度
    detailSwiperImageLoaded() {
      this.$refs.scroll.refresh();

      // 获取顶部导航栏各主题的高度
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    },

    // 实时获取页面滚动位置
    contentScroll(position) {
      let y = -position.y;

      // 回到顶部的小图标
      this.showBackTopImage(y);

      // 遍历各主题的高度并
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        // 对频繁的高度判断进行防抖
        if (this.currIndex != i) {
          // 判断页面滚动的高度是否超过
          if (y >= this.themeTopYs[i] && y < this.themeTopYs[i + 1]) {
            this.currIndex = i;

            // 修改导航栏里的主题索引
            this.$refs.detailNavBar.currIndex = i;
          }
        }
      }
    },

    // 加入购物车发来的点击事件
    toCartGoodInfo() {
      // 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.realPrice = this.goods.realPrice;
      product.id = this.id;

      // 将数据发送到vuex状态管理对象中
      // this.$store.dispatch('getGoodsInfo', product);
      this.getGoodsInfo(product).then((res) => {
        this.$toast.show("加入购物车成功~~", 2000);
      });
    },

    // 商品详情页的头部导航栏组件发送来点击事件
    detailNavBarClick(index) {
      // 让页面根据传来的索引滚动到相应位置
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000);
    },

    // 请求商品的信息
    _getDetaileData() {
      this.id = this.$route.query.iid;
      // 拿到点击到的商品的id，发送请求
      request.getDetaile(this.id).then((res) => {
        const data = res.result;

        // 轮播图数据
        this.topImages = data.itemInfo.topImages;

        // 商品介绍的数据
        this.goods = new request.GoodInfo(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );

        // 商品店家的信息数据
        this.shop = new request.Shop(data.shopInfo);

        // 商品具体信息及穿着展示图片数据
        this.detailInfo = data.detailInfo;

        // 商品尺码等数据
        this.paramInfo = new request.GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        // 商品评论数据
        this.commentInfo = data.rate.list[0];
      });
    },

    // 请求更多商品推荐数据
    _getRcommendData() {
      request.getRecommend().then((res) => {
        this.recommendGoods = res.data.list;
      });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  height: 100vh;
  z-index: 9;
  background-color: #fff;
}
.detail-nav-bar {
  position: relative;
  z-index: 2;
  background-color: #fff;
}

.detail-wrapper-scroll {
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0px;
  left: 0px;
  overflow: hidden;
}
</style>
