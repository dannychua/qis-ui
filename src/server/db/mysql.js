var config = require('../../config/server');

var mysql = require('mysql')
var pool = mysql.createPool({
	host: config.MYSQL.HOST,
	user: config.MYSQL.USER,
	password: config.MYSQL.PASSWORD,
	database: config.MYSQL.DB,
});

var getConnection = function(callback) {
	pool.getConnection(function(err, connection) {
		callback(err, connection);
	});
}

module.exports.getConnection = getConnection;

// connection.connect(function(err) {
// 	if (err) 
// 		throw err;
// 	else
// 		console.log('Connected to MySQL server')
// });