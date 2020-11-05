<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType:{
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null  // 保存变量
    }
  },
  mounted() {
    // 1 创建BScroll对象
    // 通过querySelector拿到的不准确,可以给它绑定ref,拿到明确的对应的元素
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // 根据上面props里面传入的值来决定是多少
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // 2. 监听滚动的位置
    this.scroll.on('scroll',(position) => {
      // console.log(position);
      // 自定义事件 并且将事件传出去
      this.$emit('scroll',position)
    })

    // 监听上拉事件
    this.scroll.on('pullingUp',() => {
    // 自定义事件 并且将事件传出去
    this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x,y, time=300) {
      this.scroll.scrollTo(x,y, 500)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style>

</style>
