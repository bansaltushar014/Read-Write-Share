var passport = require('passport');
var Models = require("../routes/connection");
const LocalStrategy = require('passport-local').Strategy;
const { check, validationResult } = require('express-validator/check');


// serialize and deserialize imp for the passport and added as code init
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  // User.findById(id, function(err, user) {
  Models.signup_connect.findById(id, function (err, user) {
    cb(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({

  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  function (req, email, password, done) {
    // check('email','Invalid email').isEmail();
    // check('password','Invalid Password').isLength({min:4});
    // var errors = validationResult(req);
    // if(errors){
    //   var messages=[];
    //   // errors.forEach(function(error){
    //   //   console.log(error.msg);
    //   //   messages.push(error.msg);
    //   // });
    //   // return done(null,false,req.flash('error',messages));
    //   console.log('it is working here');
    //   return done(null,false,{message: 'some prob here'});
    // }

    Models.signup_connect.findOne({
      email: email
    }, function (err, user) {
      if (err) {
        console.log("tyui0");
        return done(err);
      }

      if (user) {
        console.log("user already exist dude");
        // req.flash is not used to send the msg, proper way is using the message as parameter
        // then in failure where it is redirected, there catch it using the message req.flash()
        return done(null, false, { message: 'already exist email id' });
      }
      // this commented line below is for the checking the password match, useful in case of signup
      // if (user.password != password) {
      //   return done(null, false);
      // }
      console.log("creating the user");
      // this is the new method to store data in the database
      var newuser = new Models.signup_connect();
      newuser.email = email;
      // how this encryptpassword working ,not clear
      newuser.password = newuser.encryptPassword(password);
      newuser.save(function (err, result) {
        if (err) {
          return done(err);
        }

        return done(null, newuser);
      })

    });
  }
));


passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  // passReqToCallback: true
},
  function (email, password, done) {
    Models.signup_connect.findOne({

      email: email
    }, function (err, user) {
      if (err) {
        console.log("tyui0");
        return done(err);
      }

      if (!user) {
        console.log("user not exist dude");
        // req.flash is not used to send the msg, proper way is using the message as parameter
        // then in failure where it is redirected, there catch it using the message req.flash()
        return done(null, false, { message: 'not exist email id' });
      }

      // this commented line below is for the checking the password match, useful in case of signup
      // why we used validpassword still not clear
      if (!user.validPassword(password)) {
        console.log("user password is " + user.password + "and password is " + password);
        console.log("password not matched");
        return done(null, false, { message: 'password not matched' });
      }
      return done(null, user);
    });
  }
));

var GoogleStrategy = require('passport-google-oauth20');
var keys = require('./keys');

passport.use('google.signin', new GoogleStrategy({
  callbackURL: '/user/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
  // console.log('foring callback');
  // console.log(profile);


  Models.signup_connect.findOne({
    'google.googleid': profile.id
  }, function (err, user) {
    if (err) {
      console.log('getting error');
      return done(err);
    }
    if (user) {
      return done(null, user);
    }
    else {
      var newuser = new Models.signup_connect();
      newuser.google.name = profile.displayName;
      newuser.google.googleid = profile.id;
      newuser.google.emailid = profile.emails[0].value;
      newuser.save(function (err, result) {
        if (err) {
          return done(err);
        } else {
          // console.log('new user creaate +' + newuser);
          return done(null, newuser);
        }
      });
    }
  })


})
)

// facebook
var FacebookStrategy = require('passport-facebook');

passport.use('facebook.signin',new FacebookStrategy({
  clientID: keys.facebook.clientID,
  clientSecret: keys.facebook.clientSecret,
  callbackURL: "https://glacial-cove-50175.herokuapp.com/user/facebookredirect"
},
function(accessToken, refreshToken, profile, done) {
  // console.log('facebook callback');
  // console.log(profile);


  Models.signup_connect.findOne({
    'facebook.facebookid': profile.id
  }, function (err, user) {
    if (err) {
      console.log('getting error');
      return done(err);
    }
    if (user) {
      return done(null, user);
    }
    else {
      var newuser = new Models.signup_connect();
      newuser.facebook.name = profile.displayName;
      newuser.facebook.facebookid = profile.id;
      
      newuser.save(function (err, result) {
        if (err) {
          return done(err);
        } else {
          // console.log('new user creaate +' + newuser);
          return done(null, newuser);
        }
      });
    }
  })
      
}
));

