/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	borrowBook: function(reg, res){
		if(!req.param("requestToUser") || !req.param("requestBook")){
			return res.badRequest();
		}

		return res.send("yolo");
	}
};

