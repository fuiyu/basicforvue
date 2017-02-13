<template>
    <form class="bs-example bs-example-form" role="form">
        <div class="container">
            <div class="row clearfix">
                <div class="col-md-6 column">
                    <form role="form">
                        <div class="form-group">
                            <label for="exampleInputEmail1">用户名</label><input v-model="user.username" type="text" name="username" class="form-control" placeholder="Username">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">密码</label><input v-model="user.password" type="password" name="password" class="form-control" placeholder="密码">
                        </div><button type="button" class="btn btn-default" @click="ok">提交</button>
                    </form>
                </div>
            </div>
        </div>


    </form>
</template>
<script>
    import login from '../../api/login/index.js'
    import store from '../../store'
    export default {
        data() {
            return {
                user: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            ok() {
                var data = {}
                data.name = this.user.username;
                data.password = this.user.password;
                var _this = this;
                login.login(data, function (res) {
                    if (res.ok) {
                        var result = res.body
                        var userinfo = {}
                        userinfo.username = result.data.name
                        userinfo.islogin = true
                        _this.$socket.connect()
                        store.dispatch('getUserInfo', userinfo)
                    } else {

                    }

                })
            }
        }
    }
</script>