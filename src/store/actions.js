import { ADD_COUNT, TO_CART } from './mutation-types'

export default {
  addCart (context, payload) {
    // payload新添加的商品
    return new Promise((resolve) => {
      // 1、查找之前购物车中是否存在该商品
      let oldProduct = context.state.cartList.find(item =>
        item.iid === payload.iid
      )

      // 2、判断oldProduct
      if (oldProduct)
      {
        context.commit(ADD_COUNT, oldProduct)
        resolve('当前商品数量加1')
      } else
      {
        payload.count = 1
        payload.checked = true
        context.commit(TO_CART, payload)
        resolve('加入购物车成功')

      }

    })
  }
}