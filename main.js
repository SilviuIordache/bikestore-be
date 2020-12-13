/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv/config');
const app = require('./src/server.js');

let dbURL = process.env.DB;

if (process.env.DB_TYPE === 'local') {
  dbURL = process.env.DB_LOCAL;
}

(async() => {
  try {
    await mongoose
      .connect(dbURL, {
        useNewdbURLParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      })
      .then(() => console.log(`DB server connection successful: ${dbURL}`));
  } catch (err) {
    console.log(err);
  }
})();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Running in '${process.env.NODE_ENV}' mode`)
  console.log(`API Server started: https://localhost:${port}.`);
});