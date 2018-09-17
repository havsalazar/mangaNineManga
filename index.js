const express = require('express');
var app = express();
const cors = require("cors")
const bodyParser = require('body-parser');
const htmlToJson = require('html-to-json')
const curl = require("curl");
app.use(cors())

// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use( (req, res, next)=> {
    console.log(req.body)
    console.log(req.method)
    next();
  }); 
  
app.get('/', (req, res) => { 
    res.send('Hello World!');
});
require('./routes/findManga')(app)
require('./routes/mangaDetail')(app)
require('./routes/capList')(app)
require('./routes/mangaImages')(app)

app.listen(3012, () => {
    console.log('running');
});
