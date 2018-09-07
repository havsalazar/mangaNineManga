const htmlToJson = require('html-to-json')
const curl = require("curl");
module.exports = (app) => {
    findData=(data)=>{
        let string=data.text()
        try {
            return string.match(/\d+/g).map(Number)
        } catch (error) {
            return data.text()
        }
    };
    app.post('/getlistCaps', (req, res) => {  
        curl.get(req.body.uri, null, (err, resp, body) => {
            if (resp.statusCode == 200) {
                var promise = htmlToJson.parse(body, {
                    'caps': ['a.chapter_list_a', ($a) => { 
                        return {title:$a.text(),numero:findData($a),url:$a.attr('href')} 
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