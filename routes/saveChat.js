var Models = require("../model/connection");

// finding chats of sender

exports.sender = function (name, msg, isEmail, io, data) {

    var newmsg = new Models.chat();
    var newchats = new Models.connectedChat();

    newchats.chats.push({
        name: name,
        msg: msg,
        timestamp: Date()
    })

    Models.chat.findOne({
        'fromName': name
    }, function (err, user) {
        if (err) {
            return console.log(err);
        }
        if (user) {
            console.log("user exist");

            //finding chats of receiver
            Models.chat.findOne({
                'connectedChat.toName': isEmail
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
                    newmsg.fromName = name;
                    newmsg.connectedChat.push({
                        toName: isEmail,
                        chats: newchats.chats[0]
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
            console.log("user not exist");

            newmsg.fromName = name;
            newmsg.connectedChat.push({
                toName: isEmail,
                chats: newchats.chats[0]
            })
             //newmsg.connectedChat.msg.timestamp = Date.now();
            newmsg.save(function (err, result) {
                if (err) {
                    console.log(err);
                }
                io.emit('chat message', data);
            })

        }
    })

}

exports.receiver = function(name, msg, isEmail, io, data){

    var newmsg = new Models.chat();
    var newchats = new Models.connectedChat();

    newchats.chats.push({
        name: name,
        msg: msg,
        timestamp: Date()
    })

       // Reverse save the chats as well
       // Finding chats of receiver
       Models.chat.findOne({
        'fromName': isEmail
      }, function (err, user) {
        if (err) {
            return console.log(err);
        }
        if (user) {
            console.log("user exist");

            //finding chats of sender
            Models.chat.findOne({
              'connectedChat.toName': name
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
                    } else {
                     console.log("saved 1");
                    }
                  })
              } else {
                  console.log("not workeda");
                  newmsg.fromName = isEmail;
                  newmsg.connectedChat.push({
                    toName : name,
                    chats : newchats.chats[0]
                  })      
                  // //newmsg.connectedChat.msg.timestamp = Date.now();
                  newmsg.save(function (err, result) {
                    if (err) {
                    console.log(err);
                    }  else {
                      console.log("saved 2");
                     }
                  })
              }
            })
        } else {
              console.log("user not exist");

              newmsg.fromName = isEmail;
              newmsg.connectedChat.push({
                toName : name,
                chats : newchats.chats[0]
              })      
              // //newmsg.connectedChat.msg.timestamp = Date.now();
              newmsg.save(function (err, result) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("chats saved 3");
                }
              })

        }
      })
}