<template>
  <div id="detail">
    <!-- 头部导航栏 -->
    <detail-nav-bar class="detail-nav" @titleCilck="titleCilck" ref="nav"/>
    <!-- 滑屏滚动 -->
    <scroll class="content"
     ref="scroll"
     :probe-type="3"
     @scroll="contentScroll">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages" />
       <!--商品介绍 -->
      <detail-base-info :goods="goods"/>
      <!-- 商品店家信息 -->
      <detail-shop-info :shop="shop"/>
      <!-- 商品具体信息及穿着展示图片信息 -->
      <!-- <detail-goods-info :detail-info="detailInfo" ></detail-goods-info> -->
      <!--  商品尺码参数等信息 -->
      <detail-param-info ref="param" :param-info="paramInfo"/>
        <!-- 商品评论信息 -->
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <!-- 更多商品推荐 -->
       <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <!-- 底部工具栏 -->
    <detail-bottom-bar @addCart="addToCart" />
     <!-- 箭头按钮 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  // import Toast from 'components/common/toast/Toast'

  import {getDetail, Goods, Shop, GoodsParam,getRecommend} from "network/detail";
  import { debounce } from 'common/utils';
  import {itemListenerMixin,backTopMixin} from "common/mixin"
  // 导入vuex中的mapActions方法
  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      // Toast
    },
    mixins: [itemListenerMixin,backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        isShowBackTop: false,
        // message: '',
        // show: false,
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        // console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6. 获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      // 3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
    },
    updated() {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener);
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh()
      },
      titleCilck(index) {
        console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index],200)
      },
      contentScroll(position) {
        // 1.获取y值
        const positionY = -position.y
        // 2. 使用positionY和主题中的的值进行对比，来决定当前应该显示哪一个index
        let length = this.themeTopYs.length;
        for(let i = 0; i < length-1; i++) {
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <
          this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
          // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i]
          // && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >
          // this.themeTopYs[i]))) {
          //   this.currentIndex = i;
          //   console.log(this.currentIndex);
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }

        }
        // 3. 判断BackTop是否显示回到顶部
        this.listenshoBackTop(position)
      },
      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        // 调用topImages: []数组里面的图片
        product.image = this.topImages[0];
        // 调用 goods: {}对象里面的文字
        product.title = this.goods.title;
        // 调用 goods: {}对象里面的描述信息
        product.desc = this.goods.desc;
        // 调用 goods: {}对象里面的价格,因为商品价格是个区间，所以将商品价格不能写死。
        // 需要在goods里面将数据换成固定的
        product.price = this.goods.realPrice;
        // 商品的iid也要传到购物车里面，因为Iid是商品的唯一标识，
        product.iid = this.iid;

        // 2.将商品添加到购物车里面
        // this.$store.commit('addCart',product)
        this.addCart(product).then(res => {
          this.$toast.show(res)
        })
        // this.$store.dispatch('addCart',product).then(res => {
        //       console.log(res);
        // })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
