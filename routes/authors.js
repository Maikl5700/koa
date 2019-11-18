const authorsRouter = require('koa-router')();

// CONTROLLERS
const controllers = require('../controllers')




// read
authorsRouter.get('/', controllers.read('authors'))

// create
authorsRouter.post('/', controllers.create('authors'))

// update
authorsRouter.put('/', controllers.update('authors'))




module.exports = authorsRouter