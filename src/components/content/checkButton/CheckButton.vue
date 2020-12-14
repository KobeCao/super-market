<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>
<script>
export default {
  name: "CheckButton",
  props: {
    // isChecked是由模型改变的
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style>
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
}
.check {
  border-color: red;
   background-color: red;
}
</style>
