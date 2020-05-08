var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require('./verifikasi');

//daftarkan menu registrasi
router.post('/api/v1/register', auth.registrasi);

//daftarkan menu login
router.post('/api/v1/login', auth.login);

//daftarkan menu tambah, ubah & hapus data service
router.post('/api/v1/tambahservis',verifikasi(),auth.tambahservis);

//daftarkan menu tambah, ubah & hapus data montir
router.post('/api/v1/tambahmontir',verifikasi(), auth.tambahmontir);

//daftarkan menu tambah, ubah & hapus data sparepart
router.post('/api/v1/tambahsparepart',verifikasi(), auth.tambahsparepart);

//daftarkan menu tambah, ubah, & hapus data user
router.post('/api/v1/tambahuser',verifikasi(), auth.tambahuser);

//daftarkan menu tambah, ubah & hapus data level
router.post('/api/v1/tambahlevel',verifikasi(), auth.tambahlevel);

//daftarkan autorisasi
router.get('/api/v1/rahasiaa',verifikasi(),auth.halamanadmin);
router.get('/api/v1/rahasiap',verifikasi(),auth.halamanpelanggan);

module.exports=router;