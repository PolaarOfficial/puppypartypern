require("dotenv").config({ path: __dirname + "/.env" });
var express = require('express');
var pool = require(__dirname + "/../config/db.config.js");
var app = express();
var PORT = process.env.PORT || 9000;
app.get("/", function (req, res) {
    res.send("Hello World!");
});
var getNotifications = function (req, res) {
    pool.query('SELECT * FROM notifications', function (error, notifications) {
        if (error) {
            throw error;
        }
        res.status(200).json(notifications.rows);
    });
};
app.get('/notifications', getNotifications);
app.listen(PORT, function () {
    console.log("Server listening on the port  ".concat(PORT));
});
