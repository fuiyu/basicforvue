var crypto = require('crypto');
var content = 'password'

class Md5Secret{
    init(content,key){
        this.key = key;
        this.content = content;
    }
    md5(){
        var key = this.key;
        var  str= this.content+key;
        var md5 = crypto.createHash('md5');
        md5.update(str);
        var token = md5.digest('hex');
        console.log(token)
        return token;
    }
}
module.exports = Md5Secret


