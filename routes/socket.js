var express = require('express');
var router = express.Router();
var linkifyHtml = require('linkifyjs/html');
var linkifyStr = require('linkifyjs/string');
var request = require('request');
var Models = require("../model/connection");

function socket(io) {

  io.on('connection', function(socket){
    console.log(' User Connected');
    socket.on('new message', function(msg){
      var options = {/* … */};
      var data = {
        nama: linkifyStr(msg.nama, options),
        message: linkifyStr(msg.message, options)
      }
      var newmsg = new Models.chat();

      newmsg.name = msg.nama;
      newmsg.connectedChat.push({
        connectedName : 'bite@gmail.com',
        msg : msg.message
      })
      // newmsg.connectedChat.connectedName = 'bite@gmail.com';
      
      // newmsg.connectedChat.msg = msg.message;
      // //newmsg.connectedChat.msg.timestamp = Date.now();
      newmsg.save(function (err, result) {
        if (err) {
         console.log(err);
        }
        
        io.emit('chat message', data);
      })
      
    });
  });

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
