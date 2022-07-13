<!-- 详情页 -->
<template>
  <div id="detail">
    <DetailNavBar></DetailNavBar>
    <Scroll class="content" ref="scroll">
      <DetailSwiper v-if="topImages!=''" :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo :paramInfo="paramInfo"></DetailParamInfo>
      <DetailCommentInfo :commentInfo="commentInfo"></DetailCommentInfo>
    </Scroll>
  </div>
</template>

<script>
// 导入子组件
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailNavBar from './childComps/DetailNavBar'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailSwiper from './childComps/DetailSwiper'
// 导入方法
import { getDetail, Goods, Shop, GoodsParam } from 'network/detail'
// 导入公共组件
import Scroll from 'components/common/scroll/Scroll'

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
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {}
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      const data = res.result
      console.log(data)
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
  methods: {
    imageLoad() {
      // 刷新滚动
      this.$refs.scroll.refresh()
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