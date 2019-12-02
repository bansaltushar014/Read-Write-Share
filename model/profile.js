var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var profile = new Schema({
    id:{type:String},
    content: {type:String},
    image: {type:String}
   
});

// module.exports = mongoose.model('product', Schema);
module.exports.profile = profile; 

