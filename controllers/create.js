const QueryBuilder = require('../js/query_builder')
const createConn = require('../js/conn')

// const data = [{
//     name: 'Evangelion'
// },
// {
//     name: 'Evangelion2'
// }]

module.exports = tableName => {
    return async (ctx, next) => {
        const conn = await createConn
        const query = new QueryBuilder(tableName).insert(ctx.request.body).build()

        
        let [rows] = await conn.query(query);
        ctx.body = rows // data
    }
} 