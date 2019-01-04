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




router.post("/add", (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    // 接收数据
    let {classname,barcode,goodsname,saleprice,marketprice,costprice,stocknum,weight,unit,isdiscount,ispromotion,details}=req.body;
    // 测试成功已经拿到前端的数据
    console.log(classname,barcode,goodsname,saleprice,marketprice,costprice,stocknum,weight,unit,isdiscount,ispromotion,details);
    // 准备写入数据库
    let sqlStr = "insert into goodsinfo(classname,barcode,goodsname,saleprice,marketprice,costprice,stocknum,weight,unit,isdiscount,ispromotion,details) values(?,?,?,?,?,?,?,?,?,?,?,?)";
    let sqlParmas = [classname,barcode,goodsname,saleprice,marketprice,costprice,stocknum,weight,unit,isdiscount,ispromotion,details];
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
                res.json({ "isOk": true, "msg": "商品添加成功！" });
            } else {
                res.json({ "isOk": false,  "msg": "商品添加失败！" });
            }
        }
    });

});
router.get("/goodsmanage",(req,res)=>{

})



router.get("/getgoods", (req, res) => {
    let {classname,keywords}=req.query;
    // 测试成功，后端接收到数据
    console.log(classname,keywords);
     //构造sql语句【全表】
     let sqlStr="select * from goodsinfo where 1=1"; //where 1=1永远成立，全表查询
    //3）后端——判断 商品分类和关键词 是否是有效的值，然后在拼接sql语句
    //商品分类有值就执行拼接
    if(classname){
        sqlStr+=` and classname='${classname}'`; //字符串加引号
    }
    //关键词有值就执行拼接
    if(keywords){
        sqlStr+=` and (goodsname like '%${keywords}%' or barcode like '%${keywords}%')`; //商品名和条码二选一
    }

    //拼接排序的字句【排序】
    sqlStr+=" order by goodsid DESC";
    // 查询所有的数据数量
    let total = 0;
    conn.query(sqlStr,(err,goodsTotal)=>{
        if (err) {
            throw err;
        }
        else {
            //3. 返回查询的用户数据给前端
            total=goodsTotal.length;
            console.log("总条数"+total);
        }
    })
    // // 分页功能的实现
    let {pageSize,currentPage}=req.query;
    // console.log("当前页大小，当前页"+pagesize,currentpage)

     console.log("pagesize"+pageSize,"currentpage"+currentPage)
     if(pageSize && currentPage){
        let skip=(currentPage-1)*pageSize; //跳过的条数
        sqlStr+=` limit ${skip},${pageSize}`;
    }

    conn.query(sqlStr, (err, goodsArray) => {
        if (err) {
            throw err;
        }
        else {
            //3. 返回查询的用户数据给前端
            // console.log(goodsArray);
            res.send({goodsArray,total});
            console.log(goodsArray)
        }
    })
});


module.exports = router;
