const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type:String, require:true, min:6},
    email: {type:String, require:true, max:200},
    password: {type:String, require:true, max:1000, min:6},
    date: {type: Date, default:Date.now}
});

module.exports = mongoose.model('User', userSchema);