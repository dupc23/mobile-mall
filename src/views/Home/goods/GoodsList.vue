<template>
    <div class="goodslist"  ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore
                :top-method="loadTop"
                :top-status.sync="topStatus"
                id="goodsLoadMore" ref="loadmore"
                :bottom-all-loaded="allLoaded"
                :auto-fill="false"
                :bottom-method="loadBottom"
        >
            <ul>
                <li v-for="item in goods" :key="item.goodId">
                    <router-link :to="{name: 'goods.detail', params: {id: item.goodId}}">
                        <div class="goodsimg">
                            <img :src="item.img_url" alt="goods1">
                        </div>
                        <div class="goodsinfo">
                            <p class="title">
                                {{item.title}}
                            </p>
                            <div class="detail">


                                <span class="price">$ {{item.prise}}</span>

                                <p>
                                    <span class="hot">热卖中</span>
                                    <span class="count">剩{{item.count}}件</span>
                                </p>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </mt-loadmore>
    </div>
</template>

<script>
    export default {
        name: "GoodsList",
        data(){
            return {
                goods:[],
                allLoaded: false,
                wrapperHeight: 0
            }
        },
        methods: {
            loadTop(){
                console.log('上拉被触发');
                this.$refs.loadmore.onTopLoaded()
            },
            loadBottom(){
                console.log('下拉被触发');
                this.$refs.loadmore.onBottomLoaded()
            },
            topStatus(status){
                console.log(status);
            }
        },
        activated() {
            this.axios.get('/goods/list')
            .then(res=>{
                this.goods = res.data;
            })
            .catch(err=>{
                console.log("获取商品列表失败", err);
            })
            this.$emit("getTitle",'商品列表');
        },
        deactivated() {
            this.goods = [];
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }

    }
</script>

<style scoped>
    .goodslist{
        overflow-y: scroll;
        height: 100%;
    }
    .goodslist li{
        box-sizing: border-box;
        min-width: 375px;
        margin: 20px 0;
    }
    .goodslist a{
        display: flex;
        justify-content: space-between;
    }

    .goodsimg{
        width: 120px;
        height: 120px;
        box-sizing: border-box;
        flex-shrink:0;
    }
    .goodsimg>img{
        max-height: 100%;
        max-width: 100%;
        display: block;
    }

    .goodsinfo{
        height: 120px;
        box-sizing: border-box;
        flex: 1 0;
        position: relative;
        padding: 5px;
    }
    .title{
        display: block;
        margin: 5px;
        margin-top: 0;
        font-size: 17px;
        height: 48px;
        overflow: hidden;
    }
    .detail>p{
        position: absolute;
        bottom: 5px;
        width: calc(100% - 10px);
    }
    .detail>p>span:nth-child(2){
        display:inline-block;
        position: absolute;
        right: 80px;
    }
    .price{
        display: block;
        font-size: 25px;
        font-weight: 700;
        color: #ff360a;
    }

</style>