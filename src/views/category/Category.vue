<template>
  <div id="gategory">
    <!-- 头部导航 -->
    <nav-bar class="category-nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <!-- 左侧菜单栏列表 -->
    <category-tab-menu></category-tab-menu>
  </div>
</template>
<script>
  // 导入导航栏组件
  import NavBar from 'components/common/navbar/NavBar';
  //导入左侧菜单栏列表组件
  import CategoryTabMenu from './childComps/CategoryTabMenu';
  // 引入发送请求响应category页面的数据的函数
  import {getCategory }  from "network/category";
  export default {
    name: 'Category',
    // data() {
    //   return {
    //     categoryDataList: [],
    //   }
    // },
    components: {
      NavBar,
      CategoryTabMenu,
    },
    created() {
      getCategory().then( res => {
        console.log(res);
        // this.categoryDataList = res.data.category.list
        // console.log(categoryDataList);
      })
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
</style>
