import Vue from 'vue'
import store from './store'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './components/App.vue'
import home from './components/home/index.vue'
import login from './components/login/index.vue'
import './assets/bootstrap/css/bootstrap.css'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [{
  path: '/',
  component: home,
   path: '/login',
  component: login
}];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
// 实例化我们的Vue
var app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});