var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi1 = require('./verifikasi');
var verifikasi2 = require('./verifikasi');

//daftarkan menu registrasi
router.post('/api/v1/register', auth.registrasi);

//daftarkan menu login
router.post('/api/v1/login', auth.login);

//daftarkan menu tambah, ubah & hapus data service
router.post('/api/v1/tambahservis',verifikasi1(),auth.tambahservis);

//daftarkan autorisasi
router.get('/api/v1/rahasiaa',verifikasi1(),auth.halamanadmin);
router.get('/api/v1/rahasiap',verifikasi2(),auth.halamanpelanggan);




module.exports=router;