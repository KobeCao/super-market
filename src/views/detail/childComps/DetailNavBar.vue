<template>
  <div>
    <nav-bar>
      
      <!-- 返回首页的小图标 -->
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/images/common/back.svg" alt="">
      </div>

      <!-- 商品导航栏 -->
      <div slot="center" class="title">
        <div v-for="(item, index) in title" :key="item" class="title-item" @click="itemClick(index)" :class="{itemActive: index == currIndex}">{{item}}</div>
      </div>

    </nav-bar>
  </div>
</template>

<script>

  // 引入公共的头部导航组件
  import NavBar from 'components/common/navbar/NavBar.vue'

  export default {
    data () {
      return {

        // 商品详情的头部导航
        title: ['商品', '参数', '评论', '推荐'],

        // 记录当前点击的商品里的头部信息
        currIndex: 0,

      }
    },

    components:{
      NavBar,
    },

    methods: {
      
      itemClick (index) {
        this.currIndex = index;
        this.$emit('detailNavBarClick', index)
      },

      backClick () {
        this.$router.back();
      }
      
    }
    
  }
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 14px;
  }
  .title-item{
    flex: 1;
  }
  .itemActive{
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 12px;
  }
</style>