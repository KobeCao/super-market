<template>
  <div id="profile">
    <nav-bar class="profile-nav-bar">
      <div slot="center">我的商城</div>
    </nav-bar>


    <user-info></user-info>



    <section class="account">

      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>

      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>

      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>


    <list-view :listData="orderList"></list-view>
    <list-view :listData="serviceList"></list-view>
  </div>
  
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import UserInfo from './childComps/UserInfo'
  import ListView from './childComps/ListView'


  export default {
    data () {
      return {
        orderList: [
          {icon: require('../../assets/images/profile/message.svg'), info: '我的消息'},
          {icon: require('../../assets/images/profile/pointer.svg'), info: '积分商城'},
          {icon: require('../../assets/images/profile/vip.svg'), info: '会员卡'},
        ],
        serviceList: [
          {icon: require('../../assets/images/profile/cart.svg'), info: '我的购物车'},
          {icon: require('../../assets/images/profile/shopping.svg'), info: '下载购物APP'},
        ]
      } 
    },
    components: {
      NavBar,
      UserInfo,
      ListView
    }
  }
</script>

<style scoped>
 
  #profile {
    background-color: #f2f2f2;
  }

 .profile-nav-bar{
     z-index: 2;
    font-size: 20px;
    font-weight: 600;
    font-family: '宋体';
    color: #fff;
    background-color: var(--color-tint);
  }

  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }
</style>
