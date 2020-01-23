var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var multer = require('multer');
var Photos = require("../model/connection");
var passport = require('passport');
var upload = require('./upload');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/*. GET home page. */
router.get('/',isLoggedIn, function (req, res, next) {
  Photos.profile.find({id:req.session.passport.user},  function (err, photos) {
    if (err) throw err;
    // .console.log(photos);
    res.render('profile/index', {data:photos, name:req.user});
  });
});


// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });
router.post('/index',upload.single('image'), function (req, res) {
    // if (error) {
    //   // res.redirect('/?msg=3');
    //   console.log(error);
    // } else {
      if (req.file == undefined) {
        res.redirect('/?msg=2');
      } else {       
        var fullPath = "uploads/" + req.file.filename;
        var document = {
          id: req.session.passport.user,
          image: fullPath,
          content: req.body.content
        };

        var photo = new Photos.profile(document);
        photo.save(function (error) {
          if (error) {
            throw error;
          }
          res.redirect('/?msg=1');
        });
      
    }
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/user/signup');
  }
}


module.exports = router;

