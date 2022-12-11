const express = require('express');
const mongoose = require('mongoose');
const { router } = require('./routes/index');

const { NOT_FOUND } = require('./constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.set('strictQuery', false); // убираем варнинг mongoose
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = { _id: '6390f87b0405512d5565fcf6' };
  next();
});
app.use(express.json());

app.use(router);

app.use('*', (req, res) => res.status(NOT_FOUND)
  .send({ message: '404 - Страница не найдена ' }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
