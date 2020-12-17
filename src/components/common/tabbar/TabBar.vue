<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  box-shadow: 0px -2px 3px rgba(100, 100, 100, 0.1);
  background-color: #f6f6f6;
}

</style>
