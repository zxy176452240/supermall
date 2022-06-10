<template>
  <div id="app" class="wrapper">
    <router-view></router-view>
    <main-tab-bar />
  </div>
</template>

<script>
import axios from 'axios'
import MainTabBar from './components/content/mainTabbar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}

axios({
  method: 'get',
  url: 'http://123.207.32.32:8000/home/multidata'
}).then((res) => {
  console.log(res)
})
axios({
  method: 'get',
  url: 'http://www.blogry.cn/test/index'
  // 专门针对 get请求的参数拼接
  // ,params: {
  //   type: pop,
  //   page: 1
  // }
}).then((res) => {
  console.log(res)
})
</script>

<style>
@import url('./assets/css/base.css');
</style>
