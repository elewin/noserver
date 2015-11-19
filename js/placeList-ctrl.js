angular.module('reviewer').controller('placeListCtrl', function(placeListRef, $scope, $firebaseArray) {


	$scope.placeList = $firebaseArray(placeListRef);


	$scope.placeList.$loaded().then(function(placeList) { //load the list
	});

	$scope.createPlace = function(name) { //add a new object, and initialize its keys
		$scope.placeList.$add({
			name: name,
			address: '',
			phone: '',
			photoUrl: '',
			totalDishes: 0,
		  totalReviews: 0,
			genre: '',
		});
		$scope.newPlaceName = "";
	};

});
