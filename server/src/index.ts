require("dotenv").config({ path: __dirname + "/.env" });
const express = require('express');
const pool = require(__dirname + "/../config/db.config.js");

const app = express();

const PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
    res.send("Hello World!");
  });

const getNotifications =  (req, res) => {
  pool.query('SELECT * FROM notifications', (error, notifications) => {
    if (error) {
      throw error
    }
    res.status(200).json(notifications.rows)
  })
}

app.get('/notifications', getNotifications)

app.listen(PORT, () => {
  console.log(`Server listening on the port  ${PORT}`);
})
