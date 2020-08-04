var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connectedChat = new Schema({
    toName: {type:String},
    chats : [{
        name: {type:String},
        msg:  {type:String},
        timestamp:  {type:String}
    }]
});

//mongoose.model('comment', connectedChat);
var chat = new Schema({
    fromName : {type:String},
    connectedChat: [connectedChat]   
    //connectedChat : [{type: Schema.Types.ObjectId, ref: 'comment'}]
});
 
// module.exports = mongoose.model('product', Schema);
module.exports = {
    chat : chat,
    connectedChat : connectedChat 
}; 

