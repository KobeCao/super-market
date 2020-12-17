<template>
  <div id="gategory">

    <!-- 头部导航 -->
    <nav-bar class="category-nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>

    <!-- 左侧菜单栏列表 -->
    <category-tab-menu :categoryDataList="categoryDataList" @menuIndex="menuIndex"></category-tab-menu>

    <!-- 右侧中间导航部分吸顶 -->
    <tab-control class="category-tab-control-top" ref="categoryTabControlTop" :titles="['综合', '新品', '销量']" @tabClick="tabControlClick" v-show="isShowTabControl"></tab-control>

    <scroll class="category-wrapper-scroll"
            ref="scroll"
            :probeType="3"
            @scroll="getScrollPosition">

      <!-- 右侧上部网格列表部分列表的具体分类 -->
      <category-tab-content  :varieticeList="varieticeList" @categoryTabContentImageLoaded="categoryTabContentImageLoaded"></category-tab-content>


      <!-- 右侧中间导航部分 -->
      <tab-control ref="categoryTabControl" :titles="['综合', '新品', '销量']" @tabClick="tabControlClick"></tab-control>

      <!-- 右下部商品展示部分 -->
      <goods-list :goods="goodsInfo"></goods-list>


    </scroll>

    <!-- 返回顶部的小按键组件 -->
    <back-top @click.native="backTopClick" v-show="showBackTop"></back-top>


  </div>
</template>

<script>

  import NavBar from 'components/common/navbar/NavBar'

  import CategoryTabMenu from './childComps/CategoryTabMenu'

  import CategoryTabContent from './childComps/CategoryTabContent'

  import Scroll from 'components/common/scroll/Scroll'

  import TabControl from 'components/content/tabControl/TabControl'

  import BackTop from 'components/content/backTop/BackTop'

  // 引入混入文件
  import Mixin from 'common/mixin'
  // 引入发送请求响应category页面的数据的函数
  import request from 'network/category'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  export default {
    name: 'Category',
    data () {
      return {
        categoryDataList: [],
        // 子菜单的索引
        currIndex: -1,
        categoryInfo: {},
        currShowGoods: 'pop',
        // 记录右侧选项卡元素到顶部的高度
        tabControlOffsetTop: null,
        // 控制首页中间选项卡的吸顶效果是否展现
        isShowTabControl: false,
      }
    },
    components: {
      NavBar,
      CategoryTabMenu,
      CategoryTabContent,
      Scroll,
      TabControl,
      GoodsList,
      BackTop
    },
    // 混入
      mixins: [Mixin.backTopMixin],
    // category组件创建时
    created () {
      request.getCategory().then( (res) => {
        // 请求数据category页的菜单数据并保存到data中
        this.categoryDataList = res.data.category.list;
        // console.log(this.categoryDataList);


          // 保存数据的格式
          // {
          //   某个子菜单的数据 {
          //       该子菜单下的所有品类 {}，
          //       某个品类的数据 {
          //           pop: [],
          //           new: [],
          //           sell: []
          //        }
          //   }
          // }
        let len = this.categoryDataList.length
        for (let i = 0; i < len; i++) {
          this.categoryInfo[i] = {

            // 某子菜单下的所有品类
            varieticeData : {},

            // 某品类里的商品
            goodsControlData : {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }

        // 默认获取第一个子菜单里的所有品类的数据
        this._getVarieticeData(0);
      })

    },

    activated () {



      // 重新更新home页面里的元素高度
      this.$refs.scroll.refresh();

    },

    methods: {


      // 获取某子菜单里的所有品类的数据
      _getVarieticeData (index) {

        let maitKey = this.categoryDataList[index].maitKey;
        request.getVarietice(maitKey).then( (res) => {

          // 系统会默认为以Array的数据类型将数据保存起来，不便于后续的取保存的数据
          this.categoryInfo[index].varieticeData = res.data;

          // 将数组类型数据收集为对象类型
          this.categoryInfo = {...this.categoryInfo}

          // 修改当前记录的子菜单索引
          this.currIndex = index;


          // 获取某品类里的所有数据
          this._goodsControlData('pop');
          this._goodsControlData('new');
          this._goodsControlData('sell');




          // 刷新页面高度
          this.$refs.scroll.refresh();
        })
      },


      // 获取某品类里的某个tabControl按钮里的数据
      _goodsControlData(type) {

        // 获取请求的miniWallkey
        const miniWallkey = this.categoryDataList[this.currIndex].miniWallkey;

        // 发送请求,传入miniWallkey和type
		    request.getVarieticeGoods(miniWallkey, type).then(res => {

		      // 3.将获取的数据保存下来
		      this.categoryInfo[this.currIndex].goodsControlData[type] = res
          this.categoryInfo = {...this.categoryInfo}

        })
      },



      categoryTabContentImageLoaded () {
        this.tabControlOffsetTop = this.$refs.categoryTabControl.$el.offsetTop;
      },







      // 获取点击到的子菜单的索引
      menuIndex (index) {
        this.currIndex = index;
        this._getVarieticeData (index);
      },


      // 获取tabControl里的索引
      tabControlClick (index) {
        switch (index) {
          case 0:
            this.currShowGoods = 'pop';
            break;

          case 1:
            this.currShowGoods = 'new';
            break;

          case 2:
            this.currShowGoods = 'sell';
            break;
        }

        // 让吸顶和不吸顶的选项卡展示的数据一致
        this.$refs.categoryTabControl.currIndex = index;
        this.$refs.categoryTabControlTop.currIndex = index;

      },




    },

    computed: {

      // DOM元素创建时就会根据currIndex去拿varieticeData里的数据，而这里的数据还没响应回来，就会报错,
       varieticeList () {

        return this.currIndex != -1 ? this.categoryInfo[this.currIndex].varieticeData : {};
      },

      goodsInfo () {
        console.log()
        return this.currIndex != -1 ? this.categoryInfo[this.currIndex].goodsControlData[this.currShowGoods] : [];

      }
    }
  }
</script>

<style scoped>
#gategory{
  width: 100%;
}
.category-nav-bar{
  z-index: 2;
  font-size: 20px;
  font-weight: 600;
  font-family: '宋体';
  color: #fff;
  background-color: var(--color-tint);
}
.category-wrapper-scroll{
  position: absolute;
  height: calc(100vh - 93px);
  right: 0px;
  top: 45px;
  width: 75%;
  overflow: hidden;
}
.category-tab-control-top{
    position: absolute;
    width: 75%;
    right: 0px;
    top: 45px;
    margin-top: -1px;
    z-index: 3;
}

</style>
