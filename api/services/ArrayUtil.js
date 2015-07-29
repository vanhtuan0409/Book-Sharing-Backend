module.exports = {
	unique: function(arr){
		var unique = [];
		unique.indexOf = function(obj){
			for (var i = 0; i<this.length; i++){
				if(this[i].id == obj.id){
					return i;
				}
			}
			return -1;
		};

		for (var i = 0; i < arr.length; i++ ) {
			var current = arr[i];
			if (unique.indexOf(current) < 0) unique.push(current);
		}
		return unique;
	}
}