let request = require('request');

class Controller {
    // getting a image
    async fetchImage(dataSet) {
        return new Promise((resolve, reject) => {
            // fetch image url
            let request_url = {url:`${process.env.SERVICE_API}/${dataSet.greeting}?width=${dataSet.width}&amp;height=${dataSet.height}&amp;c=${dataSet.color}&amp;s=${dataSet.size}`, encoding:"binary"};
          
            // fetch image from get request
            request.get(request_url, (err, res, body) => {
              if(err) {
                reject(err.message);
              }
              console.log('Received response with status:' + res.statusCode);
              resolve(body);
            })
        });
    }
}

module.exports = Controller;
