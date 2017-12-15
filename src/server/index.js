var express = require('express');
var cors = require('cors')

var config = require('../config/server');

const app = new express();
app.use(cors());

app.get('/', function(req, res) {
	res.json({ message: 'Welcome to QIS API'});
});


var mysql = require('./db/mysql');



// https://stackoverflow.com/questions/12526194/mysql-inner-join-select-only-one-row-from-second-table
app.get('/api/securitiesLatestUpdate', function(req, res) {

	mysql(function(err, connection) {
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
				console.log('[securitiesLatestUpdate] Error with MySQL query : ', err);

			res.end(JSON.stringify(results));

			connection.release();
		});
	});

})


app.get('/api/latestUpdateDate', function(req, res) {
	mysql.getConnection(function(err, connection) {
		connection.query('SELECT MAX(date) latestDate FROM stocksYahoo', function(err, results, fields) {
			if (err)
				throw err;
			res.end(JSON.stringify(results[0]))

			connection.release();
		})		
	})

})


app.listen(config.API_SERVER_PORT, (error) => {
	if (error) {
		console.error(error)
	} else {
		console.log('\nApp server running at: http://' + config.API_SERVER_HOST + ':' + config.API_SERVER_PORT);
	}
})