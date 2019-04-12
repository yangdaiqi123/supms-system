var express = require('express');
var router = express.Router();
// 引入数据库连接模块
connection=require('./js/conn')

// 写一个路由 设置响应头
router.all('*',(req,res,next)=>{
    // 设置响应头解决跨域
    res.setHeader("Access-Control-Allow-Origin", "*")
    next();
})

//添加账号路由
router.post('/accountadd',(req,res)=>{
    // 接收数据
    let{ account,password,userGroup}=req.body;

    // 写sql
    const sqlStr=`insert into account(account,password,user_group) values('${account}','${password}','${userGroup}')`;
    // console.log(sqlStr);
    //执行sql
   connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        // 如果受影响行数大于0 代表成功 否则代表失败
        if (data.affectedRows > 0) {
            // 响应成功的数据对象给前端
            res.send({code: 0, reason: " 恭喜你，添加账号成功!"})
        } else {
            // 响应失败的数据对象给前端
            res.send({code: 1, reason: "很遗憾,添加账号失败!"})
        }
    })
    
})
// 请求账号路由
router.get('/accountlist',(req,res)=>{
    // 写sql
    const sqlStr = `select * from account order by create_date desc`;
    // console.log(sqlStr);
    // 执行sql    
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        res.send(data)
    })
    
})
// 删除账号路由
router.get('/delaccount',(req,res)=>{
    // 接受id
    let {id}=req.query;
    // 写sql
    const sqlStr=`delete from account where id=${id}`;
    // 执行sql
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,reason:"恭喜你，删除账号成功！"})
        }else{
            res.send({code:1,reason:"很遗憾，删除失败！"})
        }
    })

})
// 修改账号--数据回填
router.get('/editaccount',(req,res)=>{
    let{id}=req.query;
    // 写sql
    const sqlStr=`select*from account where id=${id}`
    // 执行sql
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        res.send(data)
    }) 
})
// 修改--保存数据
router.post('/saveEdit',(req,res)=>{
    // 接受前端发过来的数据
    let {account,userGroup,editId}=req.body;
   // 写sql
   const sqlStr=`update account set account='${account}',user_group='${userGroup}' where id=${editId}`;
   // 执行sql
   connection.query(sqlStr,(err,data)=>{
    if (err) throw err;
    if(data.affectedRows>0){
        res.send({code:0,reason:"恭喜你，修改账号成功"})
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
    const sqlStr=`delete from account where id in (${idArr})`
    // 执行sql
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,reason:"批量删除成功"})
        }else{
            res.send({code:0,reason:"批量删除失败"})
        }
    })

})
// 分页
router.get('/accountListPage',(req,res)=>{

    // 接受参数
    let{currentPage,pageSize}=req.query;
    // 写sql
    let sqlStr = `select * from account order by create_date desc`;

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

module.exports = router;