const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('./models/user');
require('./models/post');

const app = express();

const PORT = process.env.PORT || 5000;

const { MONGOURI } = require('./config/keys');


mongoose.connect(MONGOURI, {
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

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}
app.listen(PORT, () => {
  console.log('listening on port ', PORT);
});
