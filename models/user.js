const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.methods.validatePassword = function(password, callback) {
    console.log(password, 17);
    bcrypt.compare(password, this.password, function(err, isValid) {
        console.log(err, isValid, 19);
        if (err) {
            callback(err);
            return;
        }
        callback(null, isValid);
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;