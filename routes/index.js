var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
// used in case of mongoose data store and retrieve 
var Models = require("./connection"); 
// these three are used to use passport
var passport = require('passport');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
router.use(bodyParser.json())



/* .GET home page. */
router.get('/', function(req, res, next) {
  // if (req.user) {
  //   console.log('logged in homepage');
  //   }else{
  //     console.log('logged in not homepage');
  //   }
  //   var sess=req.session;
  //   console.log(sess);
  //   console.log(req.isAuthenticated());
  console.log(req.user);
  res.render('homepage/index',{name:req.user});
});





// this is the code to simple save something in database, where using the post
// request data taken, using body parser managed, and using mongoose saved.

// router.post('/index', function(req,res,next){
//  console.log(req.body);
       
//  var Bee = new Models.signup_connect({ 
//  email: req.body.email,
//  password: req.body.password
// });

// Bee.save(function(error) { 
//  console.log("Your cretentials has been saved.");
//  res.render('success');
// //  indexpage(res) ;  
//  if (error) {
//  console.error(error);
//  }
// });
// });

module.exports = router;
