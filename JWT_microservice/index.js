const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var bodyParser = require('body-parser')


dotenv.config();

//CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECT,{ useNewUrlParser: true , useUnifiedTopology: true},
    (err, db) => {
		if(err) { 
			throw err
		} else {
			console.log('Successfully connected to MongoDB')
		}
	
});


//MIDDLEWARE
app.use(express.json());
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// app.use(bodyParser.json());


//CONFIG ROUTES
const authRoute = require('./routes/auth');
app.use('/api/user', authRoute);


app.listen(8000, () => console.log('Server is up'));