var express = require('express');
var router = express.Router();

// 引入数据库模块
connection=require('./js/conn');
// 统一设置响应头  设置跨域
router.all('*',(req,res,next)=>{
	// 设置响应头  解决跨域
	res.setHeader("Access-Control-Allow-Origin","*");
	next();
})
// 添加商品路由
router.post('/goodsadd',(req,res)=>{
	// 接受前端传过来的数据
	let{classification,barCode,name,price,MarketValue,PurchasePrice,stock}=req.body;
	// 写sql
	const sqlStr = `insert into goods(classification,bar_code,name,price,MarketValue,PurchasePrice,stock) values('${classification}','${barCode}','${name}','${price}','${MarketValue}','${PurchasePrice}','${stock}')`;
	console.log(sqlStr)
	// 执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		if(data.affectedRows>0){
			res.send({code:0,reason:'恭喜你，添加商品成功'})
		}else{
			res.send({code:1,reason:'恭喜你，添加商品成功'})
		}
	})
})

// 请求商品列表路由
router.get('/goodslist',(req,res)=>{

	// 写sql
	const sqlStr = `select * from goods order by id desc`;
	// 执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		res.send(data);
	})
})

module.exports = router;