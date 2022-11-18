const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  countryCode: {
  	type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    minlength: 9,
    maxlength: 10
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 6
  }
})

module.exports = mongoose.model('User', userSchema)