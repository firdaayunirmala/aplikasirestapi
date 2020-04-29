var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require('./verifikasi')
var jsonku = require('../controller');

//daftarkan menu registrasi
router.post('/api/v1/register', auth.registrasi);
//daftarkan menu login
router.post('/api/v1/login', auth.login);
//daftarkan menu tambah data service
router.post('/api/v1/tambahdataservice', auth.tambahdataservice);

//daftarkan autorisasi
router.get('/api/v1/rahasia', verifikasi(), auth.halamanrahasia);
router.get('/api/v1/rahasia1', verifikasi(), auth.halamanrahasia1);

module.exports=router;