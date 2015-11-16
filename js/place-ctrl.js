angular.module('reviewer').controller('placeCtrl', function(placeRef, dishesRef, $scope, $firebaseObject, $firebaseArray, placeService) {
	var place = $firebaseObject(placeRef);

	place.$bindTo($scope, 'place');

	$scope.dishes = $firebaseArray(dishesRef);

  $scope.createDish = function(dish) {
    $scope.dishes.$add({
      name: dish,
			totalScore: 0,
			avgScore: 0,
			numReviews: 0,
    });
		placeRef.update( {totalDishes: place.totalDishes+1} ); //add another dish to the total
		$scope.newDishName = ""; //reset the input fields
  };

	$scope.updatePlace = function(address, phone){ //update place details
		placeRef.update({
			address: address,
			phone: phone,
		});
		$scope.address = ""; //reset the input fields
		$scope.phone = ""; //reset the input fields
	}

	$scope.bestDish = placeService.getBestDish(placeRef);

});
