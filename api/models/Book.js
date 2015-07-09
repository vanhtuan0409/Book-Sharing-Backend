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
		description: 'string',
		type: 'string'
	},
	beforeCreate: function(values, cb){
		values.bookname = values.bookname.toLowerCase();
		values.author = values.author.toLowerCase();
		cb();
	},
};

