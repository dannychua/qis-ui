var express = require('express');
var cors = require('cors')

var config = require('../../config/server');

const app = new express();
app.use(cors());

app.get('/', function(req, res) {
	res.json({ message: 'Welcome to QIS API'});
});


var mysql = require('mysql')
var connection = mysql.createConnection({
	host: config.MYSQL.HOST,
	user: config.MYSQL.USER,
	password: config.MYSQL.PASSWORD,
	database: config.MYSQL.DB,
});
connection.connect(function(err) {
	if (err) 
		throw err;
	else
		console.log('Connected to MySQL server')
});


// https://stackoverflow.com/questions/12526194/mysql-inner-join-select-only-one-row-from-second-table
app.get('/api/securitiesLatestUpdate', function(req, res) {
	connection.query(`SELECT a.symbol,  c.date, c.open, c.high, c.low, c.close, c.adjClose, c.volume
		FROM securities a
		INNER JOIN stocksYahoo c
			ON a.symbol = c.symbol
		INNER JOIN (
			SELECT symbol, MAX(date) maxDate
			FROM stocksYahoo
			GROUP BY symbol
		) b 
			ON c.symbol = b.symbol AND
				c.date = b.maxDate

		`, function(err, results, fields) {
		if (err)
			throw err;

		res.end(JSON.stringify(results));
	})
})


app.get('/api/latestUpdateDate', function(req, res) {
	connection.query('SELECT MAX(date) latestDate FROM stocksYahoo', function(err, results, fields) {
		if (err)
			throw err;
		res.end(JSON.stringify(results[0]))
	})
})


app.listen(config.APP_SERVER_PORT, (error) => {
	if (error) {
		console.error(error)
	} else {
		console.log('\nApp server running at: http://' + config.APP_SERVER_HOST + ':' + config.APP_SERVER_PORT);
	}
})