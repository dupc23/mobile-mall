<template>
    <div class="comment">
<!--        输入框-->
        <textarea rows="3"></textarea>
        <mt-button type="primary" @click="commentSubmit">提交</mt-button>
<!--        评论列表-->
        <p class="comment-list">评论列表--<span>xx</span></p>
        <ul>
            <li v-for="(item,index) in comment" :key="index">
                <span>{{item.userName}}</span>
                <span>
                    2020-1-3
                </span>
                <br>
                <span >{{item.content}}</span>

            </li>
        </ul>
        <mt-button type="primary" @click="loadMore(commentPage)">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "comment",
        props:['cid'],
        data(){
            return {
                comment:[],
                commentPage: 1,
                commentEndPage : 2
            }
        },
        methods: {
            //加载更多评论
            loadMore(page){
                if(page > this.commentEndPage) {
                    Toast({
                        message: '已经是最后一条了',
                        duration: 1000
                    });
                    return;
                }
                this.comment=[];
                this.axios.get('/photo/comment')
                    .then(res => {
                        //对数据遍历 取出当前图片的评论
                        res.data.forEach(item => {
                            if(item.photoId == this.cid){
                                this.commentEndPage = Math.ceil(item.comment.length / 10);
                                //对评论遍历默认加载10条
                                item.comment.forEach((item,index)=>{
                                    if(index >= this.commentPage*10) return;
                                    this.comment.push(item);
                                })
                            }
                        })
                        this.commentPage += 1;
                    })
                    .catch(err => {
                        console.log("图片评论加载失败", err);
                    })
            },
            commentSubmit(){
                Toast({
                    message: '功能尚未完善',
                    duration: 1000
                });
            }
        },
        activated() {
            this.loadMore(this.commentPage);
        },
        deactivated() {
            //离开的时候初始化data
            this.commentPage=1;
            this.comment=[];
        }
    }
</script>

<style scoped>
/*<!--    按钮样式-->*/
    button{
        width: 100%;
        margin: 10px 0;
    }
    .comment-list{
        padding: 10px;
        background: #28beae;
        color: white;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    textarea{
        resize: none;
        width: 100%;
        box-sizing: border-box;
        padding: 5px;
        margin-bottom: 10px;
    }
    /*.comment ul li>span:nth-child(2){*/
    /*    margin-left: 20px;*/
    /*}*/
    .comment li{
        border-bottom: #9a9a9a solid 1px;
        margin-bottom: 5px;
        padding-bottom: 5px;
    }
    .comment li span:nth-child(4){
        margin-left: 30px;
    }
    .comment li span:nth-child(2){
        float: right;
        margin-right: 5px;
     }
    .comment li span:nth-child(1){
        margin-left: 5px;
    }
</style>