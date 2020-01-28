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
      var newchats = new Models.connectedChat();

      newchats.chats.push({
        name: msg.nama,
        msg: msg.message,
        timestamp: Date()
      })

      console.log(newchats.chats[0]);


      Models.chat.findOne({
        'fromName': msg.nama
      }, function (err, user) {
        if (err) {
            return console.log(err);
        }
        if (user) {
          console.log("user exist");

          Models.chat.findOne({
            'connectedChat.toName': 'bite@gmail.com'
          }, function (err, user) {
            if (err) {
                return console.log(err);
            }
            if (user) {
              console.log(user); 
              user.connectedChat[0].chats.push(
                newchats.chats[0]
              )
              user.save(function (err, result) {
                if (err) {
                 console.log(err);
                }        
                io.emit('chat message', data);
              })
            } else {
              console.log("not workeda");
              newmsg.fromName = msg.nama;
              newmsg.connectedChat.push({
                toName : 'bite@gmail.com',
                chats : newchats.chats[0]
              })
                    
              // //newmsg.connectedChat.msg.timestamp = Date.now();
              newmsg.save(function (err, result) {
                if (err) {
                 console.log(err);
                }        
                io.emit('chat message', data);
              })
            }
          })


        } else {
          console.log("not worked");
        }
      })

      // db.users.update(
      //   { "username": "Oran.Hammes" },
      //   $set: { "Documents.4": "newimage.jpg" } });


     
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
