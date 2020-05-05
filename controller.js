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
exports.tampilservis = function(req,res){
    
    connection.query('SELECT t_user.nama_user, t_servis.tgl_servis, t_montir.nama_montir, t_sparepart.nama_sparepart, t_sparepart.harga_sparepart, t_servis.jumlah_sparepart, t_montir.harga_perjam, t_servis.total_servis FROM t_servis JOIN t_user JOIN t_sparepart JOIN t_montir WHERE t_servis.id_user = t_user.id_user AND t_servis.id_sparepart = t_sparepart.id_sparepart AND t_servis.id_montir = t_montir.id_montir ORDER BY t_user.id_user ',
     function(error, rows, fields){
        if(error){
            console.log(error);
        }else {
            response.ok(rows, res)
        }
    });
};


//end