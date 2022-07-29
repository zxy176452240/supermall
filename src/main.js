import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import toast from 'components/common/toast';
import Vant, { Lazyload } from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
// 安装并使用懒加载插件
Vue.use(Lazyload, { loading: require('./assets/img/common/placeholder.gif') });

Vue.config.productionTip = false
// 添加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装并使用自定义toast插件
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
