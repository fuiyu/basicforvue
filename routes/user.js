const express = require("express");
const userModel = require("../model").user
const Md5Secret = require("../utils/md5secret.js")
// const app = express();
const router = express.Router();
var md5secret = new Md5Secret();


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
            'password':  md5Password 
        })
        var RowDataPacket = result[0]
        if (RowDataPacket) {
            req.session.username = RowDataPacket.name
            var resResult = {};
            resResult.name = RowDataPacket.name
            res.send(resResult)
        } else {
            res.send("用户名或者密码错误")
        }
    }

});
router.get("/chklogin", async(req, res) => {
    //     var body = 
    //   req.session.userid = 'fuiyu'
    var name = req.session.username
    
    if (name) {
        var result = await userModel.get({
            'name': name 
        })
        var RowDataPacket = result[0]
        if (RowDataPacket) {
            // req.session.username= RowDataPacket.name
            var resResult = {};
            resResult.code = 0;
            resResult.status = "已登录"
            res.send(resResult)
        } else {
            res.send("未登录")
        }
    }else {
            res.send("未登录")
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
        var result = await userModel.create(body)
        res.send(result)
    } 

});

router.get("/logout", async(req, res) => {
    req.session.username = null
    req.redirect('/#/login')
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