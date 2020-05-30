<template>
    <comment :cid="$route.query.id" class="good-comment"/>
</template>

<script>
    export default {
        name: "GoodsComment",
        data(){
            return {
                id:this.$route.query.id
            }
        },
        activated() {
            this.$emit('getTitle','商品评论')
        },
        deactivated() {
            this.id=null;
        }
    }
</script>

<style scoped>
    .good-comment{
        overflow-y: scroll;
        padding-top: 10px;
    }
</style>