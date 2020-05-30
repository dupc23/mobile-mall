<template>
    <div class="good-detail">
        <div class="outer-swiper">
            <swiper :url="url" height="220"></swiper>
        </div>
        <div class="product-desc">
            <ul>
                <li>
                    <span class="product-desc-title">
                        {{good.title}}
                    </span>
                </li>

                <li class="price-li">
                    价格：<s>￥{{good.original_price}}</s>
                    <span class="price-current">￥{{good.current_price}}</span>
                </li>

                <li class="number-li">
                    购买数量：<span @click="reduceNum">-</span>
                             <span>{{num}}</span>
                             <span @click="addNum">+</span>
                </li>

                <li>
                    <mt-button type="primary" size="small" @click.native="addShopCart">
                        加入购物车
                    </mt-button>
                    <transition name="ball" @after-enter="ballHeader">
                        <div class="ball" v-show="isShowBall"></div>
                    </transition>
                    <mt-button type="danger" size="small">立即购买</mt-button>
                </li>
            </ul>
        </div>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{good.good_no}}</li>
                <li>库存数量：{{good.stock}}件</li>
                <li>入库时间：{{good.add_time}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" @click.native="showShopInfo">图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" @click="showComment">商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import GoodsTool from "../../GoodsTool";
    export default {
        name: "GoodsDetail",
        data(){
            return {
                url: '/home/lunbo',
                good: {},
                num:1,
                isShowBall:false
            }
        },
        methods:{
            //跳转到商品图文详情页面
            showShopInfo(){
                this.$router.push({name:'goods.info',query:{id:this.$route.params.id}});
            },
            //跳转到商品评论页面
            showComment(){
                this.$router.push({name:'goods.comment',query:{id:this.$route.params.id}});
            },
            //减少当前商品的数量
            reduceNum(){
                if(this.num == 1) return;
                this.num --;
            },
            //添加当前商品数量
            addNum(){
                if(this.num >= this.good.stock) return;
                this.num ++;
            },
            //购物车点击就之后执行动画
            addShopCart(){
                this.isShowBall = true;
            },
            //购物车动画执行完毕之后执行的方法
            ballHeader(){
                // this.$EventBus.$emit('sendPickNum',this.num);
                this.isShowBall = false;
                GoodsTool.addGood({id:this.$route.params.id, num:this.num});
                this.$store.dispatch('addNumAction', this.num);
            }
        },
        activated() {
            this.$emit('getTitle', '商品详情');
            this.axios.get('/goods/desc')
            .then(res => {
                res.data.forEach(item => {
                    if(item.goodId == this.$route.params.id){
                        this.good = item;
                    }
                })
            })
            .catch(err => {
                console.log("获取商品详情失败",err);
            })
        },
        deactivated() {
            this.good = {};
            this.num = 1;
        }
    }
</script>

<style scoped>
    .good-detail{
        overflow-y: scroll;
    }

/*<!--    商品详情-->*/
    .product-desc{
        margin: 0 10px;
    }
    .product-desc li{
        display: block;
        padding: 5px;
    }
    .product-desc li:nth-child(1){
        height: 60px;
        margin: 10px 0;
        overflow: hidden;
        border-bottom: 1px solid #999;

    }
    .product-desc-title{
        display: block;
        font-size: 1.2em;
        height: 60px;
        width: 100%;
        line-height: 1.5em;
        overflow: hidden;
        text-overflow: inherit;
    }
    /*价格*/
    .price-li>span{
        margin: 0 20px;
        font-size: 1.2em;
        font-weight: 800;
        color: orangered;
    }
    /*购买数量*/
    .number-li>span{
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        padding: 3px;
        border: 1px solid #999;
        transition: all 100ms linear;
    }
    .number-li>span:nth-child(1):active , .number-li>span:nth-child(3):active{
        background: #999;
        color: white;
    }
    .number-li>span:nth-child(2){
        width: 40px;
    }
    .product-desc li:last-child{
        display: flex;
        justify-content: space-around;
    }

    /*商品参数*/
    .product-props{
        margin: 15px 15px;
        border: 1px solid #999;
        padding: 5px;
        box-sizing: border-box;
    }
    .product-props li{
        margin: 5px 0;
        padding-left: 10px;
    }

    .product-info{
        margin: 10px 0;
    }
    .product-info li{
        margin: 5px 0;
    }

    /*购物车小球动画*/
    .ball{
        position: relative;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: orangered;
        top: 0;
        left: -80px;
        z-index: 5;
    }
    .ball-enter-active{
        transition: all .5s;
        animation:bounce-in 1.5s linear;
    }
    .ball-enter , .ball-leave/* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
        display: none;
    }
    @keyframes bounce-in {
        0%{
            transform: translate(0px,0px);
            width: 20px;
            opacity: 1;
        }
        25%{
            transform: translate(70px,-80px);
            width: 15px;
        }
        50%{
            transform: translate(190px,140px);
            width: 10px;
        }
        75%{
            transform: translate(170px,180px);
            width: 15px;
            opacity: 1;
        }
        100%{
            transform: translate(160px,250px);
            width: 23px;
            opacity: 0;
        }
    }

</style>