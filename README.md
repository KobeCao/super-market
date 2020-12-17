# a SuperMell

## vue-cli2仿写哔站最火vue教学视频的购物街项目(后台数据由codewhy老师提供)


<font color=red size=3 face="宋体">为了不给后台服务器增加压力，本项目不提供后台数据连接，望理解</font>

---
### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```



## 项目目录结构
    -assets                   图片和初始化页面的基础样式
        -css
        -images

    -common                   封装的可以公共使用的一些工具方法

    -components               公共组件
        -common               与项目无耦合的组件
        -content              与项目耦合较高的组件

    -network                  网络请求相关（对Axios的再封装）

    -router                   路由相关

    -store                    vuex状态管理相关

    -views                    主要展示的页面
        -cart                 购物车页面
            -childComps
        -category             商品分类页面
            -childComps        
        -datail               商品详情页面
            -childComps
        -home                 首页
            -childComps
        -profile              我的
            -childComps



















