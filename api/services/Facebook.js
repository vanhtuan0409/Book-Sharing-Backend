module.exports = {
	login: function(token, proof, cb){
		var http = require('https');
		http.get(
			"https://graph.facebook.com/me?fields=id,name,picture.type(large),email,friends&access_token="+token+"&appsecret_proof="+proof,
			function(response){
				var body = '';
				response.on('data', function(chunk) {
					body += chunk;
				});
				response.on('end', function() {
					var json = JSON.parse(body);
					if(json.hasOwnProperty('error')){
						return cb(json.error.message, null);
					} else {
						return cb(null, JSON.parse(body));
					}
				});
				response.on('error', function(err){
					return cb(err.messsage, null);
				});
			}
		);
	}
}