<template>
    <form class="bs-example bs-example-form" role="form">
        <div class="container">
            <div class="row clearfix">
                <div class="col-md-6 column">
                    <div class="login-form">
                        <div class="form-group">
                            <input type="text" class="form-control login-field" v-model="user.username" value="" placeholder="用户名" id="login-name">
                            <label class="login-field-icon fui-user" for="login-name"></label>
                        </div>

                        <div class="form-group">
                            <input type="password" class="form-control login-field" v-model="user.password" value="" placeholder="密码" id="login-pass">
                            <label class="login-field-icon fui-lock" for="login-pass"></label>
                        </div>

                        <a class="btn btn-primary btn-lg btn-block" href="#"  @click="ok">提交</a>
                        <a class="login-link" href="/#/register">注册新账号</a>
                    </div>
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