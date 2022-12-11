const mongoose = require('mongoose');
const validator = require('validator');

// const urlRegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*
// @)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя не может быть пустым'],
    minlength: [2, 'Имя слишком короткое'],
    maxlength: [30, 'Имя слишком длинное'],
  },
  about: {
    type: String,
    required: [true, 'Описание не может быть пустым'],
    minlength: [2, 'Описание слишком короткое'],
    maxlength: [30, 'Описание слишком длинное'],
  },
  avatar: {
    type: String,
    required: [true, 'Ссылка обязательна'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Поле "avatar" должно быть валидным url-адресом.',
    },

  },
});

module.exports = mongoose.model('user', usersSchema);
