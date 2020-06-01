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
                    <BtnDebounce
                            type="primary"
                            size="small"
                            @click="addShopCart"
                            class="btn-left-position"
                    > 加入购物车 </BtnDebounce>

                    <mt-button type="danger" size="small" class="btn-right-position">立即购买</mt-button>

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
// <!--    加载工具  上传商品数据到浏览器缓存-->
    import GoodsTool from "../../../public/GoodsTool";
    import { Toast } from 'mint-ui';
    //加载防抖按钮
    import BtnDebounce from "../../components/BtnDebounce";
    export default {
        name: "GoodsDetail",
        data(){
            return {
                url: '/home/lunbo',
                good: {},
                num: 1,
                isShowBall: false
            }
        },
        components: {
            BtnDebounce
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
            //购物车点击
            addShopCart(){
                // this.isShowBall = true;
                Toast({
                    message: '添加成功',
                    duration: 1000
                });
                GoodsTool.addGood({id:this.$route.params.id, num:this.num});
                this.$store.dispatch('addNumAction', this.num);
            },
        },
        activated() {
            // 给导航栏传递当前组件标题
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

    /*标题*/
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

    /*功能按钮，加入购物车，立即购买*/
    .product-desc li:last-child{
        display: block;
        width: 100%;
        height: 40px;
        position: relative;
    }
    .btn-left-position{
        position: absolute;
        left: 10%;
    }
    .btn-right-position{
        position: absolute;
        right: 10%;
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

</style>