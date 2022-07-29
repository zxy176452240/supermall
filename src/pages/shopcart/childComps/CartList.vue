<!-- 购物车商品展示列表 -->
<template>
  <div class="cart-list">
    <scroll class="content">
      <CartListItem v-for="item in cartList" :key="item.iid" :item-info="item"></CartListItem>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  props: {
    cartList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.cart-list {
  height: 100vh;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 93px;
  overflow: hidden;
}
</style>
