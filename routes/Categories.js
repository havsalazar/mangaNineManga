//http://es.ninemanga.com/category/

const curl = require("curl");
const htmlToJson = require('html-to-json') 

module.exports = (app) => {

    app.post('/getCategories', (req, res) => { 
        const url='http://es.ninemanga.com/category/'
        curl.get( url, null, (err, resp, body) => {
            if (resp.statusCode == 200) {
                var promise = htmlToJson.batch(body, {
                    sections: htmlToJson.createParser(['.genreidex', {
                        'categories': [`a` , ($a) => {
                            return {url: $a.attr("href") ,name:$a.text()}
                            //return $a.text();
                         }],
                    }]),
                });
                promise.done((result) => { 
                    result.sections[0].categories.push({url:"http://es.ninemanga.com/category/Harem.html", name:"Harem"})
                    res.send(result.sections[0].categories)
                })
            }
            else {
                res.status(400).send("error loading")
                console.log("error while fetching url");
            }
        }); 
    });
    app.post('/getCategoryMangas', (req, res) => {  
        curl.get( req.body.urlgenere.replace('.html','_'+req.body.page+'.html') , null, (err, resp, body) => {
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