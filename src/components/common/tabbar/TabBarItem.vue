<template>
 
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    
  </div>
 
</template>

<script>
export default {
  props:{
    path: String,
    activeColor:{
      type: String,
      default: 'red'
    }
  },

  methods:{
    itemClick () {

      this.$router.push(this.path);

      
    }
  },
  computed:{

    // 拿到当前处于活跃的路由的路径与传过来的路径进行匹配，如果相同就返回true
    isActive () {
      return this.$route.path.indexOf(this.path) != -1;
    },

    // 设置首页、分类等可修改的文字颜色且有默认值
    activeStyle () {
      return this.isActive ? {color: this.activeColor} : {};
    }
  }
  
};
</script>

<style>

.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  font-family: '宋体';
  font-size: 14px;
}
.tab-bar-item img{
  height: 24px;
  width: 24px;
  margin-top: 3px;
  margin-bottom: 4px;

  vertical-align: middle;
}

</style>
