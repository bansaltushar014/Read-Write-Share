var mongoose = require("mongoose");
var signup = require("./signup");
var profile = require("./profile");

// mongoose.connect("mongodb://localhost:27017/vidjot" , { useNewUrlParser: true }); 
mongoose.connect('mongodb://tusharbansal:tushar.12@ds135234.mlab.com:35234/vidjot', { useNewUrlParser: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback) {
   console.log("Mongo Connection Succeeded."); 
});
 
var signup = mongoose.model("signup", signup); 
var profile = mongoose.model("profile", profile); 

module.exports = {
   signup : signup,
   profile : profile
}
