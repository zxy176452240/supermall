<!-- 详情页 -->
<template>
  <div id="detail">
    <DetailNavBar @titleClick="titleClick" ref="nav"></DetailNavBar>
    <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <DetailSwiper v-if="topImages!=''" :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo ref="params" :paramInfo="paramInfo"></DetailParamInfo>
      <DetailCommentInfo ref="comment" :commentInfo="commentInfo"></DetailCommentInfo>
      <GoodsList ref="recommend" :goods="recommends"></GoodsList>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop" />
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
  </div>
</template>

<script>
// 导入子组件
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailNavBar from './childComps/DetailNavBar'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailSwiper from './childComps/DetailSwiper'
// 导入方法
import {
  getDetail,
  getRecommend,
  Goods,
  GoodsParam,
  Shop
} from 'network/detail'
// 导入公共组件
import { debounce } from 'common/utils'
import { BACK_TOP } from 'common/consts'
import { backTopMixin } from 'common/mixin'
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

export default {
  name: 'DetailMsg',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  created() {
    this._getDetailData()
    this._getRecommend()
  },
  updated() {
    // 获取需要的四个offsetTop
    this._getOffsetTops()
  },

  methods: {
    _getDetailData() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // 2.根据iid请求详情数据
      getDetail(this.iid).then((res) => {
        const data = res.result
        // (1)获取轮播图片
        this.topImages = data.itemInfo.topImages
        // (2)创建 商品信息实例对象
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        )
        // (3)创建 店铺信息实例对象
        this.shop = new Shop(data.shopInfo)
        // (4)保存商品详细信息
        this.detailInfo = data.detailInfo
        // (5)创建 商品参数实例对象
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        )
        // (6)评论相关数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
    },
    // 请求推荐商品数据
    _getRecommend() {
      getRecommend().then((res) => {
        this.recommends = res.data.list
      })
    },
    _getOffsetTops() {
      // 将getThemeTopY 赋值(进行防抖处理)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(
          this.$refs.comment.$el.offsetTop || this.$refs.recommend.$el.offsetTop
        )
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      })
    },
    // 图片加载完成
    imageLoad() {
      // 刷新滚动
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    // 顶部点击事件
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
    },
    // 滚动条事件
    contentScroll(position) {
      const positionY = -position.y
      let length = this.themeTopYs.length
      // 1.监听backTop的显示
      this.isShowBackTop = positionY > BACK_TOP

      // 2.监听滚动到哪一个主题
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i
          // 父子间通信 将子组件的currentIndex赋值
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    // 加入购物车事件
    addToCart() {
      // 1、获取购物车展示的商品信息
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      // 2、将商品添加到购物车中
      this.$store.dispatch('addCart', product).then((res) => {
        this.$toast.isShow(res)
      })
    }
  }
}
</script>

<style scoped>
#detail {
  height: 100vh;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 60px;
}

.back-top {
  position: fixed;
  right: 10px;
  bottom: 65px;
}
</style>