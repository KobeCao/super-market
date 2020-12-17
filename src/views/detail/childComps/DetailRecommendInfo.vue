<template>
  <div class="recommend-info">
    <goods-list :goods="recommendGoods"></goods-list>
  </div>
</template>

<script>
  import GoodsList from 'components/content/goods/GoodsList'

  export default {
    components: { 
      GoodsList 
    },

    props: {
      recommendGoods: {
        type: Array,
        default () {
          return []
        }
      }
    }
    
  }
</script>

<style scoped>

</style>