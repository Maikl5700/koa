const mysql = require("mysql2/promise");
const { readFile, populateDB } = require('./utils');
const db_config = require('../config/db.config');

(async () => {
    try {

        // CONNECT
        const connection = await mysql.createConnection(db_config)
        console.log('db connected')
        
        // CREATE DB AND TABLES
        connection.query(await readFile('fill_db/sql/schema.sql', false));
        console.log('database and tables created')
        
        // POPULATE THE DB
        await populateDB.books(await readFile('fill_db/data/books_data.json'), connection)      
        console.log('books filled')
        await populateDB.authors(await readFile('fill_db/data/authors_data.json'), connection)      
        console.log('authors filled')
        await populateDB.books_authors(await readFile('fill_db/data/books_authors.json'), connection)     
        console.log('books_authors filled')
        console.log('done.')
        process.exit()

    } catch (error) {
        throw error
    }
})()







