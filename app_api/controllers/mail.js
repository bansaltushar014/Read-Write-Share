exports.send_mail = function (req, res) {
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tuskibansal@gmail.com',
      pass: 'tushar@gmail',
    }
  });

  name = req.body.name;
  fromemail = req.body.email;
  text = req.body.text;
  const mailOptions = {
    from: 'tuskibansal@gmail.com', // sender address
    to: 'bansaltushar014@gmail.com', // list of receivers
    subject: 'Hotel-Booking mail from' + fromemail, // Subject line
    html: 'New mail from <b>' + name + '</b> and message is <br>' + text // plain text body
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
  res.send('Greetings from the Test controller!');
};