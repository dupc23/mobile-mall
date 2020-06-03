<template>
    <div class="news">
        <div class="news-list">
            <ul>
                <router-link  class="news-a"  v-for="(news,index) in news" :key="index+1" :to="{name: 'news.detail',query:{id: index+1}}">
                    <li class="news-list-item">
                        <div class="new-list-img">
                            <img :src="news.img" />
                        </div>
                        <div class="new-content">
                            <p class="new-content-title">{{news.title}}</p>
                            <div class="new-content-desc">
                                <p class="new-content-desc-summary">
                                    {{news.desc}}
                                </p>
                                <p class="new-content-desc-foolt">
                                    <span class="new-content-desc-praise">
                                        {{news.praise}}
                                    </span>
                                    <span class="new-content-desc-time">
                                        {{news.time}}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </li>
                </router-link>
            </ul>    
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewsList',
    data(){
        return {
            news: null
        }
    },
    activated(){
        this.$emit("getTitle",'新闻列表');

        this.axios.get('/news/list')
        .then(res => {
          this.news = res.data;
        })
        .catch(err => {
          console.log("新闻列表数据错误",err);
        })
    }
    
}
</script>

<style scoped>
.news{
    width: 100%;
    overflow-y:scroll ;
}

/* 列表按下效果 */
.news-a{
    display: block;
    width: 100%;
    height: 110px;
}
.news-a:active{
    background: rgba(0, 0, 0, 0.1);
}
/* 列表主体布局 */
.news-list-item{
    height: 110px;
    box-sizing: border-box;
    padding:0 15px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
}
/* 列表图片 */
.new-list-img{
    /* display: inline-block; */
    width: 100px;
    height: 100px;
    flex: 0 0;
}
.new-list-img>img{
    width: 100px;
    height: 100px;
}
/* 列表文本 */
.new-content{
    flex: 1 0;
    padding-left: 20px;
}
.new-content-desc-summary{
    font-size: 10px;
}
.new-content-desc{
    padding: 5px;
}
.new-content-desc-foolt{
    position: relative;
    bottom: -30px;
    display: flex;
    justify-content: space-between;
}
</style>