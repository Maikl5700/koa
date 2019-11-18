const mysql = require("mysql2/promise");
const db_config = require('../config/db.config');

Object.assign(db_config,{ database: 'baza' })

let conn = mysql.createConnection(db_config)


module.exports = conn