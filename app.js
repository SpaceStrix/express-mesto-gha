const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.set('strictQuery', false); // убираем варнинг mongoose
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = { _id: '63a44d12996398eec59073d1' };
  next();
});

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
