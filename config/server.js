var ip = require('ip')

module.exports.APP_SERVER_HOST = ip.address();
module.exports.APP_SERVER_PORT = 4000;

module.exports.MYSQL = {
	HOST: '104.196.151.14',
	USER: 'root',
	PASSWORD: 'INSERTPASSWORD',
	DB: 'qis',
};