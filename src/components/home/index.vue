<template>
    <div>
        <ol class="breadcrumb">
            <li><a href="#">首页</a></li>
        </ol>
        <div class="row">

            <div class="col-md-4 chat-user-list todo" id="user-list">
                <ul class="list-group">
                    <li v-for="chatItem of user.chatList" :class="user.roomid==chatItem.roomid?'todo-done':''">
                        <label :for="chatItem.roomid">
                <div class="todo-content">
                <input style="display: none" type="radio" v-model="user.roomid" :id="chatItem.roomid" >
<h4 class="todo-name">{{chatItem.members}}</h4>
</div>
</label>
</li>
</ul>
</div>

<div class="col-md-8 chat-function-components">

    <div class="col-md-12 chat-container" id="chat-container">
        <div class="col-md-12 chat-message-list">
            <div v-for="messageData of user.messageLst" :class="messageData.user==user.mystatus.username?'mine-style':'other-style'">
                <span>{{messageData.user}} <span style="padding: 0 10px;"></span> {{messageData.create_date | formatDateMDHS}}:</span>
                <p>{{messageData.content}}</p>
            </div>
        </div>
    </div>
    <div class="col-md-12 chat-typein">
        <textarea v-model="user.content" name="" id="" cols="30" rows="10">
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
                    mystatus: store.state.getUserInfo,
                    content: '',
                    messageLst: [],
                    chatList: [],
                    room: {},
                    roomid:''
                }
            }
        },
        mounted() {
            var _self = this;
            var userList = document.getElementById('user-list');
            var chatContainer = document.getElementById('chat-container');
            scrollbar.initialize(userList);
            scrollbar.initialize(chatContainer);
            this.$http.get('/chat/getChatList').then((response) => {
                var result = response.data
                if (response.ok && result.code == 0) {

                    this.user.chatList = result.list
                    var data = {};
                    data.roomid = result.list[0].roomid,
                        data.pn = 1,
                        data.ps = 5;
                    for(var room of result.list){
                        this.user.room[room.roomid] = room;
                    }
                    this.user.roomid = data.roomid;
                    // this.user.room.touser = result.list[0].members.replace('/', ',');
                    console.log(this.user.room)
                    _self.$http.post('/chat/getChatRecords', data).then((response) => {
                        var result = response.data;
                        if (response.ok && result.code == 0) {
                            this.user.messageLst = result.data;

                        }
                    })
                } else {
                    location.href = "/#/login"
                }

            })
            this.$options.sockets.sendMsm = (data) => {
                console.log(data)
                this.user.messageLst.push(data)
            }
        },
        methods: {
            ok() {
                var data = {},roomid = this.user.roomid
                data.content = this.user.content;
                data.touser = this.user.room[roomid].members.replace('/', ',');
                data.roomid = roomid;
                // this.user.messageLst.push({ user: "fuiyu", message: this.user.message })
                this.$http.post('/chat/sendtouser', data).then((response) => {
                    // console.log(response)
                })
            },
            chooseUser() {

            }
        }
    }
</script>