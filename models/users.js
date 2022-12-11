const mongoose = require('mongoose');
const validator = require('validator');

// const urlRegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*
// @)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Поле "avatar" должно быть валидным url-адресом.',
    },

  },
});

module.exports = mongoose.model('user', usersSchema);
