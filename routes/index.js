var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json())

/* .GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('homepage/index',{name:req.user});
});

module.exports = router;
