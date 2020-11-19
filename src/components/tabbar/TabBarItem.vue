<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 不活跃的时候展示 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <!-- 活跃的时候展示 -->
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- 动态绑定class,当为true的时候是class,当是false时，不绑定 -->
    <div :class="{active: isActive}"><slot name="item-text"></slot></div>

    <!-- <img src="../../assets/img/tabbar/home.svg" alt="" />
        <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String
  },
  data() {
    return {
      isActive: true
    }
  },
  methods: {
    itemClick() {
      // 动态决定跳转
      this.$router.replace(this.path)
    }
  }
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;  /* 默认去掉3像素 */
  margin-bottom: 2px;
}
.active {
  color: red;
}
</style>
