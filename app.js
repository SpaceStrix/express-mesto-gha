require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const router = require('./routes');
const { handlerErr } = require('./middlewares/handlerErr');
const { validationSignin, validationSignup } = require('./middlewares/validation');
const { createUser, login } = require('./controllers/users');

const { PORT, DB_CONNECT } = process.env;
const app = express();
mongoose.set('strictQuery', false); // убираем варнинг mongoose
mongoose.connect(DB_CONNECT);

app.use(express.json());
app.post('/signin', validationSignin, login);
app.post('/signup', validationSignup, createUser);
app.use(router);

app.use(errors());
app.use(handlerErr);

app.listen(PORT, () => {
  console.log(`Приложении запущено на ${PORT} порту`);
});
