module.exports = function isLoggedIn (req, res, next) {
	if(!req.session || !req.session.authenticated || !req.session.currentUser){
		req.session.redirect_link = req.url;
		return res.redirect('/login');
	}
	next();
};