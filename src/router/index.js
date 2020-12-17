import Vue from 'vue'
import Router from 'vue-router'


// 路由懒加载
// 首页
const Home = () => import('views/home/Home.vue')

// 分类
const Category = () => import('views/category/Category.vue')

// 购物车
const Cart = () => import('views/cart/Cart.vue')

// 个人信息
const Profile = () => import('views/profile/Profile.vue')

// 商品详情
const Detail = () => import ('views/detail/Detail.vue')


// 使用路由
Vue.use(Router)



// 配置路由路径
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path:'/home',
      component: Home,
      meta: {
        title: '购物街'
      }

    },
    {
      path:'/category',
      component: Category,
      meta: {
        title: '商品分类'
      }
    },
    {
      path:'/cart',
      component: Cart,
      meta: {
        title: '购物车'
      }
    },
    {
      path:'/profile',
      component: Profile,
      meta: {
        title: '我的信息'
      }
    },
    {
      path:'/detail',
      component: Detail,
      meta: {
        title: '商品详情'
      }
    }
  ],
  
  mode: 'history',
    linkActiveClass: 'active',

})
router.beforeEach( (to, form, next) => {
  document.title = to.matched[0].meta.title;
  next();
})


export default router