<!-- 购物车 -->
<template>
  <div class="shop-cart">
    <NavBar class="cart-nav">
      <div slot="center">购物车({{cartCount}})</div>
    </NavBar>
    <CartList :cart-list.sync="cartList"></CartList>
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
// 导入公共组件
import NavBar from 'components/common/navbar/NavBar'

// 导入方法
// import { mapGetters } from 'vuex'

// 导入子组件
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

export default {
  name: 'ShopcartMsg',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 借用vuex中getters部分的函数属性
    // ...mapGetters(['cartLength', 'cartList'])
    cartList() {
      return this.$store.getters.cartList
    },
    cartCount() {
      return this.$store.getters.cartCount
    }
  }
}
</script>

<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  color: #ffff;
  font-size: 18px;
  font-weight: 700;
}
</style>
