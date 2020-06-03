<template>
    <mt-swipe :show-indicators="false" :auto="4000" :style="{'height': height + 'px'}" class="swiper">
        <mt-swipe-item v-for="(item, index) in imgs" :key="index">
            <img :src="item.img || item.src">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
    export default {
        name: "MySwiper",
        props: ['url','height'],
        data(){
            return {
                imgs:[]
            }
        },
        activated() {
            this.axios.get(this.url)
                .then(res => {
                    // console.log(res.data[0]);
                    this.imgs = res.data;

                })
                .catch(err => {
                    console.log("首页图片请求数据错误",err);

                })
        },
        deactivated() {
            this.imgs = [];
        }
    }
</script>

<style scoped>
    .swiper img{
        display: inline-block;
        width: 100%;
        overflow: hidden;
    }
</style>