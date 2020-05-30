<template>
    <div id="app">
        <!--    顶部导航栏-->
        <mt-header fixed :title="title">
            <mt-button icon="back" slot="left" @click="back" v-show="isShowBack">返回</mt-button>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <!--内容主体-->

        <transition name="app-view" modo="out-in">
            <keep-alive>
                <router-view class="app-content" @getTitle="getTitle"/>
            </keep-alive>
        </transition>

        <!--底部控制区-->
        <mt-tabbar fixed v-model="selected">
            <mt-tab-item v-for="(item,index) in tabbarList" :id="item.id" :key="index">
                <mt-badge v-if="index == 2 && getPickNum != 0" color="#FC0107" size="small">{{getPickNum}}</mt-badge>
                <img slot="icon" :src="item.img">
                {{item.desc}}
            </mt-tab-item>

        </mt-tabbar>

    </div>
</template>

<script>
    import GoodsTool from "./GoodsTool";
    import homeImg from './assets/home.png';
    import vipImg from './assets/vip.png';
    import shopcartImg from './assets/shopcart.png'
    import searchImg from './assets/search.png'

    export default {
        name: "App",
        data() {
            return {
                title: "",
                selected: "",
                //是否显示返回
                isShowBack: false,
                // pickNum: 0,
                tabbarList: [
                    {
                        "id": "home",
                        "img": homeImg,
                        "desc": '首页'
                    },
                    {
                        "id": "vip",
                        "img": vipImg,
                        "desc": "VIP"
                    },
                    {
                        "id": "shopcart",
                        "img": shopcartImg,
                        "desc": "购物车"
                    },
                    {
                        "id": "search",
                        "img": searchImg,
                        "desc": "搜索"
                    }
                ]
            }
        },
        computed:{
            //商品总数 , 从 vuex.store 里面获取全局数据
            getPickNum(){
                return this.$store.state.num;
            }
        },
        methods: {
            getTitle(title) {
                this.title = title;
            },
            back() {
                this.$router.go(-1);
            }
        },
        mounted() {
            //刷新页面后定位到上次访问的 底部栏按钮
            for (let i = 0; i < this.tabbarList.length; i++) {
                if (this.tabbarList[i].id == this.$route.name) {
                    this.selected = this.$route.name;
                    return false;
                } else {
                    this.selected = 'home';
                }
            }
        },
        watch: {
            selected: function (newV) {
                //判断如果是当前页面不执行跳转
                if (this.$route.name != newV) {
                    this.$router.replace({name: newV});
                }
            },
            $route: function (newV) {
                newV = newV.name;
                //判断当前页面是否需要显示返回按钮
                for (let i = 0; i < this.tabbarList.length; i++) {
                    if (this.tabbarList[i].id == newV) {
                        this.isShowBack = false;
                        return false;
                    } else {
                        this.isShowBack = true;
                    }
                }
            }
        },
        created() {
            // 每次加载获取购物车商品总数

            this.$store.dispatch('changeNumAction', GoodsTool.getTotalCount());

            //  给中央事件总线 添加事件，传值
            // this.$EventBus.$on('sendPickNum', (data) => {
            //     this.pickNum += data;
            // });
        }

    }
</script>

<style scoped>
    #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .app-content {
        margin-top: 40px;
        width: 100%;
        height: calc(100% - 94px) !important;
        /*overflow-y: scroll;*/
    }
/*    内容页面的淡出淡入 用到了css过渡*/
    .app-view-enter, .app-view-leave-to{
        opacity: 0;
    }
    .app-view-enter-active, .app-view-leave-active{
        transition: opacity .3s;
    }
</style>
