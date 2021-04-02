const express = require('express');
const path = require('path');
const app = express();
const devProfileRouters = require('./routes/devProfileRouters');
const developers= require('./server/developers');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const db = require('./server/db');
require('dotenv').config();
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}).then(()=>{
  console.log("Connected to DB");
});

app.use(cors());
app.options('*', cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//app.use('/api/developers', devProfileRouters);

app.use('/api/developers', developers);


/* app.use(express.static(path.join(__dirname, 'build'))); 

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});  */

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../', 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
  });
}

module.exports = app;