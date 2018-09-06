const request = require('request');
const htmlToJson = require('html-to-json')
const curl = require("curl");
module.exports = (app) => {
    app.post('/getlistCaps', (req, res) => {  
        curl.get(req.body.uri, null, (err, resp, body) => {
            if (resp.statusCode == 200) {
                var promise = htmlToJson.parse(body, {
                    'caps': ['a.chapter_list_a', ($a) => {
                        let string=$a.text()
                        return {title:$a.text(),numero:string.match(/\d+/g).map(Number),url:$a.attr('href')}
                    }], 
                }, (err, result) => {

                });
                promise.done((result) => {
                    res.send(result.caps)
                })
            }
            else {
                console.log("error while fetching url");
            }
        });
     });

}