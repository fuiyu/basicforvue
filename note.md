node --harmony-async-await app
--harmony-async-await es7 async await 参数
linux,在文件/home/用户名/.bashrc(没有这个文件的话新建)中把这句话加上alias node='node --harmony'
或者每次刚刚启动控制台的时候执行这条命令
pm2 --node-args='--harmony-async-await' start xxx
------------------------
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

------------------------
一般说来，在Web安全领域，常见的攻击方式大概有以下几种：
1、SQL注入攻击
2、跨站脚本攻击 - XSS
3、跨站伪造请求攻击 - CSRF
4、文件上传漏洞攻击
5、分布式拒绝服务攻击 - DDOS


------------------------
返回数据格式定义
{
    code:,
    data:{

    },
    message:""
}


function toJSON (data = {}, message = '', code = '') {
    return {
        JSON.stringify({ data, message, code })
    }
}
-------------------


code 定义：
-1参数错误
0 成功
1 未知错误

4001<code<4999 错误 
5响应超时
6用户错误 6001 未登录
---------------------------------------
遗留问题：websocket转化cookie的问题，与sessionid没有保持一致，需要做字符串操作