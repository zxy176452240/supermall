<template>
  <div class='bottom-bar'>
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div @click="addCollect">
        <i class="icon select" v-if="!collect"></i>
        <i class="icon collect" v-if="collect"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  data() {
    return {
      collect: null
    }
  },
  methods: {
    addCollect() {
      return (this.collect = !this.collect)
    },
    addToCart() {
      this.$emit('addToCart')
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 58px;
  background-color: #fff;
  text-align: center;
}

.bar-item {
  flex: 1;
  display: flex;
}

.bar-item > div {
  flex: 1;
}

.bar-left .text {
  font-size: 13px;
}

.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 7px auto 3px;
  background: url('~assets/img/detail/detail_bottom.png') 0 0/100%;
}

.bar-left .collect {
  background-position: 0 -27px;
}

.bar-left .service {
  background-position: 0 -53px;
}

.bar-left .shop {
  background-position: 0 -99px;
}

.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 58px;
}

.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}

.bar-right .buy {
  background-color: #f69;
}
</style>