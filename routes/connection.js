var mongoose = require("mongoose");
var signup1 = require("../model/signup");
var profile1 = require("../model/profile");


/* Imports the Bugs module. It contains the bug schema we need. */
// mongoose.connect("mongodb://localhost:27017/vidjot" , { useNewUrlParser: true }); //Test is the database name. 
mongoose.connect('mongodb://tusharbansal:tushar.12@ds135234.mlab.com:35234/vidjot', { useNewUrlParser: true });

var db = mongoose.connection;
 
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback) {
   console.log("Mongo Connection Succeeded."); /* Once the database connection has succeeded, the code in db.once is executed. */
});
 
var signup_connect = mongoose.model("signup", signup1.signup); //This creates the Bug model.
//. var Bug1 = mongoose.model("Bug1", Bugs1.product1); 
var profile_connect = mongoose.model("profile", profile1.profile); //This creates .the Bug model.
 
module.exports.signup_connect = signup_connect; /* Export the Bug model so index.js can access it. */
// module.exports.Bug1 = Bug1;
module.exports.profile_connect = profile_connect;
