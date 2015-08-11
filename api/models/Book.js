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
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
		},
		bookname: {
			type: 'string',
			unique: true,
			required: true
		},
		author: {
			type: 'array',
		},
		owners: {
			collection: 'user',
			via: 'books'
		},
		comments:{
			collection: 'book_comment',
			via: 'book'
		},
		url:{
			type: 'string',
			defaultsTo: 'img/book/default.jpg'
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

