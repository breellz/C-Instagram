const express = require('express');
const mongoose = require('mongoose');
require('./models/user');
require('./models/post');

const app = express();

const PORT = 5000;

const { LOCALDB, MONGOURI } = require('./keys');

const DB = LOCALDB || MONGOURI;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('connected to DB');
});
mongoose.connection.on('error', (err) => {
  console.log(err);
});

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

app.listen(PORT, () => {
  console.log('listening on port ', PORT);
});
