<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>

  // 引入第三方滑屏滚动插件
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        scroll: null,
      }
    },

    // 防止请求的数据未返回到浏览器渲染造成content里面的数据过少，所以用update生命周期
    mounted () {

      // 选中元素并使用滑屏插件
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        
        // 由外部传入设置点击滑屏的各阶段的位置的变化的值
        probeType: this.probeType,


        


        // 设置是否开启监听上拉事件
        pullUpLoad: this.pullUpLoad
      });
      
      // 实时监听元素滚动的位置
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position);
      })

      // 监听元素滚动到底部事件
      this.pullUpLoad && this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp');
      })

    },
    methods: {

      // 封装锚点函数，使外部可自定义锚点和返回锚点的时间并调用
      scrollTo (x, y, time = 300) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },

      // 封装每次到底部上拉都能触发加载更多的函数
      finishPullUp () {
        this.scroll && this.scroll.finishPullUp();
      },
      

      // 封装数据请求回来从新计算better-scroll里的content区域的高度的函数给外部调用,与判断是为了防止图片数据加载过快导致scroll对象还没有创建就调用refresh方法
      refresh () {
       this.scroll && this.scroll.refresh();
      },
      
      // 封装获取当前时刻元素的位置
      getCurrScrollY () {
        return this.scroll ? this.scroll.y : 0;
      }
    }
  }
</script>

<style scoped>

</style>