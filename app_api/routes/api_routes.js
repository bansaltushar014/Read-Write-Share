var express = require('express');
var router = express.Router();

var product = require('../controllers/product');
var mail = require('../controllers/mail');


router.post('/sendmail', mail.send_mail);
router.get('/testmail', mail.test);
router.get('/test', product.test);
router.post('/create', product.product_create);
router.post('/createroom', product.room_create);
router.get('/getrooms' ,product.room_get);
router.get('/:id', product.product_details);
router.delete('/:id/delete', product.product_delete);

module.exports = router;