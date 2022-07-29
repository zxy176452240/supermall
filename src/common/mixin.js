// 混入
import BackTop from 'components/content/backTop/BackTop';
import { NEW, POP, SELL } from "./consts";

// 返回顶部
export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
  }
}

export const tabControlMixin = {
  data () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick (index) {
      switch (index)
      {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
