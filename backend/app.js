const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Item = require('./models/item');
const app = express();

mongoose.connect("mongodb://localhost:27017/KwetuApp")
.then(() => {
    console.log('Connected to the database');
})
.catch(() => {
    console.log('Connection failed!');
});

app.use(bodyParser.json());

app.use((re, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader(
        'Access-Control-Allow-Methods', 
        "GET, POST, PATCH, DELETE,PUT, OPTIONS");
    next();
});


app.post('/api/items', (req, res, next) => {
    const item = new Item({
        title: req.body.title,
        content: req.body.content
    });
    item.save();
    console.log(item);
    res.status(201).json({
        message: "item added successfully"
    });
});
app.get("/api/items", (req, res, next) => {
    Item.find()
    .then((documents) => {
        res.status(200).json({
            message: "item fetched successfully",
            items : documents
        });
    })
    
});

app.delete("/api/items/:id", (req, res, next) => {
    Item.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post deleted!"});
    })
    
});

app.use((req, res, next) =>{
    res.send("this is the express app");
    
});

module.exports = app;