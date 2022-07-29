<template>
  <div id="app" class="wrapper">
    <keep-alive exclude="DetailMsg">
      <router-view></router-view>
    </keep-alive>
    <!-- 判断如果当前路由路径不含有 detail（详情页）字符，则显示标签栏 -->
    <main-tab-bar v-if="!/^\/detail/.test($route.path)"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  },
  mounted() {
    window.onload = function () {
      document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
          event.preventDefault()
        }
      })
      document.addEventListener('gesturestart', function (event) {
        event.preventDefault()
      })
    }
  }
}
</script>

<style>
@import url('./assets/css/base.css');

.wrapper {
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
}
</style>
