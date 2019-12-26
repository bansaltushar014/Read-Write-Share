var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser')
var passport = require('passport');
var Models = require("./connection"); 

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res)=> res.send('working'));
app.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
app.get('/error', (req, res) => res.send("error logging in"));

app.get('/signup',isnotLoggedIn, (req,res)=>{ 
    // var sess=req.session;
    // console.log('runnng in signp '+sess);
    // this is the way to catch the flash && the name req.user is just to pass at the navbar
        res.render('user/index',  {message: req.flash('error'),name: req.user});
    })

app.get('/signin',isnotLoggedIn, (req,res)=>{ 
    // var sess=req.session;
    // console.log('runnning in signin'+sess);
    // this is the way to catch the flash && the name req.user is just to pass at the navbar
        res.render('user/index',  {message: req.flash('error'),name: req.user});
    })

app.post('/signup',
passport.authenticate('local.signup', { failureRedirect: '/user/signup', failureFlash:true }),
function(req, res) {
    // res.render('homepage/index' , {name: req.user});
    res.redirect('/');
});

app.post('/signin',
passport.authenticate('local.signin', { failureRedirect: '/user/signin', failureFlash:true }),
function(req, res) {
    // res.render('homepage/index' , {name: req.user});
    res.redirect('/');
});

app.get('/logout', function(req, res){
    req.logout();
    // below if else line to check user is logged in or not
    // if (req.user) {
    //     console.log('logged in');
    // } else {
    //     console.log('logged in not');
    // }
    // below two lines are the way to check, if there is any session on not
    // var sess=req.session;
    // console.log(sess);
    res.redirect('/');
  });


app.get('/google',isnotLoggedIn, passport.authenticate('google.signin',{
    scope:['email']
}));
  
app.get('/redirect',passport.authenticate('google.signin'), function(req,res){
    
    // res.send(req.user);
    res.redirect('/');
    // res.render('homepage/index' , {name: req.user});
})

app.get('/facebook',isnotLoggedIn,
  passport.authenticate('facebook.signin'));

  app.get('/facebookredirect',
  passport.authenticate('facebook.signin', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    
    // res.send(req.user);
    res.redirect('/');
    // res.render('homepage/index' , {name: req.user});
  });

//  app.get('/design',function(req,res){
//     res.render('user/design');
//  }) ;


function isnotLoggedIn(req,res,next){  
if(!req.isAuthenticated()){
    // yes they have not logged in yet
        return next();
}
else{
        res.render('homepage/index' , {name: req.user});
}
} 

module.exports = app;