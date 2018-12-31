var express = require('express');
var router = express.Router();
//引入mssql模块
const mysql = require('mysql');

//数据库连接配置（创建数据库连接）
const conn = mysql.createConnection({
  host: 'localhost', //数据库主机名
  user: 'root',         //数据库账号
  password: 'root',    //密码
  database: 'hlsmms'      //使用哪个数据库
});

//打开数据库链接
conn.connect(err => {
  if (err) {
    console.log("× 数据库链接失败！", err.message);
  }
  else {
    console.log("√ 数据库链接成功！");
  }
});


//通用的跨域路由
router.all("*",(req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  next(); //放行执行下面的路由
});



router.post("/useradd", (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // 接收数据
  let { username, pass, usergroup } = req.body;
  // 测试成功已经拿到前端的数据
  console.log(username, pass, usergroup);
  // 准备写入数据库
  let sqlStr = "insert into userinfo(username,userpwd,usergroup) values(?,?,?)";
  let sqlParmas = [username, pass, usergroup];
  // // 执行sql语句
  // // 语法：conn.query("sql语句","参数数组",回调函数(err错误对象,result返回的结果)=>{});
  conn.query(sqlStr, sqlParmas, (err, result) => {
    //   // 错误处理
    if (err) {
      throw err;
    } else {
      // 执行的结果
      console.log(result);
      if (result.affectedRows > 0) {
        res.json({ "isOk": true, "code": 1, "msg": "用户添加成功！" });
      } else {
        res.json({ "isOk": false, "code": -1, "msg": "用户添加失败！" });
      }
    }
  });

});
//获取用户列表的路由
router.get("/getusers",(req,res)=>{
    // res.header("Access-Control-Allow-Origin", "*");
    //1. 构造sql语句
    let sqlStr="select * from userinfo order by userid DESC"; //按用户id降序排列

    //2. 执行SQL语句
    conn.query(sqlStr,(err,users)=>{
        if(err){
            throw err;
        }
        else{
            //3. 返回查询的用户数据给前端
            res.send(users);
        }
    })
});
//删除用户的路由
router.get("/deluser",(req,res)=>{
    let userid = req.query.userid;
    let sqlStr = `delete from userinfo where userid = ${userid}`;
    // let sqlParams = [userid];
    conn.query(sqlStr,(err,result)=>{
        if(err){
            throw err;
        }

        else{
            //3. 返回查询的用户数据给前端
            if (result.affectedRows > 0) {
                res.json({ "isOk": true, "code": 1, "msg": "用户删除成功！" });
            } else {
                res.json({ "isOk": false, "code": -1, "msg": "用户删除失败！" });
            }
        }
    })
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
