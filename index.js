const express = require('express');
var app = express();
const cors = require("cors")
const bodyParser = require('body-parser');
const htmlToJson = require('html-to-json')
const curl = require("curl");
app.use(cors())
app.use(bodyParser.json());
app.get('/', (req, res) => { 
    res.send('Hello World!');
});
require('./routes/findManga')(app)
require('./routes/mangaDetail')(app)
require('./routes/capList')(app)

app.listen(3001, () => {
    console.log('running');
});
