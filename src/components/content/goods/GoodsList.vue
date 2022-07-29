<!-- 商品展示 -->
<template>
  <div class="goods">
    <GoodsListItem v-for="item in goods" :goodsItem="item" :key="item.id"></GoodsListItem>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name: 'GoodsList',
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  /* 均分 */
  justify-content: space-evenly;
}
</style>