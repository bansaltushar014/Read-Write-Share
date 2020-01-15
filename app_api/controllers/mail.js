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

  var mailOptions = {
    from: 'tuskibansal@gmail.com', // sender address
    to: 'bansaltushar014@gmail.com', // list of receivers
    subject: 'Hotel-Booking mail from', // Subject line
    html: 'New mail from <b> </b> and message is <br>'  // plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
    }
    else
      console.log(info);
  });
  res.send('sent');
};

exports.test = function (req, res) {
  res.send('Yes, Mail is working perfectly!');
};