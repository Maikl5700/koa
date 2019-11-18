const authors_booksRouter = require('koa-router')();

// CONTROLLERS
const controllers = require('../controllers')




// read
authors_booksRouter.get('/', controllers.read('authors_books'))

// create
authors_booksRouter.post('/', controllers.create('authors_books'))

// update
authors_booksRouter.put('/', controllers.update('authors_books'))




module.exports = authors_booksRouter