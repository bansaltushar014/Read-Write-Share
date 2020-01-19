var passport = require('passport');
var Models = require("../model/connection");
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook');
var GoogleStrategy = require('passport-google-oauth20');
var keys = require('../passkeys');
var { check, validationResult } = require('express-validator/check');


passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  Models.signup.findById(id, function (err, user) {
    cb(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({
  emailField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  function (req, email, password, done) {
    Models.signup.findOne({
      email: email
    }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (user) {
        console.log("user already exist");
        // req.flash is not used to send the msg, proper way is using the message as parameter
        // then in failure where it is redirected, there catch it using the message req.flash()
        return done(null, false, { message: 'already exist email id' });
      }
      console.log("Creating The User");
      console.log(req.body);
      var newuser = new Models.signup();

      newuser.username = req.body.username;
      newuser.email = email;
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
    Models.signup.findOne({
      email: email
    },
      function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log("User not exist");
          // req.flash is not used to send the msg, proper way is using the message as parameter
          // then in failure where it is redirected, there catch it using the message req.flash()
          return done(null, false, { message: 'Not exist email id' });
        }

        // this commented line below is for the checking the password match, useful in case of signup
        // why we used validpassword still not clear
        if (!user.validPassword(password)) {
          console.log("User password is " + user.password + "and password is " + password);
          console.log("Password not matched");
          return done(null, false, { message: 'Password not matched' });
        }
        return done(null, user);
      });
  }
));

//Google
passport.use('google.signin', new GoogleStrategy({

  callbackURL: '/user/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret

}, (accessToken, refreshToken, profile, done) => {

  Models.signup.findOne({

    'google.googleid': profile.id

  }, function (err, user) {

    if (err) {
      console.log('getting error');
      return done(err);
    }

    if (user) {
      return done(null, user);
    } else {

      var newuser = new Models.signup();
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
passport.use('facebook.signin', new FacebookStrategy({

  clientID: keys.facebook.clientID,
  clientSecret: keys.facebook.clientSecret,
  callbackURL: "https://glacial-cove-50175.herokuapp.com/user/facebookredirect"
}, function (accessToken, refreshToken, profile, done) {

  Models.signup.findOne({
    'facebook.facebookid': profile.id

  }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (user) {
      return done(null, user);
    }

    else {

      var newuser = new Models.signup();
      newuser.facebook.name = profile.displayName;
      newuser.facebook.facebookid = profile.id;
      newuser.save(function (err, result) {

        if (err) {
          return done(err);
        } else {
          return done(null, newuser);
        }
      });
    }
  })
}
));

