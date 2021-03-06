const htmlToJson = require('html-to-json')
const curl = require("curl");
module.exports = (app) => {
    app.post('/getMangas', (req, res) => {  
        curl.get("http://es.ninemanga.com/search/?wd="+ req.body.busqueda.replace(' ','+')+"&page="+req.body.page , null, (err, resp, body) => {
            if (resp.statusCode == 200) {
                var promise = htmlToJson.batch(body, {
                    sections: htmlToJson.createParser(['.direlist li', {
                        'text': function ($office) {
                            return $office.find('.bookname').text();
                        },
                        "url": function ($office) {
                            return $office.find('.bookname').attr('href')
                        },
                        'img': function ($office) {
                            return $office.find('img').attr("src");
                        },
                        "subtitle":""
                    }]),
                });
                promise.done((result) => {
                    res.send(result.sections)
                })
            }
            else {
                res.status(400).send("error loading")
                console.log("error while fetching url");
            }
        });
     }); 
    app.post('/getNewMangas',(req,res)=>{
        curl.get("http://es.ninemanga.com/list/New-Book/" , null, (err, resp, body) => {
            if (resp.statusCode == 200) {
                var promise = htmlToJson.batch(body, {
                    sections: htmlToJson.createParser(['.direlist li', {
                        'text': function ($office) {
                            return $office.find('.bookname').text();
                        },
                        "url": function ($office) {
                            return $office.find('.bookname').attr('href')
                        },
                        'img': function ($office) {
                            return $office.find('img').attr("src");
                        },
                        "subtitle":""
                    }]),
                });
                promise.done((result) => {
                    res.send(result.sections)
                })
            }
            else {
                res.status(400).send("error loading")
                console.log("error while fetching url");
            }
        });
    });
    app.post('/getPopularMangas',(req,res)=>{
        curl.get("http://es.ninemanga.com/list/Hot-Book/" , null, (err, resp, body) => {
            if (resp.statusCode == 200) {
                var promise = htmlToJson.batch(body, {
                    sections: htmlToJson.createParser(['.direlist li', {
                        'text': function ($office) {
                            return $office.find('.bookname').text();
                        },
                        "url": function ($office) {
                            return $office.find('.bookname').attr('href')
                        },
                        'img': function ($office) {
                            return $office.find('img').attr("src");
                        },
                        "subtitle":""
                    }]),
                });
                promise.done((result) => {
                    res.send(result.sections)
                })
            }
            else {
                res.status(400).send("error loading")
                console.log("error while fetching url");
            }
        });
    });


}