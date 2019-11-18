const QueryBuilder = require('../js/query_builder')
const createConn = require('../js/conn')



// const data = {
//     update: { 
//         name: '123',
//         ebalo: 'na null'
//     },
//     where: { name: '123' }
// }


module.exports = tableName => {
    return async (ctx, next) => {
        const conn = await createConn
        const query = new QueryBuilder(tableName).update(ctx.request.body).build()
        
        
        let res = await conn.query(query);
        ctx.body = res // data
    }
} 