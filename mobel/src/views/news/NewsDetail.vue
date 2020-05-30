<template>
    <div class="detail" v-cloak>
        <div class="item">
            <p v-text="detail.title"></p>
            <div>
                <span>点击：{{detail.praise}}</span>
                <span>分类：民生经济</span>
                <span>添加时间：{{detail.time}}</span>
            </div>
        </div>
        <div class="divder"></div>
        <div class="detail-content">
            {{detail.content}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewsDetail",
        props:['title'],
        data(){
            return {
                detail: {}
            }
        },
        activated() {
            this.$emit('getTitle',this.title);
            let id = this.$route.query.id;
            this.axios.get('news/detail')
            .then(res => {
                this.detail = res.data[id - 1];
            })
            .catch(err => {
                console.log('新闻详情获取失败',err)
            });
        },
        deactivated(){
            this.detail = {};
        }
    }
</script>

<style scoped>
    [v-cloak]{
        display: none;
    }
    .detail{
        width: 100%;
        overflow-y: scroll;
    }
    .item{
        padding: 5px 0;
        text-align: center;
        font-size: 20px;
        border-bottom: dimgrey inset 1px;
        margin-bottom: 15px;
    }
    .item>div{
        display: flex;
        justify-content: space-around;
        font-size: 12px;
        color: brown;
    }
    .detail-content{
        text-indent: 2em;
        line-height: 1.5em;
    }
</style>