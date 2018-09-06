const request = require('request');
const curl = require("curl");
const htmlToJson = require('html-to-json') 

module.exports = (app) => {

    app.post('/getDetail', (req, res) => { 
        const url=req.body.uri
        curl.get( url, null, (err, resp, body) => {
            if (resp.statusCode == 200) {
                var promise = htmlToJson.batch(body, {
                    sections: htmlToJson.createParser(['.bookintro', {
                        'tags': [`body > div.mainbox > div > div.bookintro > ul > li:nth-child(3) a` , ($a) => {
                            return $a.text();
                         }],
                        // ,body > div.mainbox > div > div.bookintro > ul > li:nth-child(3)
                        "titulo": ($office) => {
                            return $office.find('.message li span').text();
                        },
                        "type": ($office) => {
                            return $office.find('a.portada span').text();
                        },
                        "image": ($office) => {
                            return $office.find('img').attr("src");
                        },
                        "autor": ($office) => {
                            return $office.find('body > div.mainbox > div > div.bookintro > ul > li:nth-child(4) > a').text();
                        },
                        "fecha": ($office) => {
                            return $office.find('body > div.mainbox > div > div.bookintro > ul > li:nth-child(5) > a').text();
                        },
                        "estado": ($office) => {
                            return $office.find('body > div.mainbox > div > div.bookintro > ul > li:nth-child(6) > a').text();
                        },
                        "sinopsis": ($office) => {
                            return $office.find('body > div.mainbox > div > div.bookintro > p').text();
                        },
                        "rank": ($office) => {
                            return ""
                        },
                        "alterno": ($office) => {
                            return $office.find('body > div.mainbox > div > div.bookintro > ul > li:nth-child(2)').text();
                        },
                    }]),
                });
                promise.done((result) => {
                    console.log(result.sections)
                    res.send(result.sections[0])
                })
            }
            else {
                console.log("error while fetching url");
            }
        });


    });


}