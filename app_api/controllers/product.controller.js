// const Product = require('../models/product.model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    
});
// Export the model
const Product = mongoose.model('Product', ProductSchema);

let RoomSchema = new Schema({
    roompic: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    location: {type: String, required: true},
});

const Room = mongoose.model('Room', RoomSchema);

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.product_create = function (req, res,next) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );
    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

exports.room_create = function (req, res,next) {
    let room = new Room(
        {
            roompic: req.body.roompic,
            price: req.body.price,
            location: req.body.location
        }
    );

    room.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Room info saved')
    })
};

exports.room_get = function (req, res, next) {
    Room.find(function (err, room) {
        if (err) return next(err);
        res.send(room);
    })
};

exports.product_details = function (req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

