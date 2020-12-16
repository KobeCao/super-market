<template>
  <div class="grid-view" ref="gridView">
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: "GridView",
    props: {
		  column: {
		    type: [Number, String],
        default: 'auto'
      },
      hSpace: {
		    type: [Number, String],
        default: 'auto'
      },
      line: {
		    type: [Number, String],
        default: 'auto'
      },
      wSpace: {
		    type: [Number, String],
        default: 'auto'
      },
    },
    mounted: function () {
		  this._autoLayout()
    },
    
    updated: function () {
      this._autoLayout()
    },
    methods: {
		  _autoLayout () {

        // 获取父级元素
        let oGridView = this.$refs.gridView;

        // 获取子元素
        let children = oGridView.children
        let len = children.length;
      
        // 计算1vw等于多少px;
        // 宽
        let widthRatio = (window.innerWidth / 100).toFixed(4);
        // 高
        let heightRatio = (window.innerHeight / 100).toFixed(4);



        //设定列数和高度 必须传入列数和高度的数字，且行数和宽度传入的必须是字符串
        if (typeof this.column != 'string' && typeof this.hSpace != 'string' && typeof this.line == 'string' && typeof this.wSpace == 'string' ) {

          // 给父级一个宽度
          oGridView.style.width = 100% + 'px';

          // 计算item的宽度(原生方法区像素有小数时会向上取整，所以要将取到的结果减一)
          let itemWidth = ((oGridView.clientWidth - 1) / this.column).toFixed(4);
          
          // 給子元素赋值
          for (let i = 0; i < len; i++) {
            let item = children[i];
            item.style.width = (itemWidth / widthRatio) + 'vw';
            item.style.height = (this.hSpace / heightRatio) + 'vh';
          
          }

        }

        //设定行数和宽度 必须传入行数和宽度的数字，且列数和高度传入的必须是字符串
        if ( typeof this.line != 'string' && typeof this.wSpace != 'string' && typeof this.column == 'string' && typeof this.hSpace == 'string') {
          
          // 给父级一个高度
          oGridView.style.height = 100% + 'px';  

          let itemHeight = Math.floor(oGridView.clientHeight / this.line);

           for (let i = 0; i < len; i++) {
            let item = children[i];
            item.style.height = (itemHeight / heightRatio) + 'vh';
            item.style. width = (this.wSpace / widthRatio) + 'vw';

          }
        }
      }
    }
	}
</script>

<style scoped>
  .grid-view {
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
  }
</style>
