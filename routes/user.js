var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser')
var passport = require('passport');
var jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('working'));
app.get('/success', (req, res) => res.send("Welcome " + req.query.username + "!!"));
app.get('/error', (req, res) => res.send("error logging in"));

app.get('/signup', isnotLoggedIn, (req, res) => {
    res.render('user/index', { message: req.flash('error'), name: req.user });
})

app.get('/signin', isnotLoggedIn, (req, res) => {
    res.render('user/index', { message: req.flash('error'), name: req.user });
})

app.post('/signup',
    passport.authenticate('local.signup', { failureRedirect: '/user/signup', failureFlash: true }),
    function (req, res) {
        res.redirect('/');
    });

app.post('/signin',
    passport.authenticate('local.signin', { failureRedirect: '/user/signin', failureFlash: true }),
    function (req, res) {
        res.redirect('/');
    });

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


app.get('/google', isnotLoggedIn, passport.authenticate('google.signin', {
    scope: ['email']
}));

app.get('/redirect', passport.authenticate('google.signin'), function (req, res) {
    res.redirect('/');
})

app.get('/facebook', isnotLoggedIn,
    passport.authenticate('facebook.signin'));

app.get('/facebookredirect',
    passport.authenticate('facebook.signin', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });


app.post('/token',

    function (req, res) {
        var user = {
            email: req.body.email,
            password: req.body.password
        };

        var token = jwt.sign(user, 'secret', { expiresIn: 600000 });
        res.json({ token });
    });

app.get('/token1', passport.authenticate('jwt.signin', { session: 'false' }), function (req, res) {
    res.send("success");
});

function isnotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.render('homepage/index', { name: req.user });
    }
}

module.exports = app;