<template>
  <div>
    <nav-bar>
      <div slot="center" class="title">
        <div v-for="item in titles" :key="item.index" class="title-item">{{item}}</div>
      </div>
     </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleCilck(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 13px;
  }
</style>
