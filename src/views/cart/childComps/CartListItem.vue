<template>
  <div id="cart-list-item">
    <!-- 选中商品 -->
    <div class="item-selector">
      <!-- 导入选中按钮组件-->
      <check-button :is-checked="itemInfo.checked" @click.native="checkClick"></check-button>
    </div>
    <!-- 商品图片 -->
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <!-- 商品结算信息 -->
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">商品描述: {{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ itemInfo.price }}</div>
        <div class="item-count right">x{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>
<script>
// 选中商品进行价格结算的组件
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  components: {
    CheckButton,
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked;
    }
  }
};
</script>

<style scoped>
#cart-list-item {
  display: flex;
  width: 100%;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-title {
  font-weight: 600;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 13px;
  color: #666;
  margin-top: 10px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  padding-left: 35px;
  color: #f40;
}
</style>
