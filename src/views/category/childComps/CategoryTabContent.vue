<template>
  <!-- 设定列数和高度 必须传入列数和高度的数字，且行数和宽度传入的必须是字符串 -->
  <!-- 设定行数和宽度 必须传入行数和宽度的数字，且列数和高度传入的必须是字符串 -->
  <grid-view :column="3"  :hSpace="130" :line="'auto'" :wSpace="'auto'" v-if="varieticeList.list">
    <div class="item" v-for="(item, index) in varieticeList.list" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="" @load="imageLoaded">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
  </grid-view> 
    
    
</template>

<script>
import GridView from "components/common/gridview/GridView"

  export default {
    props:{
      varieticeList:{
        type: Object,
        default () {
          return {}
        }
        
      }
    },
    data () {
      return {
        index: 0,
      }
    },

    components: { 
      GridView 
    },
    methods: {
      imageLoaded () {
        // 子菜单里的品类数据图片加载过半就发送图片加载完成时间
        this.index >= this.varieticeList.list.length / 2 ? this.$emit('categoryTabContentImageLoaded') : this.index++;
        
      }
    }
  }
</script>

<style scoped>

  .item {
    text-align: center;
    font-size: 14px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 7px;
  }


</style>