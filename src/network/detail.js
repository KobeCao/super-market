import request from './request'


// 封装获取商品详情数据
const getDetaile = (iid) => {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

const getRecommend = () => {
  return request({
    url: '/recommend'
  })
}

// 商品介绍的数据对象
class GoodInfo {
  constructor (itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.realPrice = itemInfo.lowNowPrice;
    this.columns = columns;
    this.services = services;
  }
}
// 商品店家的数据对象
class Shop {
  constructor (shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

// 商品尺码参数等数据对象
class GoodsParam {
  constructor (info, rule) {
    this.images = 'images' in info ? info.images[0] : '',
    this.infos = info.set,
    this.sizes = rule.tables
  }
}




export default {
  getDetaile,
  getRecommend,
  GoodInfo,
  Shop,
  GoodsParam,

}














