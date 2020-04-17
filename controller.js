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

//end