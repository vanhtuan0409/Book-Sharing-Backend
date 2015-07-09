module.exports = function canUpdateUser (req, res, next) {
	if(!req.session || !req.session.authenticated || !req.session.id){
		return res.forbidden();
	}

	var targetId = req.param('record');
	var userId = req.session.currentUser.id;

	if(targetId != userId){
		return res.forbidden();
	}
	next();
};