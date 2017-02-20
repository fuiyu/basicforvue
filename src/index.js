import Vue from 'vue'
import store from './store'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueSocketio from 'vue-socket.io'
import * as filters from './filters'

import App from './components/App.vue'
import home from './components/home/'
import login from './components/login/'
import user from './components/user/'
import register from './components/register/'

import './assets/bootstrap/css/bootstrap.min.css'
import './assets/flat-ui/css/flat-ui.min.css'
import './assets/css/chat.css'
import './assets/css/perfectscrollbar/perfect-scrollbar.min.css'
import moment from 'moment'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueSocketio, 'http://localhost:2016',store);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const routes = [{
    path: '/home',
    component: home
  },
  {
    path: '/',
    component: home
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/user',
    component: user
  },
  {
    path: '/register',
    component: register
  }
];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
// 实例化我们的Vue
// 将vue实例全局化
window.vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});