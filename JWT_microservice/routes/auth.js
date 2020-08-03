const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {

    var newuser = new User();

    newuser.name = req.body.name;
    newuser.email = req.body.email;
    newuser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);


    User.findOne({ email: req.body.email }, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (!result) {
            // console.log(newuser);
            newuser.save(function (err, result) {
                if (err) {
                    console.log(err);
                }
                console.log(result);
                res.send(result);
            })
        } else {
            console.log("Already exist");
            res.send("Already exist");
        }
    });
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (!result) {
            res.send("Not a user!");
        } else {
            if (bcrypt.compareSync(req.body.password, result.password)) {
                // res.send("logged in!");
                console.log(result._id);
                const token = jwt.sign({ _id: result._id }, process.env.TOKEN_SECRET);
                res.header('auth-token', token).send(token);
            } else {
                res.send("Wrong Password!");
            }
        }
    })

});

router.get('/trial', function(req,res){
    res.send("success trial!");
});

module.exports = router;