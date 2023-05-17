const express = require('express');
var router = express.Router();
const mysql = require('mysql');
// kết nối database
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blog_nodejs"
});

// Lấy all dữ liệu từ database
router.get('/', (req, res, next) => {
    con.query("SELECT * FROM nguoidung", function (err, queryResult, fields) {
        if (err) throw err;
        console.log(queryResult);
        const accounts = queryResult;
        res.render('account.ejs', { accounts });
    });
});
// lấy 1 dừ database bằng id
router.get('/gettaikhoan/:id', (req, res, next) => {
    var id = req.params.id;
    con.query("SELECT * FROM nguoidung WHERE id_nguoiDung = '" + id + "'", function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0) {
            res.send('Không tìm thấy người dùng');
            return;
        }
        const user = result[0];
        res.render('user.ejs', { user });
    });
});
// thêm dữ liệu db
router.post('/create-user', (req, res, next) => {
    const data = {
        tennguoiDung: req.body.tennguoiDung,
        email: req.body.email,
        password: req.body.password,
        quyen: req.body.quyen
    };
    con.query('insert into nguoidung set ?', data, function (err, result, fields) {
        if (err) throw err
        console.log("Thêm dữ liệu thành công:");
        res.redirect('back');


    });
});
// sửa dữ liệu db qua id
router.put('/:id', (req, res, next) => {
    var id_nguoiDung = req.params.id_nguoiDung;
    var newPassword = req.body.newPassword;

    var sql = "UPDATE nguoidung SET password = '" + newPassword + "' WHERE id_nguoiDung = " + id_nguoiDung;
    con.query(sql, function (err, result) {
        if (err) throw err
        console.log("Record updated!");
    });
});
// xóa 1 dữ liệu db qua id
router.delete('/:id', (req, res, next) => {
    var deleteID = req.params.id
    var sql = "delete from taikhoan where id='" + deleteID + "'";
    con.query(sql, function (err, result) {
        if (err) throw err
        console.log("Đã xóa thành công");
        res.send(result)
    })
})


module.exports = router