const QueryBuilder = require('../js/query_builder')
const createConn = require('../js/conn')



module.exports = tableName => {
    return async (ctx, next) => {
        const conn = await createConn

        console.log(ctx.request.body)
        const queryObj = new QueryBuilder(tableName)

        if (ctx.request.body.where) queryObj.where(ctx.request.body.where)

        const query = queryObj.update(ctx.request.body.update).build()
        
        
        let res = await conn.query(query);
        ctx.body = res // data
    }
} 