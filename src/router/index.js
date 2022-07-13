// 路由器
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入路由
const Home = () => import('pages/home/Home')
const Category = () => import('pages/category/Category')
const Cart = () => import('pages/shopcart/Shopcart')
const Profile = () => import('pages/profile/Profile')
const Detail = () => import('pages/detail/Detail')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  },

]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
