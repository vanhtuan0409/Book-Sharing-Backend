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
		email:{
			type: 'email',
			required: true,
			unique: true,
		},
		password:{
			type: 'string',
			required: true
		},
		phone:'string',
		location: 'string',
		school: 'string',
		work: 'string',
		point: {
			type: 'interger',
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
		groups:{
			collection: 'group',
			via: 'members'
		}
	},
	beforeCreate: function(values, cb){
		values.password = md5(values.password);
		cb();
	},
	afterCreate: function(values, cb){
		delete values.password;
		cb();
	},
	addFriend: function(friendId){
	}
};

