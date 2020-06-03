<template>
    <mt-button :type="type" :size="size" @click="debounce"><slot/></mt-button>
</template>

<script>
    export default {
        name: "BtnDebounce",
        data(){
            return {
                startData: 0
            }
        },
        props: {
            type: String,
            size: String,
            time: {
                type: Number,
                default: 400
            }
        },
        methods: {
            debounce(){
                let newTime = new Date();
                if (newTime.getTime() - this.startData > this.time){
                    this.$emit('click')
                }
                this.startData = (new Date()).getTime();
            }
        }
    }
</script>

<style scoped>

</style>