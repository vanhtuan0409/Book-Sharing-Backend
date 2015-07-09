var userId = "97e8a675-b6e0-4aa5-acdb-636f35fcc81b";
io.socket.get("/user/"+userId, function(body, response){
	console.log(body);
})