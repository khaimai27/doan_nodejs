const express = require('express');
var app = express();
const port = 8080;
var bodyParser = require('body-parser');
var accountRouter = require('./routers/account.js');
const path = require('path');
var con = require('./models/connectDB.js');
app.use('/congkhai', express.static(path.join(__dirname, '/assets')));
app.use('/hinhanh', express.static(path.join(__dirname, '/images')));
app.use('/trangpublic', express.static(path.join(__dirname, '/pages')));
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


// app.post('/dangky', (req, res, next) => {
//     var mysql = require('mysql')
//     var con = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "",
//         database: "node_mysql"
//     });
//     con.connect(function (err) {
//         if (err) throw err
//         var sql = "insert into taikhoan (username,password) values('" + req.body.username + "' , '" + req.body.password + "')";
//         con.query(sql, function (err, result) {
//             if (err) throw err
//             console.log("da them 1 record");
//         });
//     });
// });
// app.post('/dangnhap', (req, res, next) => {
//     var mysql = require('mysql')
//     var con = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "",
//         database: "node_mysql"
//     });
//     con.connect(function (err) {
//         if (err) throw err;
//         var username = req.body.username;
//         var password = req.body.password;
//         if (!username || !password) {
//             res.send({ success: false, message: "Tên đăng nhập hoặc mật khẩu không được bỏ trống" });
//             return;
//         }
//         var sql = "SELECT * FROM taikhoan WHERE username = '" + username + "' AND password = '" + password + "'";
//         con.query(sql, function (err, result) {
//             if (err) throw err;
//             if (result.length > 0) {
//                 console.log("Đăng nhập thành công");
//                 res.send({ success: true, message: "Đăng nhập thành công" });
//             } else {
//                 console.log("Tên đăng nhập hoặc mật khẩu không đúng");
//                 console.log(username, password)
//                 res.send({ success: false, message: "Tên đăng nhập hoặc mật khẩu không đúng" });

//             }
//         });
//     });
// });
app.get('/trangchu', (req, res, next) => {
    // if (req.body.quyen != 'admin') {
    //     res.status(403).send('Access denied');
    //     return;
    // }
    var duongDanFile = path.join(__dirname, './index.html')
    res.sendFile(duongDanFile);
});
app.use('/api/taikhoan/', accountRouter)
app.listen(port, (req, res) => {
    console.log(`Server chay tren cong ${port}`);
});