// Set up mongoose connection

const mongoose = require('mongoose');

let dev_db_url = 'mongodb://tusharbansal:tushar.12@ds243717.mlab.com:43717/hotel-booking';
let mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));