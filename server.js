var express = require("express");
var app = express();
var mongoose = require("mongoose");
var Contact = require("./models/contact");
var bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/contactList",function(){

console.log("successfully connected to mongodb");
});



var PORT = process.env.PORT || 4000;

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json());

app.get("/contactList", function(req, res){

	Contact.getContacts(function(err, data){
		if(err){
			throw err;
		}
		res.json(data);
});

	});
app.post("/contactList", function(req, res){

	var body = req.body; //will fetch body details
	Contact.addContact(body, function(err, data){
		if(err){
			throw err;
		}
		res.json(data);
	})
})
app.get("/contactList/:id", function(req, res){
	var id = req.params.id;
	Contact.getContactById(id, function(err, data){
		if(err){
			throw err;
		}
		res.json(data);
	})
})
app.put("/contactList/:id", function(req, res){
	var id= req.params.id;
	var body = req.body;

	Contact.updateContact(id, body, function(err, data){

		if(err){
			throw err;
		}
		console.log(data);
		res.json(data);
	})

})
app.delete("/contactList/:id", function(req, res){
var id=req.params.id;
console.log(id);	
Contact.removeContact(id, function(err, data){
	if(err){
		throw err;
	}
	res.json(data);
})

})


app.listen(PORT, function(){
	console.log("server running at port" +PORT);
})