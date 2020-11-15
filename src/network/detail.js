// 详情页面数据
import {request} from './request';

export function getDetail(iid) {
  return request ({
    url: '/detail',
    params: {  // 参数拼接 是即将与请求一起发送的 URL 参数
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

// 将详情页面杂乱无章的数据封装到一个对象中，之后组件面向这个对象开发就行
export class Goods {
  constructor(itemInfo,columns,services) { //  constructor() 方法是类的构造函数(默认方法),用于传递参数，返回实例对象
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.Price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
