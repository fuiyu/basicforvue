

密码加密实例
1、生成随机数$salt=179243，最终会和加密后的密文一同入库。
2、MD5(123456)=e10adc3949ba59abbe56e057f20f883e
3、加 salt，变成e10adc3949ba59abbe56e057f20f883e179243
4、再次加密，最终密文Password=MD5(e10adc3949ba59abbe56e057f20f883e179243)=214d626bcdc53bae2997cc927fe34d71

crypto nodejs自带模块加密
var crypto = require('crypto');
var content = 'password'
var md5 = crypto.createHash('md5');
md5.update(content);
var sign = md5.digest('hex');