var passport = require('passport');
var Models = require("../model/connection");
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook');
var GoogleStrategy = require('passport-google-oauth20');
var keys = require('../passkeys');
var { check, validationResult } = require('express-validator/check');


// Used to store data in session
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

// Used to remove data in session 
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
        return done(null, false, { message: 'already exist email id' });
      }
      console.log("Creating The User");
      console.log(req.body);
      var newuser = new Models.signup();

      newuser.username = req.body.username;
      newuser.email = req.body.email;
      newuser.password = newuser.encryptPassword(password);
      console.log(newuser);
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
          return done(null, false, { message: 'Not exist email id' });
        }

        if (!user.validPassword(password)) {
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

// JWT Authentication 
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use('jwt.signin', new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("inside");
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            console.log("some error");
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            console.log("inside this");
            return done(null, false);
            // or you could create a new account
        }
    });
}));