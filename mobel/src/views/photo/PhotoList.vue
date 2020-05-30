<template>
    <div class="photoList">
<!--        照片分类-->
        <div class="category-sort">
                <ul>
                <router-link v-for="(item,index) in photoSort" :key="item.id" @click="changePhotoSort(item.id)" :to="{name:'photo.list',params:{categoryId:item.id}}">
                    <li :class="{active: index==currentIndex}">{{item.text}}</li>
                </router-link>
            </ul>
        </div>
<!--        照片列表-->
        <div class="phpto-list">
            <ul>
                <li v-for="item in photoList" :key="item.id">
                    <router-link :to="{name:'photo.detail', query:{id:item.id}}">
                        <img v-lazy="item.img_url">
                    </router-link>
                    <p>
                        {{item.img_text}}
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "PhotoList",
        data(){
            return {
                photoList: [],
                photoSort: [],
                currentIndex: null,
            }
        },
        methods:{
            //获取图片  前端模拟分类功能 根据图片分类id 查找相关图片
            getCategoryPohto(id){
                this.currentIndex = id;
                this.axios.get('/photolist')
                    .then(res=>{
                        if(res.data.length == 0){
                            Toast({
                                message: '没有图片了',
                                duration: 1000
                            });
                        }
                        //判断分类id是否为零 如果是 显示全部信息 否则根据图片分类id查找相关图片
                        if(id == 0){
                            this.photoList = res.data;
                        }else {
                            this.photoList=[];
                            res.data.forEach(item =>{
                                if(item.sort == id){
                                    this.photoList .push(item);
                                }
                            });
                        }
                    })
                    .catch(err=>{
                        console.log("图片获取失败", err);
                    })

            },
            //改变当前图片分类
            changePhotoSort(id){
                if(this.$route.params.categoryId != id){
                    this.getCategoryPohto(id);
                }
            }
        },
        activated(){
            //传递当前组件标题给父组件
            this.$emit("getTitle",'图文欣赏');
            //获取图片分类id
            let categoryId = this.$route.params.categoryId;
            this.axios.get('/photolist/sort')
                .then(res=>{
                    //获取图片分类信息
                    this.photoSort = res.data;
                })
                .catch(err=>{
                    console.log("图片列表请求失败",err);
                })
            //获取图片列表
            this.getCategoryPohto(categoryId);
        },
        beforeRouteUpdate(to,from,next){
            //当前动态路由参数改变 则 获取相应的图片
            this.getCategoryPohto(to.params.categoryId);
            next();
        }
    }
//    scoped
</script>

<style >
/*<!--    图片分类按钮--!>*/
    .photoList{
        width: 100%;
        overflow-y: scroll;
    }
    .category-sort{
        width: 100%;
        height: 35px;
        overflow-x: auto !important;
        height: 35px;
        margin-bottom: 10px;
    }
    .category-sort ul{
        position: relative;
        display: block;
        height: 35px;
        white-space:nowrap;
        overflow-y: hidden;
        overflow-x: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */
    }
    .category-sort ul::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }

    .category-sort li{
        display: inline-block;
        line-height: 35px;
        margin: 0 10px;
        overflow: hidden;
    }
    .category-sort li.active{
        background: #28beae;
        color: white;
        border-radius: 10px;
        padding: 0 10px;
        box-sizing: border-box;
    }
.category-sort a,
.category-sort a:hover,
.category-sort a:active,
.category-sort a:visited,
.category-sort a:link,
.category-sort a:focus{
        -webkit-tap-highlight-color:rgba(0,0,0,0);
        -webkit-tap-highlight-color: transparent;
        outline:none;
        background: none;
        text-decoration: none;
    }

    /*图片排列列表*/
    .phpto-list{
        width: 100%;
    }
    .phpto-list li{
        height: 230px;
        position: relative;
        margin-bottom: 1px;
    }
    .phpto-list img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .phpto-list img[lazy=loading]{
        display: block;
        width: 100%;
    }
    .phpto-list p{
        position: absolute;
        bottom: 0;
        color: #ffffff;
        text-shadow: black 1px 1px 2px;
    }
</style>