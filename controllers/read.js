const QueryBuilder = require('../js/query_builder')
const createConn = require('../js/conn')
const qs = require('qs')
const redisConn = require('../js/redis')



const TTL = 300 // TIME TO LIVE


module.exports = tableName => {
    return async (ctx, next) => {
        const conn = await createConn
        let query = ""
      
        
        if (ctx.request.querystring && ctx.request.querystring.length) {
            const queryObject = new QueryBuilder(tableName)

            const reqBody = qs.parse(ctx.request.querystring)

            if (reqBody.attrs) queryObject.select(reqBody.attrs)
            if (reqBody.where) queryObject.where(reqBody.where)
            if (reqBody.order) queryObject.order(reqBody.order, reqBody.reverseOrder)
            if (reqBody.limit) queryObject.limitOffset(reqBody.limit, reqBody.offset)

            query = queryObject.build()
            console.log(query)
        } else {
            query = new QueryBuilder(tableName).build()
        }


        // CACHING
        ctx.body = await caching(query, conn)
    }
} 


// CACHING PROMISED FUNC
function caching(query, conn) {
    return new Promise(async (resolve, reject) => {
        const redis = await redisConn
        redis.get(query, async (err, res) => {
            if (err) {
                reject(err);
            }

            if (res) {
                console.log('get')
                redis.expire(query, TTL) 
                resolve(JSON.parse(res))

            } else {

                console.log('set')
                let [rows] = await conn.query(query);
                redis.setex(query, TTL, JSON.stringify(rows), function (err) {
                    if (err) throw err;
                });
                resolve(rows)

            }
        })
    })
}