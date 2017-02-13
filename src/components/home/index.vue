<template>
    <div>
        <ol class="breadcrumb">
            <li><a href="#">首页</a></li>
        </ol>
        <div class="row">

            <div class="col-md-4 chat-user-list" id="user-list">
                <ul class="list-group">
                    <li v-for="chatItem of user.chatList" :class="{active: user.roomid==chatItem, 'list-group-item': true }">
                        <label :for="chatItem">
                        <input style="display: none" type="radio" v-model="user.roomid" :id="chatItem" v-bind:value="chatItem">fuiyu
</label>
</li>
</ul>
</div>
<div class="col-md-8 chat-function-components">

    <div class="col-md-12 chat-container" id="chat-container">
        <div class="col-md-12 chat-message-list">
            <p v-for="messageData of user.messageLst"><span>{{messageData.user}}:</span>{{messageData.message}}</p>
        </div>
    </div>
    <div class="col-md-12 chat-typein">
        <textarea v-model="user.message" name="" id="" cols="30" rows="10">
                    </textarea>
        <div class="btn-group pull-right">
            <button type="button" class="btn btn-default" @click="ok">发送</button>
        </div>
    </div>
</div>
</div>


</div>

</template>
<script>
    import scrollbar from 'perfect-scrollbar'
    import login from '../../api/login'
    import store from '../../store'
    export default {
        data() {
            return {
                user: {
                    touser: 'fuiyu2,fuiyu',
                    message: '',
                    userList: ['fuiyu2', 'fuiyu'],
                    messageLst: [],
                    chatList: [],
                    roomid: ''
                }
            }
        },
        mounted() {

            var userList = document.getElementById('user-list');
            var chatContainer = document.getElementById('chat-container');
            scrollbar.initialize(userList);
            scrollbar.initialize(chatContainer);

            this.$http.get('/chat/getChatList').then((response) => {
                var result = response.data
                if (response.ok && result.code == 0) {
                    console.log(result.data)
                    this.user.chatList = result.list
                }

            })
            this.$options.sockets.sendMsm = (data) => {
                this.user.messageLst.push(data)
            }
        },
        methods: {
            ok() {
                var data = {};
                data.message = this.user.message;
                data.touser = this.user.touser;
                this.user.messageLst.push({ user: "fuiyu", message: this.user.message })
                this.$http.post('/chat/sendtouser', data).then((response) => {
                    console.log(response)
                })
            },
            chooseUser() {

            }
        }
    }
</script>