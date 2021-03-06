const booksRouter = require('koa-router')();

// CONTROLLERS
const controllers = require('../controllers')




// read
booksRouter.get('/', controllers.read('books'))

// create
booksRouter.post('/', controllers.create('books'))

// update
booksRouter.put('/', controllers.update('books'))




module.exports = booksRouter
