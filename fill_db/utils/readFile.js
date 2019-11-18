const fs = require('fs');

module.exports = (filePath, json = true) => {
    return new Promise((resolve, reject) => {

        let output = ''

        const readStream = fs.createReadStream(filePath)

        readStream.on('error', function(err){ reject(err) })

        readStream.on('data', function(chunk) {
          output += chunk;
        });

        readStream.on('end', function () {
            if(json) resolve(JSON.parse(output))
            resolve(output)
        })
    });
}