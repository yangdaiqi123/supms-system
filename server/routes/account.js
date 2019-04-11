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

module.exports = router;