import { ADD_COUNT, TO_CART } from './mutation-types'

export default {
  // mutations 本质：修改state中的状态
  // mutations 中的每个方法尽可能完成的事情比较单一
  cartList (state) {
    return state.cartList
  },
  // 已存在商品调用
  [ADD_COUNT] (state, payload) {
    payload.count++
  },
  // 新添加商品调用
  [TO_CART] (state, payload) {
    state.cartList.unshift(payload)
  }

}