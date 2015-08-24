/**
* Friendship.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var uuid = require('uuid');
module.exports = {
	tableName: 'book_borrow',
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
			required: true
		},
		book:{
			model: 'book',
			required: true
		},
		startDate: 'date',
		returnDate: 'date',
		messages:{
			collection: 'message',
			via: 'borrow',
		},
		status:{
			type: 'string',
			enum: ['init', 'ongoing', 'closed'],
			defaultsTo: 'init',
			required: true
		}
	},
	checkBorrowExist: function(fromId, toId, bookId){
		var promise = new Promise(function(resolve, reject){
			var query = {
				fromUser: fromId,
				toUser: toId,
				book: bookId,
				status:{
					'!': 'returned'
				}
			}
			Borrow.findOne(query).then(function(obj){
				if(obj){
					resolve(true);
				}
				resolve(false);
			}).catch(function(){
				resolve(false);
			})
		});
		return promise
	},
	borrow: function(fromId, toId, bookId, startD, returnD, message){
		var borrowId;

		var promise = new Promise(function(resolve, reject){
			Book.checkBookExist(bookId).then(function(response){
				if(!response){
					throw new Error("Book not exist");
				}
				return User.checkUserExist(fromId);
			}).then(function(response){
				if(!response){
					throw new Error("User not exist");
				}
				return User.checkUserExist(toId);
			}).then(function(response){
				if(!response){
					throw new Error("User not exist");
				}
				return User.checkUserHaveBook(toId, bookId);
			}).then(function(response){
				if(!response){
					throw new Error("User dont have book");
				}
				return Borrow.checkBorrowExist(fromId, toId, bookId);
			}).then(function(response){
				if(response){
					throw new Error("Borrow already exist");
				}
				var p = new Promise(function(re, rej){
					Borrow.create({
						fromUser:fromId,
						toUser:toId,
						book:bookId,
						startDate:startD,
						returnDate:returnD
					}).then(function(borrow){
						borrowId = borrow.id;
						re({
							code: true,
							book: borrow
						});
					}).catch(function(err){
						console.log(err);
						re({
							code: false,
							book: null
						});
					})
				});
				return p;
			}).then(function(obj){
				if(!obj.code){
					throw new Error("Error create borrow");
				}
				var p = new Promise(function(re, rej){
					if(message.length<=0){
						re({
							code:true,
							msg: null
						});
						return;
					}
					Message.create({
						fromUser: fromId,
						toUser: toId,
						borrow: obj.book.id,
						message: message
					}).then(function(msg){
						re({
							code: true,
							msg: msg
						});
					}).catch(function(err){
						re({
							code: false,
							msg: null
						});
					})
				});
				return p;
			}).then(function(obj){
				if(!obj.code){
					throw new Error("Error create message");
				}
				Borrow.findOne(borrowId)
				.populate('fromUser')
				.populate('toUser')
				.populate('book')
				.populate('messages')
				.then(function(borrow){
					resolve(borrow);
				})
			}).catch(function(error){
				reject(error.message);
			});
		});
		return promise;
	},
	afterCreate: function(value, cb){
		console.log("value: ", value);
		EmailUtil.sendEmail(value.toUser, "Book Sharing Notification", "You receive a new borrow request");
		cb();
	}
};

