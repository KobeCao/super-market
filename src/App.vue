<template>
  <div id="app">
    <keep-alive exclude="Detail">
    <!-- 每次点击详情页面都是请求一个新数据，详情页面都要新建一个新的组件，所以Detail不需要keep-alive,
    exclude任何匹配的组件都不会被缓存。exclude="Deatil" 排除在外-->
    <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'

  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
