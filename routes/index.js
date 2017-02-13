const express = require("express");
// const app = express();
const router = express.Router();
const upload = require('./upload')
const MoveFile = require('../utils/movefile')
const joinPath = require('path').join
const ToJson = require('../utils/toJson.js')
const toJson = new ToJson()


function getRoutes(app) {
    function useRoute(name) {
        const rt = require('./' + name)
        app.use('/' + name, rt)
    };
    ['user','chat'].forEach(useRoute)
    app.post('/user/uploadAvatar', async(req, res) => {
        var temp = await upload(req, res);
        
        var fileName = temp.tempName
        var qualified = /\.(jpg|jpeg|png|gif)$/.test(fileName.toLowerCase())
        if (!qualified) {
            return res.send(toJson.spliceToJSON('', '文件不符合要求，需要是jpg,jpeg,png,gif格式', 0))
        }
        if (temp.size > 1024 * 2 * 1000) {
            return res.send(toJson.spliceToJSON('', '上传文件过大', 0))
        }

        const moveFile = new MoveFile();
        var uploadOk = await moveFile.move(temp, joinPath(__dirname, '../upload/data/avatar/'))
        return res.send(toJson.spliceToJSON({
            avartar: uploadOk
        }, '上传成功', 0))
    })
}


exports.router = getRoutes