const mysql = require('mysql');

let pool = mysql.createPool({
	host:'127.0.0.1',
	post:'3306',
	user:'root',
	password:'',
	database:'ninthart',
	connectionLimit:15,
})

module.exports = pool;