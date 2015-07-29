/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var uuid = require('uuid');
var md5 = require('MD5');

module.exports = {
	tableName: 'user',
	attributes: {
		id:{
			type: 'string',
			primaryKey: true,
			uuidv4: true,
			required:true,
			defaultsTo: function() { return uuid.v4(); }
		},
		name: {
			type: 'string',
			required: true
		},
		email:{
			type: 'email',
			required: true,
			unique: true,
		},
		password:{
			type: 'string',
			required: true,
			protected: true
		},
		dob:'date',
		location: 'string',
		placeToTrade: {
			type: 'array',
			defaultsTo: new Array()
		},
		timeToTrade: {
			type: 'array',
			defaultsTo: new Array()
		},
		point: {
			type: 'integer',
			required: true,
			defaultsTo: 100
		},
		books:{
			collection: 'book',
			via: 'owners',
			dominant: true
		},
		recommendation:{
			collection: 'book'
		},
		userRating:{
			collection: 'user_rating',
			via: 'toUser'
		},
		groups:{
			collection: 'group',
			via: 'members'
		}
	},
	beforeCreate: function(values, cb){
		values.password = md5(values.password);
		cb();
	},
	// afterCreate: function(values, cb){
	// 	delete values.password;
	// 	cb();
	// },
	checkUserExist: function(userId){
		var promise = new Promise(function(resolve, reject){
			User.findOne(userId).then(function(obj){
				if(obj){
					resolve(true);
				}
				resolve(false);
			}).catch(function(){
				resolve(false);
			})
		});
		return promise;
	},
	checkUserHaveBook: function(userId, bookId){
		var promise = new Promise(function(resolve, reject){
			User.findOne(userId).populate('books', {id:bookId}).then(function(user){
				if(user.books[0]){
					resolve(true);
				}
				resolve(false);
			}).catch(function(){
				resolve(false);
			})
		});
		return promise;
	},
	searchNearbyUser: function(userId, populateBook){
		var promise = new Promise(function(resolve, reject){
			User.findOne(userId).then(function(user){
				var places = user.placeToTrade;
				var arr = [];
				for(var i = 0; i<places.length; i++){
					arr.push({
						"placeToTrade":{
							"contains": places[i]
						}
					})
				}
				var query = {
					or: arr,
					"id":{
						"!": user.id
					}
				}

				if(populateBook){
					User.find(query).populate("books").then(function(users){
						resolve(users);
					})
				} else {
					User.find(query).then(function(users){
						var users = ArrayUtil.unique(users);
						resolve(users);
					})
				}
			}).catch(function(err){
				reject(err);
			})
		});
		return promise;	
	},
	
};

