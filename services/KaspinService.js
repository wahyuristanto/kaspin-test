const request = require("request");
require('dotenv/config')


exports.getAddress = (payloads) => new Promise((resolve, reject) => {
    const {
        id
    } = payloads

    console.log('_url', `https://kasirpintar.co.id/allAddress.txt`)
    var options = {
        'method': 'GET',
        'url': `https://kasirpintar.co.id/allAddress.txt`,
        'headers': {
            'Content-Type': 'application/json',
            // 'User-Agent': 'PostmanRuntime/7.29.0'
        },
        'json': true
    }
    request(options, function (error, response) {
        if (error) 
            throw new Error(error);

        console.log('__getAddress ', JSON.stringify(response.body))
        resolve(response.body)
    })
})