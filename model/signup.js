var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


var signup = new Schema({
   
    email: {type:String,require:true},
    password: {type:String, require:true},
    google: {
    name: {type:String},
    googleid: {type:String},
    emailid: {type:String}
      },
    facebook:{
        name: {type:String},
        facebookid:{type:String}
        }
});
// role of these two still little unclear
signup.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};
signup.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


// module.exports = mongoose.model('product', Schema);
module.exports.signup = signup; 

