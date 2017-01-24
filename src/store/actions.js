import * as types from './mutation-types'

export default {
  addTotalTime({ commit }, time) {
    // 通过commit来出发状态
  commit(types.ADD_TOTAL_TIME, time)
}
};