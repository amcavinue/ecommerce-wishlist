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
    },
    wishlist: {
      type: [
        {
          title: {
            type: String,
            required: false
          },
          img: {
            type: String,
            required: false
          },
          price: {
            type: String,
            required: false
          },
          description: {
            type: String,
            required: false
          },
          asin: {
            type: String,
            required: false
          },
          link: {
            type: String,
            required: false
          }
        }
      ],
      required: false,
      default: []
    }
});

UserSchema.methods.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isValid) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, isValid);
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;