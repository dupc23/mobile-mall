import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)

//导入主页面
const  Home = () => import( "../views/Home/Home.vue" );
const  Personal = () => import( "../views/Personal/Personal.vue" );
const  ShopCart = () => import( "../views/ShopCart/ShopCart.vue" );
const  Search = () => import( "../views/Search/Search.vue" );

//导入首页功能模块
const  NewsList = () => import( "../views/Home/news/NewsList.vue" );
const  NewsDetail = () => import( "../views/Home/news/NewsDetail.vue" );

const  PhotoList = () => import( "../views/Home/photo/PhotoList.vue" );
const  PhotoDetail = () => import( "../views/Home/photo/PhotoDetail.vue" );

const  GoodsList = () => import( "../views/Home/goods/GoodsList" );
const  GoodsDetail = () => import( "../views/Home/goods/GoodsDetail" );
const  GoodsComment = () => import( "../views/Home/goods/GoodsComment" );

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/personal',
    name: 'personal',
    component: Personal
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: ShopCart
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  //  新闻列表
  {
    path: '/news/list',
    name: 'news.list',
    component: NewsList
  },
  {
    path: '/news/detail',
    name: 'news.detail',
    component: NewsDetail,
    props:{
      title: '新闻详情'
    }
  },
  //  图片列表
  {
    path: '/photo/list/:categoryId',
    name: 'photo.list',
    component: PhotoList
  },
  {
    path: '/photo/detail',
    name: 'photo.detail',
    component: PhotoDetail
  },
  //  商品列表
  {
    path: '/goods/list:page',
    name: 'goods.list',
    component: GoodsList
  },
  {
    path: '/goods/detail/:id',
    name: 'goods.detail',
    component: GoodsDetail
  },
  {
    path: '/goods/photo/info',
    name: 'goods.info',
    component: NewsDetail,
    props:{
      title: '图文介绍'
    },
  },
  {
    path: '/goods/comment',
    name: 'goods.comment',
    component: GoodsComment
  },
  {
    path: '/',
    redirect: {path: '/home'}
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
