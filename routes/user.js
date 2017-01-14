const express = require("express");
const userModel = require("../model").user
const Md5Secret = require("../utils/md5secret.js")
// const app = express();
const router = express.Router();
var md5secret = new Md5Secret()


router.post("/login", async(req, res) => {
    //     var body = 
    //   req.session.userid = 'fuiyu'
    const body = req.body
    var name = body.name
    var password = body.password
    if (!!password) {
        md5secret.init(password, 'fuiyu')
        var md5Password = md5secret.md5()
        req.session.username = name
        // var result = await userModel.getIdByNickName(name)
        var result = await userModel.get({'password':"'"+md5Password+"'"})
        console.log(result)
        res.send(result)
    }

});
router.post("/chklogin", async(req, res) => {
    //     var body = 
    //   req.session.userid = 'fuiyu'

    res.send(req.session.username)
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
        console.log(result)
        res.send(result)
    }

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