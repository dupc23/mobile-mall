<template>
    <div class="photo-detail">
<!--        头部区 显示标题和相关信息-->
        <p class="photo-title">{{photoDetail.title}}</p>

        <div class="photo-header">
            <span>发起日期：2017-12-1</span>
            <span>浏览：0</span>
            <span>分类：民生经济</span>
        </div>
<!--        第三方组件照片显示组件-->
        <vue-preview :slides="photoImgList"  class="photo-list">1</vue-preview>
<!--        照片的相关描述-->
        <div class="photo-desc">
            <p>{{photoDetail.desc}}</p>
        </div>
<!--        加载子组件 评论区-->
        <comment :cid="$route.query.id"/>
    </div>
</template>

<script>
    export default {
        name: "PhotoDetail",
        data(){
            return {
                photoDetail:[],
                photoImgList:[]
            }
        },
        activated() {
            this.axios.get('/photo/detail')
                .then(res=>{
                    //循环判断id 是否为当前照片id
                    res.data.forEach(item =>{
                        if(item.id == this.$route.query.id){
                            //保存图片文本描述 等相关信息
                            this.photoDetail = item ;
                            //保存照片列表  格式化为照片显示插件需要的格式
                            item.imgs.forEach((item,index) =>{
                                this.photoImgList[index] = {};
                                this.photoImgList[index].msrc = item;
                                this.photoImgList[index].src = item;
                                this.photoImgList[index].w = 1920;
                                this.photoImgList[index].h = 1080;
                                this.photoImgList[index].alt = 'picture1';
                                this.photoImgList[index].title = 'Image Caption 1';
                            });
                        }
                    });

                })
                .catch(err=>{
                    console.log("图片内容获取失败",err);
                })
        },
        deactivated() {
            //离开时 清除data信息
            this.photoDetail = [];
            this.photoImgList = [];

        }
    }
</script>

<style scoped>
    .photo-detail{
        overflow-y: scroll;
    }
    .photo-title{
        color: #28beae;
        font-size: 1.1em;
        text-align: center;
        padding: 10px 0;
    }
    .photo-header{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .photo-list{
        width: 100%;
        min-height: 130px ;

    }
    .photo-desc{
        min-height: 60px;
        padding: 10px;
        text-indent: 2em;
        line-height: 1.5em;
    }
</style>