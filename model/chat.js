var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chat = new Schema({
    name : {type:String},
    //connectedChat: [connectedChat]   
    connectedChat : [{type: Schema.Types.ObjectId, ref: "comment"}]
});

var connectedChat = new Schema({
    connectedName: {type:String},
    msg : {type:String}
});

// module.exports = mongoose.model('product', Schema);
module.exports = {
    chat : chat,
    connectedChat: connectedChat
}; 

