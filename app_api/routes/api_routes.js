var express = require('express');
var router = express.Router();

var product = require('../controllers/product');
var mail = require('../controllers/mail');


router.post('/sendmail', mail.send_mail);
router.get('/testmail', mail.test);
router.get('/test', product.test);


module.exports = router;