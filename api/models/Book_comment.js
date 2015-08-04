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
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
		},
		book: {
			model: 'book'
		},
		fromUser: {
			model: 'user'
		},
		message: {
			type: 'string',
			required: true
		}
	}
};

