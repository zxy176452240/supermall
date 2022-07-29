<!-- 购物车底部功能按钮 -->
<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @click.native="checkBtnClick" :value="isSelectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="buyCart">去结算({{checkLength}})</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CheckButton from './CheckButton'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList
        .filter((item) => {
          return item.checked
        })
        .reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0)
        .toFixed(2)
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length
    },
    isSelectAll() {
      return this.cartList.length === 0
        ? false
        : this.cartList.every((item) => item.checked)
    }
  },
  methods: {
    checkBtnClick() {
      // 方法一：
      // 1.判断是否有未选中的按钮
      // 2.有未选中的内容, 则全部选中
      // if (this.isSelectAll) {
      //   this.cartList.forEach((item) => {
      //     item.checked = false
      //   })
      // } else {
      //   this.cartList.forEach((item) => {
      //     item.checked = true
      //   })
      // }

      // 简化：
      // 1.提前将 isSelectAll取反保存起来，避免错乱
      const firstSelected = !this.isSelectAll
      // 2.遍历将所有商品的选中状态赋值
      this.cartList.forEach((item) => {
        item.checked = firstSelected
      })
    },
    buyCart() {
      if (!this.isSelectAll) {
        this.$toast.isShow('请选择需要结算的商品')
      }
    }
  }
}
</script>

<style scoped>
.bottom-menu {
  position: fixed;
  bottom: 50px;
  left: 0;
  width: 100%;
  height: 44px;
  background-color: #eee;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  float: right;
  width: 100px;
  height: 44px;
  background-color: #ff8198;
  color: #fff;
  text-align: center;
  line-height: 44px;
}
</style>
