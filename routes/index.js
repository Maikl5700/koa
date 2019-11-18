const rootRouter = require('koa-router')({ prefix: '/api' });
const books = require('./books')
const authors = require('./authors')
const authors_books = require('./authors_books')


rootRouter.use('/books', books.routes())
rootRouter.use('/authors', authors.routes())
rootRouter.use('/authors_books', authors_books.routes())



module.exports = rootRouter