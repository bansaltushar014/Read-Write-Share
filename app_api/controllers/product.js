var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var signup = new Schema({
    username: {type:String,require:true},
    email: {type:String,require:true},
    password: {type:String, require:true},
});

var Signup = mongoose.model('signups', signup);

exports.signup = function (req, res, next) {
    Signup.find(function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
};

exports.test = function (req, res) {
    res.send('Greetings from the Test controllerl!');
};
