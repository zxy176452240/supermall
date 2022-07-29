<!-- 封装better-scroll -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'ScrollMsg',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1.创建 BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 开启对 图片加载的探测
      observeImage: true,
      // 开启对 content 以及 content 子元素 DOM 改变的探测
      observeDOM: true,
      // 监听滚动条事件
      probeType: this.probeType,
      // 监听点击事件
      click: true,
      // 监听上拉加载事件
      pullUpLoad: this.pullUpLoad,
      disableMouse: false, //启用鼠标拖动
      disableTouch: false, //启用手指触摸
      mouseWheel: true //开启鼠标滚轮
    })

    // 2.监听滚动的位置
    this.scroll.on('scroll', (position) => {
      // 将位置传出
      this.$emit('scroll', position)
    })

    // 3.监听上拉加载事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    // 回到顶部
    scrollTo(x, y, time = 450) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    // 上拉加载
    finishPullUp() {
      // 结束上一次的上拉事件，作用：结束之后才能再次触发上拉事件 默认只触发一次
      this.scroll.finishPullUp()
    },
    // 刷新滚动
    refresh() {
      this.scroll && this.scroll.refresh && this.scroll.refresh()
    }
  }
}
</script>

<style>
</style>