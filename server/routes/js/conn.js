// 引入mysql模块
const mysql=require('mysql');
// 创建连接对象
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'supermarket'
    
})
// 执行连接
connection.connect();
console.log("数据库连接成功");

// 暴露出去
module.exports = connection;