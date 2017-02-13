import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options.crossOrigin = true
Vue.http.options.credentials = true


exports.login = function () {
    Vue.resource('/user/register')

}