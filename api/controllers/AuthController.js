/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var md5 = require('MD5');
var crypto = require('crypto');

module.exports = {
	login: function(req,res){
		var token = req.param('token');
		var proof = crypto.createHmac('SHA256', '04136abb6b35ae4a8aa394cf0f4250ba').update(token).digest('hex');
		var fbId = req.param('facebookId');
		User.findOne({facebookId: fbId}).then(function(user){
			if(user){
				return res.ok(user);
			}
			Facebook.login(token, proof, function(err, data){
				if(err != null){
					return res.error(err);
				}
				User.create({
					name: data.name,
	                email: data.email,
	                url: data.picture.data.url,
	                facebookId: data.id
				}).then(function(data){
					return res.ok(data);
				}).catch(function(err){
					return res.error(err);
				})
			})
		}).catch(function(err){
			return res.error(err);
		})
	},
	logout: function(req,res){
		req.session.user = null;
    	req.session.flash = 'You have logged out';
    	return res.ok("Logged out");
	}
};

