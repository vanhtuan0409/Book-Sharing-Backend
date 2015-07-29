/**
* Book_comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName: 'book_comment',
	attributes: {
		id:{
			type: 'string',
			primaryKey: true,
			uuidv4: true,
			required:true,
			defaultsTo: function() { return uuid.v4(); }
		},
		book: {
			model: 'book'
		},
		user: {
			model: 'user'
		},
		comment: {
			type: 'string',
			required: true
		}
	}
};

