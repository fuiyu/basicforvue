<template>
  <nav class="navbar navbar-inverse navbar-embossed" role="navigation">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-01">
                <span class="sr-only">Toggle navigation</span>
              </button>
      <a class="navbar-brand" href="#">聊天室</a>
    </div>
    <div class="collapse navbar-collapse" id="navbar-collapse-01">
      <ul class="nav navbar-nav navbar-left">
        <li>
            <router-link to="/home">首页</router-link>
          
        </li>

        <li v-show="!islogin">
            <router-link to="/login">登录</router-link>
         
        </li>
        <li v-show="islogin">
            <router-link to="/login">{{username}}</router-link>
         
        </li>
        <li v-show="islogin"><a href="#fakelink" @click="">退出</a></li>
      </ul>
    </div>
    <!-- /.navbar-collapse -->
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
        } else {
          userinfo.username = null;
          userinfo.islogin = false;
        }
        console.log(userinfo)
        store.dispatch('getUserInfo', userinfo)
      })
    },
    data() {
      return store.state.getUserInfo
    },
    method: {
      logout(){

      }
    }

  }
</script>