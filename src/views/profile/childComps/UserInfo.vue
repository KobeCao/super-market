<template>
  <div class="user-info">

    <!-- 登录头像 -->
    <a href="#" class="login">
  
      <div class="item user-image">
        <img src="~assets/images/profile/avatar.svg" alt="">
      </div>

      <!-- 登录注册相关 -->
      <div class="user-login">
        <div>
          <span>登录/注册</span>
          <div class="bind-phone">
            <img src="~assets/images/profile/phone.svg" alt="">
            <span>暂无绑定手机号</span>
          </div>
        </div>
 
      </div>
      
      <div class="item right-image">
        <img src="~assets/images/common/arrow-left.svg" alt="">
      </div>

    </a>
  </div>
</template>

<script>
  export default {
    
    
  }
</script>

<style scoped>

  .user-info {
    background-color: var(--color-tint);
    padding: 35px 15px 15px 15px;
  }

  .login{
    display: flex;
    text-align: center
  }
  .login img {
    width: 20px;

  }
  .item{
    flex: 1
  }  
  .user-image img{
    width: 60px;
  }
  .user-login{
    flex:3;
    height: 20px;
    text-align: left;
    color: #fff
  }
  .user-login>div{
    line-height: 30px;
  }
  .user-login>div>span{
  font-weight: 600;
  }
  .bind-phone span{
    position: relative;
    top: -5px;
    font-size: 14px;
  }
  .right-image img{
    position: relative;
    right: calc(-50% + 15px);
    top: calc(50% - 10px);

  }


</style>