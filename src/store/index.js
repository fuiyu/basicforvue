import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getUserInfo from './modules/getUserInfo'

Vue.use(Vuex);

const state = {
  totalTime: 0,
  list: []
};

export default new Vuex.Store({
  modules:{
    getUserInfo:getUserInfo
  },
  state,
  mutations,
  actions
})