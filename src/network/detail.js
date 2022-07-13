// 详情页的数据请求
import { request } from './request'

export function getDetail (iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend () {
  return request({
    url: '/recommend'
  })
}

// 通过定义类，将多个类型数据封装到一个对象中
// 商品信息
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.realPrice = itemInfo.lowNowPrice
    this.columns = columns
    this.services = services
  }
}

// 商品参数
export class GoodsParam {
  constructor(info, rule) {
    // 注：images 可能没有值
    this.image = info.image ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}

// 店铺信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}