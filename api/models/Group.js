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
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
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

