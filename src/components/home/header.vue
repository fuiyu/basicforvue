<template>
  <nav class="navbar navbar-default">
    <div class="container">
      <a class="navbar-brand" href="#">
        <i class="glyphicon glyphicon-time"></i> 聊天室
      </a>
      <ul class="nav navbar-nav">

        <li>
          <router-link to="/home">首页</router-link>
        </li>
        <li>
          <router-link to="/login">登录</router-link>
        </li>
        <li>
          <a>{{username}}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
  import store from '../../store'
  import login from '../../api/login'
  export default {
    mounted() {
      var _this = this

      this.$http.get('/user/getinfo').then((response) => {
        var result = response.data, userinfo = {}
        if (response.ok && result.code == 0) {
          userinfo.username = result.data.name
          userinfo.islogin = true;
        }else{
          userinfo.username = null;
          userinfo.islogin = false;
        }
       
        store.dispatch('getUserInfo', userinfo)
      })
    },
    data() {
      return store.state.getUserInfo
    }
    
  }
</script>