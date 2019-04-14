var express = require('express');
var router = express.Router();

// 引入数据库模块
connection=require('./js/conn');
// 统一设置响应头  设置跨域
router.all('*',(req,res,next)=>{
	// 设置响应头  解决跨域
	res.setHeader("Access-Control-Allow-Origin","*")
	res.setHeader("Access-Control-Allow-Headers", "authorization")
	next();
})
// 添加商品路由
router.post('/goodsadd',(req,res)=>{
	// 接受前端传过来的数据
	let{classification,barCode,name,price,MarketValue,PurchasePrice,stock}=req.body;
	let totalInventory=price*stock;
	// 写sql
	const sqlStr = `insert into goods(classification,bar_code,name,price,MarketValue,PurchasePrice,stock,totalInventory) values('${classification}','${barCode}','${name}','${price}','${MarketValue}','${PurchasePrice}','${stock}','${totalInventory}')`;
	// console.log(sqlStr)
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

// 删除商品
router.get('/delgoods',(req,res)=>{
	// 接受前端发过来的数据
	let {id}=req.query;
	// 写sql
	const sqlStr=`delete from goods where id=${id}`;
	// 执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		if(data.affectedRows>0){
			res.send({code:0,reason:"恭喜你，删除商品成功"})
		}else{
			res.send({code:1,reason:"很遗憾，删除商品失败"})
		}
	})
})


// 修改商品---数据回填
router.get('/editgoods',(req,res)=>{
	// 接受前端发过来的id
	let{id}=req.query;
	// 写sql
	const sqlStr=`select*from goods where id=${id}`
	// console.log(sqlStr)
	// 执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err
		res.send(data)

	})
})
// 修改商品---数据回填
router.post('/savegoods',(req,res)=>{
	// 接受前端发过来的数据
	let{name,classification,price,editId}=req.body;
	// 写sql
	 const sqlStr=`update goods set name='${name}',classification='${classification}',price='${price}' where id=${editId}`;
	 console.log(sqlStr)
	 //执行sql
	 connection.query(sqlStr,(err,data)=>{
	 	if(err) throw err;
	 	  if(data.affectedRows>0){
        res.send({code:0,reason:"恭喜你，修改商品成功"})
    } else{
        res.send({code:1,reason:"很遗憾，修改失败"})
    }   
	 })
})
// 批量删除

router.get('/batchdelet',(req,res)=>{
    // 接受前端发过来的id
    let {idArr}=req.query;
    // 写sql
    const sqlStr=`delete from goods where id in (${idArr})`
    // 执行sql
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,reason:"批量删除成功"})
        }else{
            res.send({code:1,reason:"批量删除失败"})
        }
    })

})

// 商品分页
router.get('/goodslistpage',(req,res)=>{
	 // 接受参数
    let{currentPage,pageSize,keyword,classification}=req.query;

    // 写sql
    let sqlStr = `select * from goods where 1=1`;
    //拼接查询条件
	if (classification !== '全部' && classification !== '') {
			sqlStr +=` and classification='${classification}'`;
		}

	if (keyword !== '') {
		sqlStr += ` and(name like '%${keyword}%' or bar_code like '%${keyword}%')`
	}
	console.log(sqlStr)

    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        // 计算数据总条数
        let total = data.length;
        // 计算跳过多少条
        let n = (currentPage - 1) * pageSize;                                                       
        // 拼接分页sql
        sqlStr += ` limit ${n}, ${pageSize}`;
        // 执行sql
        connection.query(sqlStr, (err, data) => {
            if (err) throw err;
            res.send({total, data})
        })
    })
})


// // 查询
// router.get('/search',(req,res)=>{
// 	// 接受前端传过来的数据
// 	let{keyword,cateName}=req.query;
// 	// 写sql
// 		let sqlStr = `select * from goods where 1=1`;
// 		if (cateName !== '全部' && cateName !== '') {
// 			sqlStr += ` and cateName='${cateName}'`;
// 		}
// 		if (keyword !== '') {
// 			sqlStr += ` and(goodsName like '%${keyword}%' or barCode like '%${keyword}%')`
// 		};
// 		//执行sql
// 		connection.query(sqlStr,(err, data) => {
// 			if (err) throw err;
// 			res.send(data);
// 		})
// })


module.exports = router;