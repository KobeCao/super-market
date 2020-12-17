import request from './request'

// 封装请求轮播图和图片导航部分数据函数
const getHomeMultidata = () => {
  return request({
    url: '/home/multidata',
  })
}

// 封装请求选项卡里的数据函数（get请求，需要带参数：选项卡里的类型，和页码）
const getHomeGoods = (type, page) => {
  return request({
    url: 'home/data',
    params:{
      type,
      page,
    }
  })
}



export default {
  getHomeMultidata,
  getHomeGoods
}