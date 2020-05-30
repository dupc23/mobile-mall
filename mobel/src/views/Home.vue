<template>
  <div class="home">

    <!-- 首页图片轮播 -->
<!--    <mt-swipe :show-indicators="false" :auto="4000" class="swiper">-->
<!--      <mt-swipe-item v-for="(item, index) in img" :key="index">-->
<!--        <img :src="item.img" class="home-lunbo">-->
<!--      </mt-swipe-item>-->
<!--    </mt-swipe>-->
    <swiper :url="url" height="220"></swiper>

    <!-- 首页功能列表 -->
    <div class="home-list">
      <ul>
        <li v-for="(girds,index) in list" :key="index">
          <router-link :to="girds.router">
            <img :src="girds.imgUrl" >
            <p>{{girds.title}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import homeListImg1 from '../assets/home_1.gif';
import homeListImg2 from '../assets/home_2.gif';
import homeListImg3 from '../assets/home_3.gif';
import homeListImg4 from '../assets/home_4.gif';
import homeListImg5 from '../assets/home_5.gif';
import homeListImg6 from '../assets/home_6.gif';

let list = [
  {
    imgUrl: homeListImg1,
    title: "新闻资讯",
    router:{name:'news.list'},
  },
  {
    imgUrl: homeListImg2,
    title: "图文分享",
    router:{name:'photo.list',params:{categoryId:0}},
  },
  {
    imgUrl: homeListImg3,
    title: "商品展示",
    router:{name:'goods.list',params: {page:1}},
  },
  {
    imgUrl: homeListImg4,
    title: "资讯",
    router:{name:'news.list'},
  },
  {
    imgUrl: homeListImg5,
    title: "留言反馈",
    router:{name:'news.list'},
  },
  {
    imgUrl: homeListImg6,
    title: "联系我们",
    router:{name:'news.list'},
  },

];

export default {

  name: 'Home',

  data(){
    return {
      img:[],
      list: list,
      url: '/home/lunbo'
    }
  },

  components: {
  },

  activated(){
    this.$emit("getTitle",'首页');
    // this.axios.get('/home/lunbo')
    // .then(res => {
    //   // console.log(res.data[0]);
    //   this.img = res.data;
    //
    // })
    // .catch(err => {
    //   console.log("首页图片请求数据错误",err);
    //
    // })
  }
}

</script>

<style lang="css" scoped>
/*<!--  首页图片轮播-->*/

  /*功能列表*/
  .home-list{
    width: 100%;
  }
  .home-list>ul{
    width: 100%;
    display: -webkit-flex;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
  }
  .home-list>ul>li{
    display: inline-block;
    width: 33%;
    height: 120px;
    margin-bottom: 7px;
    box-sizing: border-box;
  }
  .home-list>ul>li>a{
    display: block;
    /* text-decoration: none; */
    color: #000;
    text-align: center;
  }
  .home-list>ul>li>a>img{
    display: inline-block;
    width: 100px;
    height: 100px;
  }
</style>
