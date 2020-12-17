<template>
  <div id="app">
    <!-- 将页面缓存 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>
<script>
// 首页头部的导航部分
import MainTabBar from 'components/content/mainTabBar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar,
  }
}
</script>

<style>

/* 引入初始化样式文件 */
  @import 'assets/css/base.css'

</style>
