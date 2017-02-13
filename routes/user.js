const express = require("express");
const userModel = require("../model").user
const Md5Secret = require("../utils/md5secret.js")
// const app = express();
const router = express.Router();
var md5secret = new Md5Secret();
const ToJson = require('../utils/toJson.js')
const toJson = new ToJson()

router.post("/login", async(req, res) => {
    //     var body = 
    //   req.session.userid = 'fuiyu'
    const body = req.body
    var name = body.name
    var password = body.password
    if (!!password) {
        md5secret.init(password, 'fuiyu')
        var md5Password = md5secret.md5()
        
        // var result = await userModel.getIdByNickName(name)
        var result = await userModel.get({
            "name":name,
            "password":md5Password
        })
        var RowDataPacket = result[0]
        if (RowDataPacket) {
            req.session.username = RowDataPacket.name;
            req.session.userid =  RowDataPacket.id;
            var resResult = {};
            resResult.name = RowDataPacket.name
            res.send(toJson.spliceToJSON(resResult,"登录成功",0))
        } else {
            res.send(toJson.spliceToJSON('',"用户名或者密码错误",6002))
        }
    }

});

router.get("/getinfo", async(req, res) => {
    //     var body = 
    //   req.session.userid = 'fuiyu'
    var userid = req.session.userid
        console.log(userid)
   
    if (userid) {
        var result = await userModel.get({
            'id': userid 
        })
        var RowDataPacket = result[0]
        if (RowDataPacket) {
            // req.session.username= RowDataPacket.name
            res.send(toJson.spliceToJSON({name:RowDataPacket.name},"查询成功",0))
        } else {
            res.send(toJson.spliceToJSON('',"未登录",6001))
        }
    }else {
            res.send(toJson.spliceToJSON('',"未登录",6001))
    }
});
router.get("/chklogin", async(req, res) => {
    //     var body = 
    //   req.session.userid = 'fuiyu'
    var userid = req.session.userid
    
    if (userid) {
        var result = await userModel.get({
            'id': userid 
        })
        var RowDataPacket = result[0]
        if (RowDataPacket) {
            // req.session.username= RowDataPacket.name
            var resResult = {};
            resResult.code = 0;
            resResult.status = "已登录"
            res.send(resResult)
        } else {
            res.send(toJson.spliceToJSON('',"未登录",6001))
        }
    }else {
            res.send(toJson.spliceToJSON('',"未登录",6001))
    }
});

router.post("/register", async(req, res) => {
    var body = req.body;
    var name = body.name;
    var password = body.password;
    if (!!password || password.length >= 6) {
        md5secret.init(password, 'fuiyu')
        var md5Password = md5secret.md5()
        body.password = md5Password
        var result = await userModel.createUser(body)
        res.send(result)
    } 

});

router.get("/logout", async(req, res) => {
    req.session.username = null
    req.session.userid = null
    res.redirect('/#/login')
});


// router.post("/getuserid", function(req, res) {
//   // res.session.userid = 'fuiyu'
//   console.log(req.session)

//    res.end(req.session.userid)
// });
// router.post("/deluserid", function(req, res) {
//   // res.session.userid = 'fuiyu'
//   req.session.userid = ''

//    res.end(req.session.userid)
// });
module.exports = router