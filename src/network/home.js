// 导入request.js
import {request} from "./request"

// 因为首页数据可能会有多个请求，就可以根据下列方式进行多个封装，将这些请求放入一个单独的文件里面，进行统一的管理。
export function getHomeMultidata() {
  return request ({
    url: './home/multidata'
  })
}
