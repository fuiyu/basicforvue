import Vue from 'vue'
import store from './store'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueSocketio from 'vue-socket.io'

import App from './components/App.vue'
import home from './components/home/index.vue'
import login from './components/login/index.vue'
import user from './components/user/index.vue'

import './assets/bootstrap/css/bootstrap.min.css'
import './assets/css/chat.css'
import './assets/css/perfectscrollbar/perfect-scrollbar.min.css'


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueSocketio, 'http://localhost:2016',store);

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