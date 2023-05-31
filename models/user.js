const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          // Regular expression for valid phone number format (XXX-XXX-XXXX)
          return /^\d{3}-\d{3}-\d{4}$/.test(value);
        },
        message: 'Please provide a valid phone number in the format XXX-XXX-XXXX.'
    }},
    role: {
      type: String,
      required: true,  
    },
    active: {
      type: Boolean,
      default: true,
    },
    created_at: {
      type: Date,
      default: () => Date.now(),
      immutable: true
    },
    updated_at: {
      type: Date,
      default: () => Date.now(),
    },
  })    
    
const User = mongoose.model('User', userSchema);

module.exports = User;