<template>
    <form class="bs-example bs-example-form" role="form">
        <div class="input-group">
            <span class="input-group-addon">用户名</span>
            <input v-model="user.username" type="text" name="username" class="form-control" placeholder="Username">
        </div>
        <div class="input-group">
            <span class="input-group-addon">密码</span>
            <input v-model="user.password" type="password" name="password" class="form-control" placeholder="密码">
        </div>
        <div class="input-group">
            <button type="button" class="btn btn-default" @click="ok">提交</button>
        </div>
            
        
    </form>
</template>
<script>
    import login from '../../api/login/index.js'
    import store from  '../../store'
    export default {
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                    islogin:false
                }
            }
        },
        methods: {
            ok() {
                var data = this.user
               login.login(data,function(res){
                   console.log(res)
                   if(res.ok){
                       var result = res.body
                       var userinfo = data
                       userinfo.username = result.name
                       userinfo.islogin = true
                        store.dispatch('getUserInfo',userinfo)
                   }else{

                   }
                   
               }) 
            }
        }
    }
</script>