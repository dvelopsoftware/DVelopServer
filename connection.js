var mysql = require('mysql');

function Connection() {
	this.pool = null;

	this.start = function() {
		this.pool = mysql.createPool({
			conectionLimit: 10,
			host: 'DvelopSite.db.5293355.hostedresource.com',
			user: 'DvelopSite',
			password: 'DVelop123#',
			database: 'DvelopSite'
		})
	}
	this.get = function(callback) {
		this.pool.getConnection(function(error, connection) {
			callback(error, connection)
		})
	}
}

module.exports = new Connection();