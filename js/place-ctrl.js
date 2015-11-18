angular.module('reviewer').controller('placeCtrl', function(placeRef, dishesRef, $scope, $firebaseObject, $firebaseArray, placeService, $stateParams) {
	var place = $firebaseObject(placeRef);
 	//var bestDish = placeService.getTopDishesObj(dishesRef, 1); //get top 1 dish
	//$scope.bestDish =  bestDish;

	loadTopDishes = function(obj, num){ //make sure data is loaded before trying to put it on $scope, num is number of top dishes to get
		obj.$loaded(function(data){
			$scope.topDishArr = placeService.getTopDishesArr(dishesRef, num);

			//while the top dishes are loaded, set the properties for the best dish for this place so it can be displayed along side the place on the palceList:
			var bestDishRef = placeRef.child("bestDish");

			// make sure we have at least 1 dish
			if (place.totalDishes > 0){
				bestDishRef.set({
					name: $scope.topDishArr[0].data.name,
					avgScorePct: $scope.topDishArr[0].data.avgScorePct,
					ratingColor: $scope.topDishArr[0].data.ratingColor,
					avgScore: $scope.topDishArr[0].data.avgScore,
				});
			}else{ //set the best dish to empty if we dont have any dishes
				bestDishRef.set({
					name: 'None',
					avgScorePct: 0,
					ratingColor: '#ffffff',
					avgScore: 0,
				});
			}
		},
		function(error){
			console.error("error:", error); //uh oh :(
		});
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
			avgScorePct: 0,
			numReviews: 0,
			roundedScore: 0,
			ratingColor: '',
    });

		//update the place:
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
