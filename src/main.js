import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
// 配置公共的url
axios.defaults.baseURL = "http://mock-api.com/PKeprYn0.mock/api";
// 配置axios
Vue.use(VueAxios, axios);

// 按需引入mint-ui并添加到全局组件
import { Button, Header, Tabbar, TabItem, Swipe, SwipeItem, Lazyload, Loadmore, Indicator, Badge, Switch  } from 'mint-ui'
//导航栏
Vue.component('mt-button', Button)
Vue.component('mt-header', Header)
//页脚
Vue.component('mt-tabbar', Tabbar)
Vue.component('mt-tab-item', TabItem)
//轮播图
Vue.component('mt-swipe', Swipe);
Vue.component('mt-swipe-item', SwipeItem);
//图片懒加载  和 上滑加载更多
Vue.use(Lazyload);
Vue.component('mt-loadmore',Loadmore);
//红色小点
Vue.component('mt-badge',Badge);
//引入开关
Vue.component('mt-Switch',Switch );

//引入图片查看器
import VuePreview from 'vue-preview'
Vue.use(VuePreview);
//引入全局的评论组件
import comment from "./components/comment.vue";
Vue.component('comment', comment);
//引入自定义的轮播图组件
import MySwiper from "./components/MySwiper.vue";
Vue.component('swiper', MySwiper);


//添加请求拦截器
Vue.axios.interceptors.request.use(function (config) {
  Indicator.open('玩命加载中ING···');
  return config;
}, function (error) {
  return Promise.reject(error);
})
//添加响应拦截器
Vue.axios.interceptors.response.use(function (response) {
  Indicator.close();
  return response;
}, function (error) {
  return Promise.reject(error);
})

// 引入全局的css
import './assets/css/global.css';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  mounted(){
    // 预渲染方法
    // document.dispatchEvent(new Event('renderer-event'));
  },
  render: h => h(App)
}).$mount('#app')
