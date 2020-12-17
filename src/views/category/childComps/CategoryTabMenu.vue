<template>
  <!-- 商品分类页侧边列表 -->
  <scroll class="category-left-list" ref="scroll">
    <div class="left-list-item"
          v-for="(item, index) in categoryDataList"
          :class="{titleActive: index == currIndex}"
          :key="index"
          @click="activeClick(index)">{{item.title}}
    </div>
  </scroll>
</template>
<script>
  import Scroll from 'components/common/scroll/Scroll'
  export default {
    props: {
      categoryDataList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        currIndex: 0
      }
    },
        // 页面处于活跃状态（页面打开）
    updated () {
      // 重新更新home页面里的元素高度
      this.$refs.scroll.refresh();
      // 离开home页面再次进入时，打开的是离开时的位置
      // this.$refs.scroll.scrollTo(0, this.pageOffsetTop, 0);
    },

    components: {
      Scroll,
    },
    methods: {
      activeClick (index) {
        this.currIndex = index;
        // 把点击到的菜单索引发送出去
        this.$emit('menuIndex', index)
      }
    }
  }
</script>
<style scoped>
.category-left-list{
  height: calc(100vh - 93px);
  width: 25%;
  overflow: hidden;
}
.left-list-item{
  height: 47px;
  width: 100%;
  line-height: 47px;
  text-align: center;
  font-size: 14px;
  border-left: 3px solid transparent;
  background-color: #eee;
}
.titleActive{
  border-left: 3px solid var(--color-tint);
  font-size: 17px;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 1);
  color: var(--color-tint);
}
</style>
