<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'

export default {
  name: "Detail",
  components: {
    DetailNavBar
  },
  data() {
    return {
      iid: null  // 默认是null
    }
  },
  created() {
    // 拿到详情页面
    console.log(this.$route.params);
    this.iid = this.$route.params.iid
  }
}
</script>

<style>

</style>
