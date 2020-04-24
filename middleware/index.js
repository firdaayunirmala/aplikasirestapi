var express = require('express');
var auth = require('./auth');
var router = express.Router();


//daftarkan menu registrasi
router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);
router.get('/api/v1/user', verifikasi(2), auth.rahasiauser);

module.exports = router;