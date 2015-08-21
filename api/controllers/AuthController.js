/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var md5 = require('MD5');
var crypto = require('crypto');

module.exports = {
	getCurrentUser: function(req,res){
		if(sails.session.user){
			return res.ok(sails.session.user);
		} else {
			return res.error("No authentication provided");
		}
	},

	login: function(req,res){
		var token = req.param('token');
		var proof = crypto.createHmac('SHA256', '04136abb6b35ae4a8aa394cf0f4250ba').update(token).digest('hex');
		var fbId = req.param('facebookId');

		User.findOne({facebookId: fbId}).populateAll().then(function(user){
			if(user){
				User.getStat(user.id).then(function(stats){
					user.stats = stats;
					sails.session.user = user;
					return res.ok(user);
				})
			} else {
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
			}
		}).catch(function(err){
			return res.error(err);
		})
	},
	logout: function(req,res){
		sails.session.user = null;
    	return res.ok("Logged out");
	}
};

