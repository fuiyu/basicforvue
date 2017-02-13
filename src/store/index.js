import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getUserInfo from './modules/getUserInfo'
import socket from './modules/socket'

Vue.use(Vuex);


const state = {
  totalTime: 0,
  list: []
};

export default new Vuex.Store({
  modules:{
    getUserInfo:getUserInfo,
    socket:socket
  },
  state,
  mutations,
  actions
})