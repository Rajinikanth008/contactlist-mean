var app= angular.module("myApp", []);

app.controller("myController", ["$scope","$http", function($scope, $http){

var refresh = function(){
$http.get("/contactList").success(function(responce){

	$scope.contactList= responce;
	$scope.contact ="";
})
}
refresh();
$scope.addContact = function(){

	$http.post("/contactList",$scope.contact).success(function(responce){

		console.log(responce);
		refresh();
	})
}

$scope.editContact = function(id){
	$http.get("/contactList/" +id).success(function(responce){
    $scope.contact = responce;
	})
}
$scope.updateContact = function(){

	$http.put("/contactList/" + $scope.contact._id, $scope.contact)
		.success(function(responce){
			refresh();
		})

}
$scope.removeContact = function(id){
	console.log(id);
$http.delete("/contactList/" + id).success(function(responce){
	refresh();
})

}

}]);

