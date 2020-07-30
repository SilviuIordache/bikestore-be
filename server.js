/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv/config');
const app = require('./app');

let DB = process.env.DB;

if (process.env.DB_TYPE === 'local') {
  DB = process.env.DB_LOCAL;
}

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log(`DB connection successful: ${DB}`));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started. Listening on port: ${port}.`);
});