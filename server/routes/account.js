var express = require('express');
var router = express.Router();
// 引入数据库连接模块
connection=require('./js/conn')

// 写一个路由 设置响应头
router.all('*',(req,res,next)=>{
    // 设置响应头解决跨域
    res.setHeader("Access-Control-Allow-Origin", "*")
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
// 请求账号列表路由
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
            res.send({code:1,reason:"批量删除失败"})
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

// 旧密码修改
router.post('/passwordmodify',(req,res)=>{
    // 接受前端发过来的密码
    let{oldPassword}=req.body;
    // 获取当前用户的密码
    let{password}=req.user;
    // 判断
    if(oldPassword === password){
        res.send({code:0,reason:"原密码输入正确"})
    }else{
        res.send({code:1,reason:"原密码输入错误，请检查"})
    }
})

// 保存修改后的密码
router.post('/savenewpassword',(req,res)=>{
    // 接受前端发过来的数据
    let{newPassword}=req.body;
    let{id}=req.user;
    // 写sql
    const sqlStr = `update account set password='${newPassword}' where id=${id}`;
    // 执行sql
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        if(data.affectedRows>0){
           res.send({code:0,reason:"修改密码成功"})
        }else{
            res.send({code:1,reason:"修改密码失败"})
        }
    })
})
// 个人信息
router.get('/accountinfo',(req,res)=>{
    const id=req.user.id;
    const sqlStr = `select * from account where id=${id}`;
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})

// 头像上传
// 引入multer
const multer = require('multer')

// 配置上传到服务器放置的目录 和 重命名
const storage = multer.diskStorage({
    destination: 'public/upload', // 图片上传到服务器的这个目录
      // 图片重命名
    filename (req, file, cb) {
        var fileFormat =(file.originalname).split("."); // haha.jpg => ['haha', 'jpg']
        // 获取时间戳
        var filename = new Date().getTime();  
        // 124354654 + "." + jpg
        cb(null, filename + "." + fileFormat[fileFormat.length - 1]);
    }
})

// 上传对象
const upload = multer({
    storage,
});



/* 头像上传请求 */ 
router.post('/upload', upload.single('file'), (req, res) => {
    // 获取文件名
    let filename = req.file.filename;
    // 拼接路径
    let path = `/upload/${filename}`;

    // 构造sql
    const sqlStr = `update account set imgUrl='${path}' where id=${req.user.id}`;
    // 执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({code: 0, reason: "头像修改成功!", path})
        } else {
            res.send({code: 1, reason: "头像修改失败"})
        }
    })
})

module.exports = router;