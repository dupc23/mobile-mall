<template>
  <div class="shopcart">
    我是vip
  </div>
</template>

<script>

  export default {
  name: 'Vip',

  data(){
    return {
    }
  },
  components: {
  },
  activated(){
    this.$emit("getTitle",'个人');
  },
}

</script>

<style lang="css" scoped>

</style>