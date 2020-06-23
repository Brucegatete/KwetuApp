const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.send("this is an express app");
});


module.exports = app;