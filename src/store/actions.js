import * as types from './mutation-types'

export default {
  addTotalTime({ commit }, time) {
    // 通过commit来出发状态
    commit(types.ADD_TOTAL_TIME, time)
  },
  decTotalTime({ commit }, time) {    
    commit(types.DEC_TOTAL_TIME, time)
  },
  savePlan({ commit }, plan) {
    commit(types.SAVE_PLAN, plan);
  },
  deletePlan({ commit }, plan) {
    commit(types.DELETE_PLAN, plan)
  }
};