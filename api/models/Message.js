/**
* Message.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var uuid = require('uuid');

module.exports = {
	tableName: 'message',
	attributes: {
		id:{
			type: 'string',
			primaryKey: true,
			uuidv4: true,
			required:true,
			defaultsTo: function() { return uuid.v4(); }
		},
		fromUser:{
			model: 'user',
			required: true
		},
		borrow:{
			model: 'borrow',
			via: 'messages'
		},
		message:{
			type: 'string',
			required: true
		},
		status:{
			type: 'string',
			enum: ['init', 'read'],
			defaultsTo: 'init',
			required: true
		}
	}
};

