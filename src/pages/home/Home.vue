<!-- 首页 -->
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
      <HomeSwiper :banners="banners"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TapControl class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></TapControl>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- .native 监听组件根元素的原生事件 -->
    <transition name="backTop" appear>
      <BackTop @click.native="backClick" v-show="isShowBackTop" />
    </transition>
  </div>
</template>

<script>
// 导入公共组件
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
import GoodsList from 'components/content/goods/GoodsList'
import TapControl from 'components/content/tabControl/TapControl'
// 导入方法
import { getHomeGoods, getHomeMultidata } from 'network/home.js'
// 导入子组件
import FeatureView from './childComps/FeatureView'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'

export default {
  name: 'HomeMsg',
  data() {
    return {
      // 轮播图数据
      banners: [],
      // 活动数据
      recommends: [],
      // 保存商品数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TapControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    // 调用请求数据函数
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    // 请求页面数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    },

    // 事件监听
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    // 回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    // 回到顶部按钮的相关函数
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
      // 结束上一次下拉
      setTimeout(() => {
        this.$refs.scroll.finishPullUp()
      }, 1000)
      // 刷新scroll的高度计算
      this.$refs.scroll.scroll.refresh()
    }
  }
}
</script>

<style scoped>
#home {
  position: relative;
  padding-top: 44px;
  text-align: center;
  /* vh 视口高度 */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
.backTop-enter-active {
  animation: backTop 0.3s;
}

.backTop-leave-active {
  animation: backTop 0.3s reverse;
}

@keyframes backTop {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
