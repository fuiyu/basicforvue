import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default {
    state: {
        connect: false,
        message: null
    },
    mutations:{
        SOCKET_CONNECT: (state,  status ) => {
            state.connect = true;
        },
        SOCKET_USER_MESSAGE: (state,  message) => {
            state.message = message;
        }
    },
    actions: {
        otherAction: ({ commit, dispatch, state }, type) => {
            return true;
        }
    }
}