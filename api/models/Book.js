/**
* Book.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var uuid = require('uuid');
module.exports = {
	tableName: 'book',
	attributes: {
		id:{
			type: 'string',
			primaryKey: true,
			uuidv4: true,
			required:true,
			defaultsTo: function() { return uuid.v4(); }
		},
		bookname: {
			type: 'string',
			unique: true,
			required: true
		},
		author: {
			type: 'string',
			required: true
		},
		owners: {
			collection: 'user',
			via: 'books'
		},
		comments:{
			collection: 'book_comment',
			via: 'book'
		},
		description: 'string',
		type: 'string'
	},
	checkBookExist: function(bookId){
		var promise = new Promise(function(resolve, reject){
			Book.findOne(bookId).then(function(obj){
				if(obj){
					resolve(true);
				}
				resolve(false);
			}).catch(function(error){
				resolve(false);
			})
		});
		return promise;
	}
};

