const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'dbtour',
    port: 3306,
    multipleStatements: true
})

module.exports = db