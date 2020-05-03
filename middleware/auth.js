var connection = require("../koneksi");
var mysql = require("mysql");
var md5 = require("MD5");
var mysql = require('mysql');
var response = require('../res');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/secret');
var ip = require("ip");

//controller untuk register
exports.registrasi = function (req, res) {
    var post = {
        nama_user: req.body.nama_user,
        email: req.body.email,
        password: md5(req.body.password),
        level: req.body.level
    }

    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["t_user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 0) {
                var query = "INSERT INTO ?? SET ?";
                var table = ["t_user"];
                query = mysql.format(query, table);
                connection.query(query, post, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        response.ok("Berhasil menambahkan data user baru", res);
                    }
                });
            } else {
                response.ok("Email sudah terdaftar!", res);
            }
        }
    })
}

// controller untuk login
exports.login = function (req, res) {

    //var em = req.body.email || req.query.email;
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";

    var table = ["t_user", "password", md5(post.password), "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error)
        }
        else {
            if (rows.length == 1) {
                var token = jwt.sign({ rows }, config.secret, {
                    expiresIn: 1440
                });
                id_user = rows[0].id_user;

                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO  ?? SET ?";
                var table = ["akses_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                            success: true,
                            message: 'Token JWT generated',
                            token: token,
                            currUser: data.id_user
                        });
                    }
                });
            }
            else {
                res.json({ "Error": true, "Message": "wrong email/password combination" });
            }

        }
    });
}

//menambahkan data service
exports.tambahdataservice = function (req, res) {
    var post = {
        tgl_servis: new Date(),
        id_user: req.body.id_user,
        id_montir: req.body.id_montir,
        jumlah_sparepart: req.body.jumlah_sparepart,
        id_sparepart: req.body.id_sparepart,
        jam_servis: req.body.jam_servis
    }
    var query = "INSERT INTO ?? SET ?";
    var table = ["t_servis"];

    query = mysql.format(query, table);
    connection.query(query, post, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil Menambahkan Data", res)
        }
    });
};


exports.halamanrahasia = function (req, res) {
    response.ok("Halaman ini hanya untuk admin dengan level = 1!", res);
}
exports.halamanrahasia1 = function (req, res) {
    response.ok("Halaman ini hanya untuk pelanggan dengan level = 2!", res);
}