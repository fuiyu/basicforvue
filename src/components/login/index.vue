<template>
    <form class="bs-example bs-example-form" role="form">
    <div class="input-group">
      <span class="input-group-addon">用户名</span>
      <input v-model="user.name"  type="text" name="name" class="form-control" placeholder="Username">
    </div>
    <div class="input-group">
      <span class="input-group-addon">密码</span>
      <input v-model="user.password"  type="password" name="password" class="form-control" placeholder="密码">
            <button type="button" class="btn btn-default" @click="ok">提交</button>
    </div>
  </form>
</template>
<script>
// import {login} from '../../api/resources'
    export default {
        data () {
            return {
                user: {
                    name:'',
                    password:''
                }
            }
        },
        methods: {
            ok () {

                this.$http.post('/user/register',this.user).then((response)=>{
                //      if(response.ok){
                //     location = '/'
                // }
                alert(response)
                }
               )
                
            }
        }
    }
</script>
