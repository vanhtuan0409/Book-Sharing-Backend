/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var md5 = require('MD5');
module.exports = {
	login: function(req,res){
		var email = req.param("email");
		var password = req.param("password");
		User.findOne({email: email}).then(function(user){
			var hash = md5(password);
			if(hash == user.password){
				req.session.currentUser = user;
				req.session.authenticated = true;

				if(req.session.redirect_link){
					return res.redirect(req.session.redirect_link);
				} else {
					return res.redirect('/');
				}
			} else {
				return res.redirect('/login?error=Login fail');
			}
		}).catch(function(err){
			return res.redirect('/login?error=Login fail');
		});
	},
	logout: function(req,res){
		req.session.destroy();
		return res.redirect('/login');
	},
	loginView: function(req,res){
		return res.view('login')
	}
};

