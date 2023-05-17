
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blog_nodejs"
});
// router.get('/', (req, res) => {
//     con.query("select * from nguoidung", function (err, result, fields) {
//         if (err) throw err
//         console.log(result);
//         console.log(fields);
//     })
// })
con.query('select * from `nguoidung`', function (err, results, fields) {
    console.log('Ket noi database thanh cong')
})
module.exports = con;
