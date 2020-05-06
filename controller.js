'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Aplikasi REST API ku berjalan!", res)
};

//menampilkan semua data tabel sparepart
exports.tampilsemuasparepart = function (req, res) {
    connection.query('SELECT * FROM t_sparepart', function (error, rows, fileds) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res)
        }
    });
};

//menampilkan semua data tabel montir
exports.tampilsemuamontir = function (req, res) {

    connection.query('SELECT * FROM t_montir ', function (error, rows, fields) {

        if (error) {

            connection.log(error);

        } else

            response.ok(rows, res)

    });

};

//menampilkan berdasarkan semua data berdasarkan id

exports.tampilidsparepart = function (req, res) {

    let id = req.params.id;
    connection.query('SELECT * FROM t_sparepart WHERE id_sparepart = ?', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        });

}

//menampilkan berdasarkan semua data berdasarkan id

exports.tampilidmontir = function (req, res) {

    let id = req.params.id;

    connection.query('SELECT * FROM t_montir WHERE id_montir = ?', [id],

        function (error, rows, fields) {

            if (error) {

                console.log(error);

            } else {

                response.ok(rows, res);
            }
        });

}

//mengetahui total harga servis oleh pelanggan
exports.hitungtotal = function (req, res) {
    let id = req.params.id;

    connection.query('SELECT * t_sparepart.harga_sparepart * t_servis.jumlah_sparepart AS total_harga_sparepart FROM t_sparepart, t_servis WHERE t_sparepart.id_sparepart = t_servis.id_sparepat AND t_servis.id_user = ?', [id],
        function (error, rows, fields) {

            if (error) {

                connection.log(error);

            } else

                response.ok("Berhasilkan menampilkan total service", rows, res)

        });
};

//menampilkan semua data tabel service 
exports.tampilservis = function (req, res) {

    connection.query('SELECT t_user.nama_user, t_servis.tgl_servis, t_montir.nama_montir, t_sparepart.nama_sparepart, t_sparepart.harga_sparepart, t_servis.jumlah_sparepart, t_montir.harga_perjam, t_servis.total_servis FROM t_servis JOIN t_user JOIN t_sparepart JOIN t_montir WHERE t_servis.id_user = t_user.id_user AND t_servis.id_sparepart = t_sparepart.id_sparepart AND t_servis.id_montir = t_montir.id_montir ORDER BY t_user.id_user ',
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res)
            }
        });
};

//menambahkan data untuk tabel montir
exports.tambahmontir = function (req, res) {
    var nama_montir = req.body.nama_montir;
    var harga_perjam = req.body.harga_perjam;

    connection.query('INSERT INTO t_montir (nama_montir,harga_perjam) VALUES(?,?)',
        [nama_montir, harga_perjam], function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil menambah data montir", res)
            }
        });
};

//menambahkan data untuk tabel sparepart
exports.tambahsparepart = function(req , res){
    var nama_sparepart = req.body.nama_sparepart;
    var harga_sparepart = req.body.harga_sparepart;
    var satuan = req.body.satuan;

    connection.query('INSERT INTO t_sparepart (nama_sparepart,harga_sparepart,satuan) VALUES(?,?,?)',
    [nama_sparepart,harga_sparepart,satuan],
    function (error, rows, fields)
    {
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil menambah data sparepart",res)
        }
    });
};

//menambahkan data untuk tabel user
exports.tambahuser = function (req, res) {
    var nama_user = req.body.nama_user;
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;
    

    connection.query('INSERT INTO t_user (nama_user, email, password, role) VALUES(?,?,?,?)',
        [nama_user, email, password, role], 
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menambahkan Data  User", res)
            }
        });
};

//menambahkan data untuk tabel level
exports.tambahlevel = function (req, res) {
    var nama_level = req.body.nama_level;
    
    connection.query('INSERT INTO t_level (nama_level) VALUES(?)',
        [nama_level], 
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menambahkan Data Level", res)
            }
        });
};

//menambahkan data untuk tabel servis
exports.tambahservis = function (req, res) {
    var tgl_servis = req.body.tgl_servis;
    var id_user = req.body.id_user;
    var id_montir = req.body.id_montir;
    var jumlah_sparepart = req.body.jumlah_sparepart;
    var id_sparepart = req.body.id_sparepart;
    
    connection.query('INSERT INTO t_servis (tgl_servis, id_user, id_montir, jumlah_sparepart, id_sparepart) VALUES(?,?,?,?,?)',
    [ tgl_servis, id_user, id_montir, jumlah_sparepart, id_sparepart], 
    function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil Menambahkan Data Servis", res)
        }
        });
};

//mengubah data di tabel montir
exports.ubahmontir = function (req, res) {
    var id_montir = req.body.id_montir;
    var nama_montir = req.body.nama_montir;
    var harga_perjam = req.body.harga_perjam;

    connection.query('UPDATE t_montir SET nama_montir=?, harga_perjam=? WHERE id_montir=?', 
    [id_montir, nama_montir, harga_perjam,],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Ubah Data Montir", res)
            }
        });
};

//mengubah data di tabel Sparepart
exports.ubahsparepart = function (req, res) {
    var id_sparepart = req.body.id_sparepart;
    var nama_sparepart = req.body.nama_sparepart;
    var harga_sparepart = req.body.harga_sparepart;
    var satuan = req.body.satuan;
    
    connection.query('UPDATE t_sparepart SET nama_sparepart=?, harga_sparepart=?, satuan=? WHERE id_sparepart=?',
     [nama_sparepart, harga_sparepart, satuan, id_sparepart],
    function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Mengubah Data", res)
            }
        });
};

//mengubah data di tabel User
exports.ubahuser = function (req, res) {
    var nama_user = req.body.nama_user;
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;

    connection.query('UPDATE t_user SET nama_user=?, email=?, password=?, role=? WHERE id_user=?',
        [nama_user, email, password, role], 
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Mengubah Data", res)
            }
        });
};

//mengubah data di tabel level
exports.ubahlevel = function (req, res) {
    var id_level = req.body.id_level;
    var nama_level = req.body.nama_level;
    
    connection.query('UPDATE t_level SET nama_level=? WHERE id_level=?',
        [id_level,nama_level], 
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Mengubah Data", res)
            }
        });
};

//mengubah data di tabel service
exports.ubahservis = function (req, res) {
    var id_servis = req.body.id_service;
    var tgl_servis = new Date();
    var id_user = req.body.id_user;
    var id_montir = req.body.id_montir;
    var jumlah_sparepart = req.body.jumlah_sparepart;
    var id_sparepart = req.body.id_sparepart;
    var total_servis = req.body.total_servis;
    
    connection.query('UPDATE t_servis SET tgl_servis=?, id_user=?, id_montir=?, jumlah_sparepart=?, id_sparepart=? total_servis=? WHERE id_servis=?',
        [id_servis, tgl_servis, id_user, id_montir, jumlah_sparepart, id_sparepart, total_servis], 
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Mengubah Data", res)
            }
        });
};

//Menghapus data berdasarkan id
exports.hapusmontir = function(req, res){
    var id = req.body.id_montir;
    connection.query('DELETE FROM t_montir WHERE id_montir=?', [id],
    function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil Hapus Data", res)
        }
    });
};

//Menghapus data berdasarkan id
exports.hapusSparepart = function(req, res){
    var id = req.body.id_sparepart;
    connection.query('DELETE FROM t_sparepart WHERE id_sparepart=?', [id],
    function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil Hapus Data", res)
        }
    });
};

exports.hapususer = function(req, res){
    var id = req.body.id_user;
    connection.query('DELETE FROM t_user WHERE id_user=?', [id],
    function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil Hapus Data", res)
        }
    });
};


//end