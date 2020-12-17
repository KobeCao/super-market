<template>
  <div class="profile-list">
    <div class="item" v-for="(item, index) in listData" :key="index">
      <img class="icon" :src="item.icon" alt="" />
      <div class="info">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    getImage() {
      return item.icon;
    },
  },
};
</script>

<style scoped>
  .profile-list {
    border-top: 10px solid #eee;
    background-color: #fff;
  }
  .item{
    position: relative;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee
    }
  .item img {
    height: 18px;
    width: 18px;
    margin-left: 15px;
    margin-top: 12px;
  }
  .item div{
    position: absolute;
    left: 40px;
    top: 0px;
  }
</style>