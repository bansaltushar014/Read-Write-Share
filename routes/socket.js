var express = require('express');
var router = express.Router();
var linkifyHtml = require('linkifyjs/html');
var linkifyStr = require('linkifyjs/string');
var request = require('request');
var Models = require("../model/connection");
var saveChat = require("./saveChat");
var isEmail;

function socket(io) {

  io.on('connection', function(socket){
    console.log(' User Connected');
    socket.on('new message', function(msg){
      var options = {/* … */};
      var data = {
        nama: linkifyStr(msg.nama, options),
        message: linkifyStr(msg.message, options)
      }
      // var newmsg = new Models.chat();
      // var newchats = new Models.connectedChat();

      // newchats.chats.push({
      //   name: msg.nama,
      //   msg: msg.message,
      //   timestamp: Date()
      // })

      // console.log(newchats.chats[0]);
    
      saveChat.sender(msg.nama,msg.message, isEmail, io ,data);
      saveChat.receiver(msg.nama, msg.message, isEmail, io, data);

      // db.users.update(
      //   { "username": "Oran.Hammes" },
      //   $set: { "Documents.4": "newimage.jpg" } }); 
    });
  });

  router.post('/email', function(req,res){
    console.log(req.body.email);
    isEmail = req.body.email;
  })

  /* .GET home page. */
  router.get('/home',isLoggedIn, function(req, res, next) {
    request.get("https://floating-stream-61460.herokuapp.com/api/signup", (err, response, body) => {
        if (err) {
            return next(err);
        }
        res.render('chat/index', {name:req.user, data: JSON.parse(body)});
    });
  });
}

function isLoggedIn(req,res,next){  
    if(req.isAuthenticated()){
       return next();
      } else {
       res.redirect('/user/signup');
    }
}

module.exports = {
  router: router,
  sck: socket
}
