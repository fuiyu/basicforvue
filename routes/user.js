const express = require("express");
// const app = express();
const router = express.Router();


router.post("/login", function(req, res) {
//     var body = 
//   req.session.userid = 'fuiyu'
   const body = req.body
   
   req.session.username = body.username
   res.send('/')
});
router.post("/chklogin", function(req, res) {
//     var body = 
//   req.session.userid = 'fuiyu'
      
   res.send(req.session.username)
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
