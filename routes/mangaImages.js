const htmlToJson = require('html-to-json')
const curl = require("curl");
const request = require('request')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
module.exports = (app) => {
    // getAllImages = (images, res, indice, imagesResponse) => {
    //     //console.log("http://es.ninemanga.com" + images[indice].url)
    //     JSDOM.fromURL("http://es.ninemanga.com" + images[indice].url, {}).then(dom => {
    //         let img = {
    //             src: dom.window.document.getElementsByClassName('manga_pic')[0].src,
    //             id: indice
    //         }
    //         imagesResponse.push(img)
    //         indice++;
    //         if (indice < images.length) {
    //             getAllImages(images, res, indice, imagesResponse)
    //         }else{
    //             res.send(imagesResponse)
    //         } 
    //     });
    // }
    app.post('/getImagesRoute', (req, res) => {

        JSDOM.fromURL("http://es.ninemanga.com" + req.body.url, {}).then(dom => {
            let img = {
                src: dom.window.document.getElementsByClassName('manga_pic')[0].src, 
                id:req.body.id,
                page:req.body.page
            } 
            res.send(img) 
        });

    })

    app.post('/getImages', (req, res) => {

        curl.get(req.body.uri, null, (err, resp, body) => {
            if (resp.statusCode == 200) {
                var promise = htmlToJson.parse(body, {
                    'data': ['body > div:nth-child(6) select#page  option', ($office) => {
                        return { url: $office.attr("value"), page: $office.text() };
                    }],
                }, (err, result) => {

                });
                promise.done((result) => { 
                    res.send(result.data)  
                }); 
            }
            else {
                console.log("error while fetching url");
            }
        });
    });
}