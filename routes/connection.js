var mongoose = require("mongoose");
var signup1 = require("../model/signup");
var profile1 = require("../model/profile");

// mongoose.connect("mongodb://localhost:27017/vidjot" , { useNewUrlParser: true }); 
mongoose.connect('mongodb://tusharbansal:tushar.12@ds135234.mlab.com:35234/vidjot', { useNewUrlParser: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback) {
   console.log("Mongo Connection Succeeded."); 
});
 
var signup_connect = mongoose.model("signup", signup1.signup); 
var profile_connect = mongoose.model("profile", profile1.profile); 
 
module.exports.signup_connect = signup_connect; 
module.exports.profile_connect = profile_connect;
