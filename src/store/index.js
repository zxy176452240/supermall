import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

// 1、安装此插件
Vue.use(Vuex)

const state = { cartList: [] }

// 2、创建并挂载Store对象
export default new Vuex.Store({
  actions, // 响应组件中用户的动作
  mutations, // 修改state中的数据
  state, // 保存具体的数据
  getters // 对state中数据进行加工
})
