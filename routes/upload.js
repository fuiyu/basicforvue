const joinPath = require('path').join
// const models = require('../models')
const multiparty = require('multiparty')
const ToJson = require('../utils/toJson.js')
const toJson = new ToJson()
const parseMultipart = (req, opts) => new Promise((resolve, reject) => {
    const form = new multiparty.Form(opts)
    form.parse(req, (err, fields, files) => {
        if (err) {
            reject(err)
        } else {
            resolve(files)
        }
    })
})

module.exports = async(req, res) => {
    const id = req.session.id
    if (!id) {
        return  toJson.spliceToJSON('','未登录',6001)
    }
    const tempUploadDir = joinPath(__dirname, '../upload/data/temp')
    const files = await parseMultipart(req, {
        uploadDir: tempUploadDir
    })
    var tempPath = files.data[0].path;
    var tempName = files.data[0].path.replace(tempUploadDir, '');
    
    return {
        tempPath:tempPath,
        tempName:tempName,
        size:files.data[0].size
    }
}