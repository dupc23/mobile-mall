<template>
  <div class="shopcart">
    我是vip
    <SwiperPreview></SwiperPreview>
  </div>
</template>

<script>
import SwiperPreview from "../components/SwiperPreview";
export default {

  name: 'Vip',

  data(){
    return {
    }
  },

  components: {
    SwiperPreview
  },

  activated(){
    this.$emit("getTitle",'会员');
  },
}

</script>

<style lang="css" scoped>

</style>