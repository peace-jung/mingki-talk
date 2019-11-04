const express = require('express');
const PORT = process.env.PORT;
const app = express();

// middleware
app.use(express.json());

// database
require('./postgre');

// router
const routes = require('./routes');
app.use('/', routes);

// server on
app.listen(PORT || 3000, err => {
  if (err) throw err;
  console.log('server on');
});

const fs = require('fs');
const path = require('path');

function rimraf(dir_path) {
  console.log(1);
  if (fs.existsSync(dir_path)) {
    console.log(2);
    fs.readdirSync(dir_path).forEach(function(entry) {
      console.log(3);
      var entry_path = path.join(dir_path, entry);
      if (fs.lstatSync(entry_path).isDirectory()) {
        rimraf(entry_path);
      } else {
        fs.unlinkSync(entry_path);
      }
    });
    fs.rmdirSync(dir_path);
  }
  console.log(4);
}

rimraf(path.join(__dirname, '/uploads/'));
