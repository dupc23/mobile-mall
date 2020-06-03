<template>
  <div class="shopcart">
    我是搜索
  </div>
</template>

<script>
// import Axios from 'axios';
// Axios.defaults.baseURL = "http://mock-api.com/PKeprYn0.mock/api";

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {

  name: 'Search',

  data(){
    return {
    }
  },

  components: {
  },

  activated(){
    this.$emit("getTitle",'搜索');
    
  },
}

</script>

<style lang="css" scoped>

</style>