<!-- toast模态框组件 -->
<template>
  <div class='toast' v-show="ishow">
    {{msg}}</div>
</template>

<script>
export default {
  name: 'ToastMsg',
  data() {
    return {
      msg: '',
      ishow: false,
      isTimeout: false,
      timer: null
    }
  },
  methods: {
    isShow(message = '默认', duration = 2000) {
      this.ishow = true
      this.msg = message
      if (this.isTimeout) {
        clearTimeout(this.timer)
      } else {
        this.isTimeout = true
      }
      this.timer = setTimeout(() => {
        this.ishow = false
        this.msg = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffff;
  padding: 5px 8px;
  font-size: 14px;
  background-color: #00000089;
  border-radius: 7px;
  z-index: 999;
}
</style>