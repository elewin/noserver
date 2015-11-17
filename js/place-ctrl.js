angular.module('reviewer').controller('placeCtrl', function(placeRef, dishesRef, $scope, $firebaseObject, $firebaseArray, placeService, $stateParams) {
	var place = $firebaseObject(placeRef);
 	//var bestDish = placeService.getTopDishesObj(dishesRef, 1); //get top 1 dish
	//$scope.bestDish =  bestDish;

	loadTopDishes = function(obj, num){ //make sure data is loaded before trying to put it on $scope, num is number of top dishes to get
		obj.$loaded(function(data){
			$scope.topDishArr = placeService.getTopDishesArr(dishesRef, num);
			},
			function(error){
				console.error("error:", error); //uh oh
			}
		);
	}

	var numTopDishes = 3; //get the top 3 dishes
	var dishesObj= $firebaseObject(dishesRef); //make our object of dishes
	loadTopDishes(dishesObj, numTopDishes); //load the data so we dont start working with undefined values before the server can send it

	dishesRef.on("child_changed", function(snapshot) { //automatically refresh top 3 dishes when there is a change
		loadTopDishes(dishesObj, numTopDishes);
	});

	place.$bindTo($scope, 'place');

	$scope.dishes = $firebaseArray(dishesRef);


  $scope.createDish = function(dish) {
    $scope.dishes.$add({
      name: dish,
			totalScore: 0,
			avgScore: 0,
			numReviews: 0,
    });
		console.log('thing:',this.$id, this.name);
		placeRef.update( {totalDishes: place.totalDishes+1} ); //add another dish to the total
		$scope.newDishName = ""; //reset the input fields
  };

	$scope.updatePlace = function(address, phone, photoUrl){ //update place details
		placeRef.update({
			address: address,
			phone: phone,
			photoUrl: photoUrl,
		});
		$scope.address = ""; //reset the input fields
		$scope.phone = ""; //reset the input fields
		$scope.photoUrl = '';
	}

});
