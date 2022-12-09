const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.set('strictQuery', false); // убираем варнинг mongoose

app.use((req, res, next) => {
  req.user = { _id: '6390f87b0405512d5565fcf6' };
  next();
});
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Successfully');
  }).catch(() => {
    console.log('Not Successfully');
  });

// async function connect() {
//   await mongoose.connect('mongodb://localhost:27017/mestodb')
//     .then(() => {
//       console.log('Successfully');
//     }).catch(() => {
//       console.log('Not Successfully');
//     });
//   await app.listen(PORT);
//   console.log(`App listening on port ${PORT}`);
// }
// connect();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
