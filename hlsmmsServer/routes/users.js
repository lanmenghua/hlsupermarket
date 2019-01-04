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
router.all("*", (req, res, next) => {
    //res.header("Access-Control-Allow-Origin","*"); //携带cookie证书是，跨域不能使用通配符*
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080"); //允许携带cookie证书的域名
    res.header("Access-Control-Allow-Credentials", true);  //值是一个布尔值，表示是否允许发送Cookie
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
router.get("/getusers", (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    //1. 构造sql语句
    let sqlStr = "select * from userinfo order by userid DESC"; //按用户id降序排列

    //2. 执行SQL语句
    conn.query(sqlStr, (err, users) => {
        if (err) {
            throw err;
        }
        else {
            //3. 返回查询的用户数据给前端
            res.send(users);
        }
    })
});
//删除用户的路由
router.get("/deluser", (req, res) => {
    let userid = req.query.userid;
    let sqlStr = `delete from userinfo where userid = ${userid}`;
    // let sqlParams = [userid];
    conn.query(sqlStr, (err, result) => {
        if (err) {
            throw err;
        }

        else {
            //3. 返回查询的用户数据给前端
            if (result.affectedRows > 0) {
                res.json({ "isOk": true, "code": 1, "msg": "用户删除成功！" });
            } else {
                res.json({ "isOk": false, "code": -1, "msg": "用户删除失败！" });
            }
        }
    })
});

//获取单个用户信息的路由，根据userid
router.get("/getuserbyid", (req, res) => {
    let userid = req.query.userid;
    let sqlStr = `select * from userinfo where userid = ${userid}`
    conn.query(sqlStr, (err, oldUserData) => {
        if (err) {
            throw err;
        }
        else {
            //3. 返回查询的用户数据给前端
            res.send(oldUserData);

        }
    })
});
//修改用户资料的路由
router.post("/usersave", (req, res) => {
    //    接收前端的数据，
    let { userpwd, username, usergroup, userid } = req.body;
    let sqlStr = "update userinfo set username=?,userpwd=?,usergroup=? where userid= ? "
    let sqlParmas = [username, userpwd, usergroup, userid];
    conn.query(sqlStr, sqlParmas, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //3. 返回查询的用户数据给前端
            if (result.affectedRows > 0) {
                res.json({ "isOk": true, "code": 1, "msg": "用户修改成功！" });
            } else {
                res.json({ "isOk": false, "code": -1, "msg": "用户修改失败！" });
            }

        }
    })
})
//验证登录的路由
router.post("/checkLogin", (req, res) => {
    /*2）后端——接收账号和密码，根据账号和密码到数据库中查询
    Select * from userinfo where username=’账号’ and userpwd=’密码’
    账号和密码2个条件同时成立，找到了结果就是合法的，没有找到结果就非法。*/
    let { username, userpwd } = req.body;
    let sqlStr = "select * from userinfo where username=? and userpwd=?";
    let sqlParams = [username, userpwd];

    //执行sql语句
    conn.query(sqlStr, sqlParams, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            //3）后端——返回json结果给前端
            //[] 空数组表示验证失败   [].length>0数组非空就表示验证成功
            if (result.length > 0) {
                // [{"userid":35,"username":"yinhonxia","userpwd":"123456","usergroup":"超级管理员","addDate":"2018-12-31T08:23:57.000Z","isLocked":0}]
                //登录成功：写入cookie
                res.cookie("userid", result[0].userid);
                res.cookie("username", username);

                res.send({ "isOk": true, "msg": "用户登录成功！" });
            }
            else {
                //登录失败
                res.send({ "isOk": false, "msg": "用户登录失败！" });
            }
        }
    });
});
// 接收前端获取cookie的请求
router.get("/getcookie", (req, res) => {
    let userid = req.cookies.userid;
    let username = req.cookies.username;
    // 存在合法不存在不合法
    if (userid && username) {
        res.send({ "isOk": true });
    } else {
        res.send({ "isOk": false });
    }
})
router.get("/loginOut", (req, res) => {
    res.clearCookie("userid");
    res.clearCookie("username");
    res.send({ "isOk": true })
})


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
module.exports = router;
