<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
      :is-checked="isSelectAll"
      class="check-button"
      @click.native="checkCilck">
      </check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
// 在vuex中导入mapGetters
import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
       }).reduce((preValue,item) => { //preValue 前一个值 item 当前元素的下标
      //  当前元素的价格乘以当前元素的数量,将前一次的价格加进去，同时保留两位小数
      return  preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      // 计算选中的个数
      return this.cartList.filter(item => item.checked).length
    },
    // 是否全部选中
    isSelectAll() {
      // 1. 使用filter()
      // if(this.cartList.length === 0) return false
      // return !(this.cartList.filter(item => !item.checked).length)

      // 2. 使用find()
      if(this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkCilck() {
      if(this.isSelectAll) { // 全部选中
        this.cartList.forEach(item => item.checked = false)
      } else { // 部分或全部不选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请选择购买的商品')
      }
    }
  }
}
</script>

<style>
.bottom-bar {
  position: relative;
  display: flex;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  background-color: #eee;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
 width: 100px;
 background-color: red;
 color: #fff;
 text-align: center;

}
</style>
