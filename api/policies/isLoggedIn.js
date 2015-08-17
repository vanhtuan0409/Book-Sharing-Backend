module.exports = function isLoggedIn (req, res, next) {
	if(!sails.session || !sails.session.user){
		return res.error("Login required");
	}
	next();
};