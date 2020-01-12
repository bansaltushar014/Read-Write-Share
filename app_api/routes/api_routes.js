var express = require('express');
var router = express.Router();

var product_controller = require('./controllers/product.controller');
var mail_controller = require('./controllers/mail.controller');

router.post('/sendmail', mail_controller.send_mail);
router.get('/testmail', mail_controller.test);
router.get('/test', product_controller.test);
router.post('/create', product_controller.product_create);
router.post('/createroom', product_controller.room_create);
router.get('/getrooms' ,product_controller.room_get);
router.get('/:id', product_controller.product_details);
router.delete('/:id/delete', product_controller.product_delete);

module.exports = router;