<template>
  <div class="cart-bottom-bar">

    <!-- 全选中按钮 -->
    <div class="select-all" @click="checkClick">
      <check-button class="checked" :isCheck="getSelect"></check-button>
      <span>全选</span>
    </div>

    <!-- 选中商品的总价格 -->
    <div class="price-all">
      <span>合计：</span>
      <span class="price">{{getPrice}}</span>
    </div>

    <!-- 结算按钮 -->
    <div class="settlement" @click="payClick">去支付({{getGoodsNum}})</div>
  </div>
</template>

<script>


  import CheckButton from 'components/content/checkButton/CheckButton'
  import {mapGetters} from 'vuex'

  export default {
    components:{
      CheckButton
    },

    computed: {
      
      ...mapGetters(['getCartList']),

      // 计算选中商品的总价格
      getPrice () {

          
        return '￥' + this.getCartList
        
          // 选出勾选中的商品
          .filter( item => item.check)
            
            // 将勾选中的商品进行相加
            .reduce( (preValue, item) =>  preValue + (item.realPrice * item.count), 0)

              .toFixed(2)
      },

      // 选中的商品件数
      getGoodsNum () {
        return this.getCartList
          .filter( item => item.check)
            .length
      },


      // 判断是否全部选中
      getSelect () { //                        跳出循环对数据本身的布尔值取反      有没选中的商品跳出遍历
        return this.getCartList.length !== 0 ? !this.getCartList.find( item => !item.check) : false;
      }

    },
    methods: {

      // 该方法不能简化
      checkClick () {

        //所有商品都选中
        if (this.getSelect) {
          this.getCartList.forEach( (item) => {
            item.check = false;
          })

          // 部分商品选中
        }else{
           this.getCartList.forEach( (item) => {
            item.check = true;
          })
        }
      },

      payClick () {
        let msg = '';

        // 是否有选中商品
        if (this.getGoodsNum) {
          msg = '安全支付通道建立中';
        }else{
          msg = '您还没有选择商品哦~~';
        }
        this.$toast.show(msg, 2000);
      }
    }
    
  }
</script>

<style scoped>
  .cart-bottom-bar{
    position: absolute;
    display: flex; 
    width: 100vw;
    height: 40px;
    bottom: 49px;
    left: 0px;
    border: 1px solid #f5f2f2;
  }  

  .price-all,
  .settlement{
    flex:1;
    line-height: 40px;
    text-align: center;
  }

  .select-all{
    display: flex;
    flex:1;
    align-items: center;
    justify-content: center;
    /* border: 1px solid black; */
  }
  .select-all span{
    margin-left: 5px;
    margin-top: 1px;
  }
  .checked{
    height: 60%;
  }
  
  .price-all{
    flex: 2;
    text-align: left;
    font-size: 14px;
  }
  .price{
    color: #f40;
    font-size: 20px;
  }

  .settlement{
    background-color: #f40;
    color: #fff;
  }


</style>