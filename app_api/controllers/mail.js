
var passkeys = require('../../passkeys');
exports.send_mail = function (req, res) {
  var nodemailer = require('nodemailer');
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: passkeys.email,
      pass: passkeys.password,
    }
  });

  //name = req.body.name;
  //fromemail = req.body.email;
  //text = req.body.text;
  const mailOptions = {
    from: 'tuskibansal@gmail.com', // sender address
    to: 'bansaltushar014@gmail.com', // list of receivers
    subject: 'Hotel-Booking mail from' , // Subject line
    html: 'New mail from <b>' +  '</b> and message is <br>'  // plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
    }
    else
      console.log(info);
  });
  res.send('sent');
  //res.send('name is '+req.body.name+ 'emai is '+ req.body.email);
};

exports.test = function (req, res) {
  //res.send('name is '+req.body.name+ 'emai is '+ req.body.email);
  
  res.send('Greetings from the mail controller!');
};