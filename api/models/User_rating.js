/**
* User_rating.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName: 'user_rating',
	attributes: {
		id:{
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
		},
		fromUser:{
			model: 'user',
			required: true
		},
		toUser:{
			model: 'user',
			via: 'userRating',
			required: true
		},
		message: {
			type: 'string',
			required: true
		}
		
	},
	rateUser: function(fromUser, toUser, mess){
		var promise = new Promise(function(resolve, reject){
			User.checkUserExist(fromUser).then(function(response){
				if(!response){
					throw new Error("User not exist");
				}
				return User.checkUserExist(toUser);
			}).then(function(response){
				if(!response){
					throw new Error("User not exist");
				}
				var p = new Promise(function(re, rej){
					User_rating.create({
						fromUser: fromUser,
						toUser: toUser,
						comment: mess
					}).then(function(obj){
						re({
							code: true,
							msg: obj
						});
					}).catch(function(){
						re({
							code: false,
							msg: null
						});
					})
				});
				return p;
			}).then(function(response){
				if(!response.code){
					throw new Error("User not exist");
				}
				User_rating.findOne(response.msg.id)
				.populate('fromUser')
				.populate('toUser')
				.then(function(rating){
					resolve(rating);
				})
			}).catch(function(error){
				reject(error);
			})
		});
		return promise;
	}
};

