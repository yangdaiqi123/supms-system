var express = require('express');
var router = express.Router();

// 引入数据库模块
connection=require('./js/conn')
// 引入jwt
const jwt=require('jsonwebtoken')
// 设置响应头解决跨域
router.all('*',(req,res,next)=>{
	// 设置响应头  解决跨域
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Headers", "authorization"); 
	next();
})

// 准备一个签名（秘钥）
const secretKey = 'itsource';
/* 验证token的合法性 */
const expressJwt = require('express-jwt');

// 验证token的合法性
router.use(expressJwt ({
            secret: secretKey
}).unless({
    path: ['/login/checklogin']
})); 
// 路由拦截器
router.use(function (err, req, res, next) {
    // 如果前端没有token或者是错误的token 就会抛出如下错误
    if (err.name === 'UnauthorizedError') { 
        // 响应给前端token无效的信息
        res.status(401).send('token不合法...');
    }
})
// 账号路由
router.post('/checklogin',(req,res)=>{
	// 接受前端发过来的数据
	let{account,password}=req.body;
	// 写sql
	const sqlStr=`select * from account where account='${account}' and password='${password}'`
	// 执行sql
	connection.query(sqlStr,(err,data)=>{
		if (err) throw err;
		if(data.length){
			// 生成token 把token和数据一起响应给前端
 			const token = jwt.sign(Object.assign({}, data[0]), secretKey, { expiresIn:  60*60*2 } )
			res.send({code:0,reason:"恭喜你，登陆成功",token})
		}else{
			res.send({code:1,reason:"登陆失败，请检查账号或密码"})
		}
	})
})

// 获取当前用户名
router.get('/currentaccount',(req,res)=>{
	res.send(req.user.account)
})

module.exports = router;
