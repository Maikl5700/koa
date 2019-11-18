const redis = require("redis")
const client = redis.createClient()

module.exports = new Promise((resolve, reject) => {
    client.on('ready', function(a, b) {
        resolve(client)
    })

    client.on('error', function(err){
        reject(err)
    })
})