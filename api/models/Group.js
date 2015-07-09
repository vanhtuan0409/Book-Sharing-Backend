/**
* Group.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName: "group",
	attributes: {
		id:{
			type: 'string',
			primaryKey: true,
			uuidv4: true,
			required:true,
			defaultsTo: function() { return uuid.v4(); }
		},
		groupname:{
			type: 'string',
			unique: true,
			required: true
		},
		members:{
			collection: 'user',
			via: 'groups'
		}
	}
};

