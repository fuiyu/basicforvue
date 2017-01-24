import {login} from '../../api/login'
import * as types from '../mutation-types'

const state = {
    username: '',
    islogin:false
}

const getters = {

}

const mutations = {
    [types.GET_USER_INFO](state,data) {
        state.username = data.username
        state.islogin = data.islogin
    }
}
const actions = {
    getUserInfo({commit},data){
        commit(types.GET_USER_INFO,data)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}