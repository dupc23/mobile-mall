<template>
    <div>
        <header></header>
        <div class="content">

        </div>
    </div>
</template>

<script>
    import imgLogo from '../assets/logo.png';
    export default {
        name: "SwiperPreview",
        // props:['list'],
        data(){
            return {
                list:[
                    {
                        src: imgLogo,
                        msrc: imgLogo,
                        alt: "",
                        title: "一",
                        w: 1920,
                        h: 1080
                    },
                    {
                        src: imgLogo,
                        msrc: imgLogo,
                        alt: "",
                        title: "二",
                        w: 1920,
                        h: 1080
                    },
                    {
                        src: imgLogo,
                        msrc: imgLogo,
                        alt: "",
                        title: "三",
                        w: 1920,
                        h: 1080
                    },
                ]
            }
        }
    }
</script>

<style scoped>
    .photo-list{

    }

</style>