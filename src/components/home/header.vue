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
    mounted(){
      // this.getUserInfo()
    },
    data() {
      return store.state.getUserInfo
    },
    // methods: {
    //   getUserInfo() {
    //     var data = this.user
    //     login.getUserInfo(function (res) {
    //       if (res.ok) {
    //         var result = res.body
    //         var userinfo = data
    //         userinfo.username = result.name
    //         userinfo.islogin = true
    //         store.dispatch('getUserInfo', userinfo)
    //       } else {

    //       }

    //     })
    //   }
    // }
  }
</script>