function AllowCrossDomain() {
	this.access = function(req, res, next) {
		var  whiteList = [
			'http://localhost:4200/',
		];

		var origin = req.headers.origin;
		if	(whiteList.indexOf(origin) >= -1) {
			res.setHeader('Access-Control-Allow-Origin', origin);
		}

		// res.header('Access-Control-Allow-Origin','');
		res.header('Access-Control-Allow-Headers','Content-Type');
		res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
		next();
	}
}

module.exports =  new AllowCrossDomain();