/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	borrowBook: function(req, res){
		if(!req.param("requestToUser") || !req.param("requestBook")){
			return res.badRequest();
		}
		var fromId = req.param("id");
		var toId = req.param("requestToUser");
		var bookId = req.param("requestBook");
		var startDate = req.param("startDate");
		var returnDate = req.param("returnDate");
		var location = req.param("location");
		var message = req.param("message");

		Borrow.borrow(fromId, toId, bookId, startDate, returnDate, location, message).then(function(msg){
			return res.ok(msg);
		}).catch(function(err){
			return res.error(err);
		})
	},
	searchBookByLocation: function(req, res){
		var userId = req.param("id");
		User.searchNearbyUser(userId, true).then(function(users){
			var books = [];
			for(var i=0; i<users.length; i++){
				books = books.concat(users[i].books);
			}
			books = ArrayUtil.unique(books);
			return res.ok(books);
		}).catch(function(err){
			return res.error(err);
		})
	},
	rateUser: function(req, res){
		var userId = req.param("id");
		var toUser = req.param("toUser");
		var msg = req.param("message");

		User_rating.rateUser(userId, toUser, msg).then(function(msg){
			return res.ok(msg);
		}).catch(function(err){
			return res.error(err);
		})
	}
};

