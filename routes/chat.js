const express = require("express");
const userModel = require("../model").user
const chatRoomModel = require("../model").chatRoom
const chatContentModel = require("../model").chatContent
const transceiver = require("../service").transceiver
const Md5Secret = require("../utils/md5secret.js")
// const app = express();
const router = express.Router();
var md5secret = new Md5Secret();
const ToJson = require('../utils/toJson.js')
const toJson = new ToJson()

async function operateChat(obj, model, type) {

    var result = await model.get(obj)
    if (result) {
        var RowDataPacket = result[0];
    } else {
        var RowDataPacket = await model[type](obj);
        RowDataPacket.roomid = RowDataPacket.insertId;
    }

    return RowDataPacket

}

async function updateUserRoomlist(roomid, idArr) {
    for (var i = 0; i < idArr.length; i++) {
        var result = await userModel.get({
            name: idArr[i]
        });
        
        var roomlist = result[0].roomlist;
        roomlist = roomlist ? roomlist.split(',') : [];
        if (roomlist.indexOf(roomid + '') < 0) {

            roomlist.push(roomid);
            var result = await userModel.update({
                'roomlist': roomlist.join(',')
            }, {
                name: idArr[i]
            });
        }
    }
    return true;
}

router.post("/sendtouser", async(req, res) => {
    var name = req.session.username;
    var userid = req.session.userid;
    if (!userid) {
        res.send({
            code: 6001,
            message: '用户未登录'
        })
        return
    }
    var body = req.body,
        data = {},
        idArr = body.touser.split(',');
    idArr = idArr.sort(function (a, b) {
        return a - b
    });
    var roomId = body.roomid;
    
    data.userid = userid;
    data.content = body.content;
    data.toid = body.touser;
    // roomId 未传
    if (!roomId) {
        var RowDataPacket = await operateChat({
            members: idArr.join('/')
        }, chatRoomModel, 'create');
        // roomId 不存在
        roomId = RowDataPacket.roomid

    } else {
        // 未传roomid 是否需要新建room
        var RowDataPacket = await operateChat({
            roomid: roomId
        }, chatRoomModel, 'create');
        roomId = RowDataPacket.roomid
    }
    var roomlist = await updateUserRoomlist(roomId, idArr)
    
    if (!roomlist) {
        res.send({
            code: 4000,
            message: '发送失败'
        })
        return
    }
    var sendReult = transceiver.sendToUser(idArr, {
        user: name,
        content: body.content
    })
    if (sendReult) {
        chatContentModel.create({
            roomid: roomId,
            content: body.content,
            user: name,
            userid: userid
        })

        res.send({
            code: 0,
            message: '发送成功'
        })
    } else {
        res.send({
            code: 4001,
            message: '发送失败'
        })
    }

})

router.get("/getChatList", async(req, res) => {
    var userid = req.session.userid,
        roomlist;

    if (userid) {
        var result = await userModel.get({
            'id': userid
        })
        var RowDataPacket = result[0]
        if (RowDataPacket) {
            // req.session.username= RowDataPacket.name
            var resResult = {};
            resResult.code = 0;
            roomlist = RowDataPacket.roomlist;
            resResult.list = []
            roomlist = roomlist ? roomlist.split(',') : []
            for(var i=0;i<roomlist.length;i++){
                var roomDatas =await chatRoomModel.get({roomid: roomlist[i]})
                resResult.list.push(roomDatas[0])
            }
            // resResult.list = roomlist ? roomlist.split(',') : []
            res.send(resResult)
        } else {
            res.send(toJson.spliceToJSON('', "未登录", 6001))
        }
    } else {
        res.send(toJson.spliceToJSON('', "未登录", 6001))
    }
})
router.post("/getChatMembers", async(req, res) => {
    var userid = req.session.userid,
        username = req.session.username,
        members;

    if (userid) {
        var body = req.body;
        var result = await chatRoomModel.get({
            'roomid': body.roomid
        })
        var RowDataPacket = result[0]
        if (RowDataPacket) {
            // req.session.username= RowDataPacket.name

            members = RowDataPacket.members.split('/');
            if (members.indexOf(username) > -1) {
                var resResult = {};
                resResult.code = 0;
                resResult.members = members
                resResult.status = '请求成功'
                res.send(resResult)
            } else {
                res.send(toJson.spliceToJSON('', "对话不存在", 4001))
            }

        } else {
            res.send(toJson.spliceToJSON('', "对话不存在", 4001))
        }
    } else {
        res.send(toJson.spliceToJSON('', "未登录", 6001))
    }
})

router.post("/getChatRecords", async(req, res) => {
    var userid = req.session.userid,
        username = req.session.username,
        members;

    if (userid) {
        var body = req.body;
        var result = await chatRoomModel.get({
            'roomid': body.roomid
        })
        var RowDataPacket = result[0]
        if (RowDataPacket) {
            // req.session.username= RowDataPacket.name

            members = RowDataPacket.members.split('/');
            if (members.indexOf(username) > -1) {
                var chatResult = await chatContentModel.getContentPage({
                    'roomid': body.roomid
                })
                var resResult = {};
                resResult.code = 0;
                resResult.total = chatResult.total;
                resResult.pn = chatResult.pn;
                resResult.ps = chatResult.ps;
                resResult.data = chatResult.rows;
                resResult.status = '请求成功';
                res.send(resResult)
            } else {
                res.send(toJson.spliceToJSON('', "对话不存在", 4001))
            }

        } else {
            res.send(toJson.spliceToJSON('', "对话不存在", 4001))
        }
    } else {
        res.send(toJson.spliceToJSON('', "未登录", 6001))
    }
})


module.exports = router